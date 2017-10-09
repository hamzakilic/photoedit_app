import { LayerSelectEllipse } from './layerSelectEllipse';
import { Layer } from './layer';
import { LayerEmpty } from './layerEmpty';
import { LayerBackground } from './layerBackground';
import { LayerSelect } from './layerSelect';
import { LayerCropRectangle } from './layerCropRectangle';

import { Graphics } from '../../lib/graphics';
import { Callback } from '../../lib/callback';
import { HEventEmitter } from '../../lib/eventEmitter'
import { HImage } from '../../lib/image';
import { Utility } from '../../lib/utility';
import { CalcLayer } from "./lib/calcLayer";
import { Calc } from '../../lib/calc';
import { Point } from "../../lib/draw/point";
import { LayerSelectLasso } from "./layerSelectLasso";
import { LayerSelectPolygonal } from './layerSelectPolygonal';


export class Workspace extends HEventEmitter {
  private _name: string
  private _layers: Layer[];
  private _width: number;
  private _height: number;
  private _workMode: WorkModeBase;

  public isRemoveable: boolean;
  public isActive: boolean;


  public readonly margin = 0;

  public backgroundLayer: Layer;


  public uuid: string;

  public nativeElement: any;

  public selectionLayer: Layer;
  public workLayer:Layer;
  
  
  public foregroundColor:string;
  public backgroundColor:string;

  constructor(width: number, height: number, name?: string) {
    super();
    this.uuid = Utility.uuid();
    if (name)
      this._name = name;
    else this._name = "image";
    this._layers = [];

    this.isRemoveable = true;
    this.isActive = false;
    if (width <= 0)
      this._width = 100;
    else this._width = width;
    if (height <= 0)
      this._height = 100;
    else this._height = height;




    this.backgroundLayer = new LayerBackground('backgroundlayer');
    this.backgroundLayer.width = this.width;
    this.backgroundLayer.height = this.height;

    this.backgroundLayer.marginLeft = this.margin;
    this.backgroundLayer.marginTop = this.margin;
    this.backgroundLayer.marginRight = this.margin;
    this.backgroundLayer.marginBottom = this.margin;

    this.backgroundLayer.zIndex = 0;
    this._workMode = new WorkModeDefault(this);

    this.backgroundColor="#000";
    this.foregroundColor="#FFF";

  }
  public get hasLayer(): boolean {
    return this._layers.length > 0;
  }
  public get width(): number {
    return this._width;
  }
  public get height(): number {
    return this._height;
  }

  public get name(): string {
    return this._name;
  }
  public get layers(): Layer[] {
    return this._layers;
  }
  public get workMode(): WorkModeBase {
    return this._workMode;
  }
  public get zoom(): number {
    if (this.backgroundLayer)
      return this.backgroundLayer.scale;
    return 1;
  }

  public dispose(): void {
    this._layers.forEach((item) => item.dispose());
  }

  public addLayer(ly: Layer) {
    if (ly) {
      ly.marginLeft = this.margin;
      ly.marginRight = this.margin;
      ly.marginTop = this.margin;
      ly.marginBottom = this.margin;

      this._layers.push(ly);
    }
  }

  public removeLayer(ly: Layer) {
    if (ly) {
      let index = this._layers.findIndex((item) => {
        return item === ly;
      });

      if (index > -1) {
        let layer = this._layers[index];
        this._layers.splice(index, 1);
        layer.dispose();

      }
    }
    if (this._layers.length == 0)
      this.selectionLayer = undefined;
  }


  public replaceLayer(source: Layer, destination: Layer,marginLeft?:number,marginTop?:number) {
    let index=this._layers.findIndex(p=>p==source);
    if(index>-1){
    destination.setBlendMode(destination.blendMode);
    destination.setGlobalAlpha(source.globalAlpha);
    destination.isSelected = true;
    destination.scale=this.scale;
    destination.rotateAngleDeg = source.rotateAngleDeg;
    destination.marginLeft =marginLeft?marginLeft:  source.marginLeft;
    destination.marginTop = marginTop?marginTop:source.marginTop;
    this._layers[index]=destination;
    source.dispose();
    }
  }

  public clearLayers() {
    this._layers = [];
  }

  public render() {

    this.backgroundLayer.render();
    this._layers.forEach(
      (item) => {
        if (!item.isHidden)
          item.render();
      }
    )

  }

  public resize(width: number, height: number, afterResized: Callback) {


    if (width <= 0)
      this._width = 100;
    else this._width = width;
    if (height <= 0)
      this._height = 100;
    else this._height = height;
    let changeLayer0=this._layers.length>0 && this.backgroundLayer.width== this._layers[0].width && this.backgroundLayer.height==this._layers[0].height;

    let keepRatio = this.backgroundLayer.keepRatio;
    this.backgroundLayer.keepRatio = false;
    this.backgroundLayer.setWidthHeight(this._width, this._height, new Callback(() => { this.backgroundLayer.render() }));
    this.backgroundLayer.keepRatio = keepRatio;

    if (this._layers.length > 0 && changeLayer0) {
      
      keepRatio = this._layers[0].keepRatio;
      this._layers[0].keepRatio = false;
      this._layers[0].setWidthHeight(this._width, this._height, new Callback(() => { this._layers[0].render() }));
      this._layers[0].keepRatio = keepRatio;
    
    }


    this.callEvent(Workspace.EVENTRESIZED, afterResized);

  }

  private rotateLayers90(layer: Layer, centerBefore: Point, centerAfter: Point) {
    let keepRatio = layer.keepRatio;
    layer.keepRatio = false;
    let angle = layer.rotateAngleDeg;
    angle += 90;
    if (angle > 180) {
      angle = angle - 360;
    }
    let leftTop = new Point(layer.rectRotated.x, layer.rectRotated.y);


    layer.rotateByDegrees(angle);

    let rectRotated = layer.rectRotated;


    let point1 = CalcLayer.calculateLeft(this.width - leftTop.Y - rectRotated.width, layer);
    layer.setLeft(point1.X);
    layer.setTop(point1.Y);
    point1 = CalcLayer.calculateTop(leftTop.X, layer);
    layer.setLeft(point1.X);
    layer.setTop(point1.Y);
    //layer.setLeft(this.width-layer.marginTop);
    //layer.setTop(layer.marginTop);
    layer.keepRatio = keepRatio;
  }

  public rotate90() {
    let width = this._height;
    let height = this._width;
    //eski center noktası
    let centerBefore = new Point(this.width / 2, this.height / 2);
    this._width = width;
    this._height = height;
    let centerAfter = new Point(this.width / 2, this.height / 2);
    let keepRatio = this.backgroundLayer.keepRatio;
    this.backgroundLayer.keepRatio = false;
    this.backgroundLayer.setWidthHeight(this._width, this._height, new Callback(() => { this.backgroundLayer.render() }));
    this.backgroundLayer.keepRatio = keepRatio;

    this._layers.forEach(layer => this.rotateLayers90(layer, centerBefore, centerAfter));
  }

  public mouseWheelUpFunc() {
    console.log('wheelup');
  }

  public mouseWheelDownFunc() {
    console.log('wheeldown');
  }

  public mouseMove(event: MouseEvent) {
    if (!this.nativeElement)
      this.nativeElement = document.getElementById(this.uuid);
    this._workMode.mouseMove(event);


  }


  public mouseDown(event: MouseEvent, layer: Layer) {
    // console.log('workspace mouse down:' + event.clientX);
    this._workMode.mouseDown(event, layer);

  }
  public mouseUp(event: any) {

    //console.log('workspace mouse up:' + event.clientX);
    this._workMode.mouseUp(event);

  }

  public makeLayersNotSelected(layer: Layer) {
    if (layer) {
      this._layers.forEach((item) => {
        if (layer != item && !layer.isHidden)
          item.isSelected = false;
      });
    } else {
      this._layers.forEach((item) => {
        item.isSelected = false;
      });
    }

  }
  public makeLayerSelected(layer: Layer) {

    this.makeLayersNotSelected(layer);
    if (layer && !layer.isHidden) {
      layer.isSelected = true;


    }

  }

  public get scale() {
    return this.backgroundLayer.scale;
  }

  public zoomTo(val: number) {
    this.backgroundLayer.scaleTo(val);
    this._layers.forEach((item) => item.scaleTo(val));
    if(this.selectionLayer)
    this.selectionLayer.scaleTo(val);
    if(this.workLayer)
    this.workLayer.scaleTo(val);
    this.backgroundLayer.render();
    
  }
  public zoomIn() {
    this.backgroundLayer.scalePlus();
    this._layers.forEach((item) => item.scalePlus());
    if(this.selectionLayer)
    this.selectionLayer.scalePlus();
    if(this.workLayer)
    this.workLayer.scalePlus();
    this.backgroundLayer.render();
    

  }

  public zoomOut() {
    this.backgroundLayer.scaleMinus();
    this._layers.forEach((item) => item.scaleMinus());
    if(this.selectionLayer)
    this.selectionLayer.scalePlus();
    if(this.workLayer)
    this.workLayer.scalePlus();
    this.backgroundLayer.render();

    
  }

  public selectWorking(working: number,parameter:string) {
    //console.log('selectWorking');
    switch (working) {
      case Workspace.WorkModeDefault:
        this._workMode = new WorkModeDefault(this);
        break;     
      case Workspace.WorkModeResizeWorkspace:
        this._workMode = new WorkModeResizeWorkspace(this, this.workMode.typeOf,this.workMode.subTypeOf);
        break;

        case Workspace.WorkModeCrop:
        this._workMode = new WorkModeCrop(this);        
        break;
        case Workspace.WorkModeSelection:
        if(!this.workMode || this._workMode.typeOf!=working)
        this._workMode = new WorkModeSelectionRectangle(this,parameter);
        else (this._workMode as WorkModeSelectionRectangle).changeType(parameter);
        break;       
        case Workspace.WorkModeColorPicker:
        this._workMode = new WorkModeColorPicker(this,this.workMode);
        break;
      default:
        this._workMode = new WorkModeDefault(this);
    }

  }

  public setWorkingMode(working:WorkModeBase){
    this._workMode=working;
  }

  public removeSelectionLayer() {
    this.selectionLayer = undefined;

  }
  public removeWorkLayer() {
    this.workLayer = undefined;

  }



  public cssClasses: string;

  public static readonly EVENTRESIZED = "resized";

  public static readonly WorkModeDefault = 1;  
  public static readonly WorkModeSelection = 3;
  public static readonly WorkModeResizeWorkspace = 4;
  public static readonly WorkModeAddTextLayer = 5;    
  public static readonly WorkModeCrop = 7;
  public static readonly WorkModeColorPicker = 12;
  



}

abstract class WorkModeBase {
  protected workspace: Workspace;
  protected canvasElement:any;
  constructor(workspace: Workspace,disposeSelect:boolean=true,disposeWork:boolean=true) {
    this.workspace = workspace;
    if(this.workspace.selectionLayer && disposeSelect){
      this.workspace.selectionLayer.dispose();
      this.canvasElement=this.workspace.selectionLayer.htmlElement;    
    this.workspace.selectionLayer = undefined;
    }

    if(this.workspace.workLayer && disposeWork){
      this.workspace.workLayer.dispose();
      this.canvasElement=this.workspace.workLayer.htmlElement;    
    this.workspace.workLayer = undefined;
    }

    this.workspace.layers.forEach((item) => { if (item.isSelected) item.mouseUp(event); });
  }

  public mouseMove(event: MouseEvent) {

    this.workspace.layers.forEach((item) => {
      if (item.isSelected)
           item.mouseMove(event);
    });

  }
  public abstract get typeOf(): number;
  public abstract get subTypeOf():string;


  public mouseDown(event: MouseEvent, layer: Layer) {
  
    this.workspace.layers.forEach((item) => {
      if (item.isSelected && item.hitMouseEvent(event))
           item.mouseDown(event);
    });

    //önemli, event stoplanmalı
    event.stopPropagation();
  }
  public mouseUp(event: any) {

    this.workspace.layers.forEach((item) => { if (item.isSelected) item.mouseUp(event); });
  }


}


class WorkModeDefault extends WorkModeBase {


  constructor(workspace: Workspace) {
    super(workspace);
    this.workspace.cssClasses = "mouseDefault";
    this.workspace.removeSelectionLayer();

  }
  public get typeOf(): number {
    return Workspace.WorkModeDefault;
  }
  public get subTypeOf():string{
    return "";
  }

}


class WorkModeHand extends WorkModeBase {

  constructor(workspace: Workspace) {
    super(workspace);
    this.workspace.cssClasses = "mouseDefault";

  }
  public get typeOf(): number {
    return Workspace.WorkModeDefault;
  }
  public get subTypeOf():string{
    return "";
  }
}

class WorkModeSelectionRectangle extends WorkModeBase {
  _shapeType:string;
  constructor(workspace: Workspace,shapeType:string) {
    super(workspace);
    this.workspace.cssClasses = "mouseCross";
    this._shapeType = shapeType;
    let selectionLayer = this.createLayer(this.workspace.width, this.workspace.height, 0, 0);
    selectionLayer.shapeType=this._shapeType;      
    this.workspace.selectionLayer = selectionLayer;

  }
  public get typeOf(): number {
    return Workspace.WorkModeSelection;
  }
  public get subTypeOf():string{
    return this._shapeType;
  }
  public changeType(type:string){
    (this.workspace.selectionLayer as LayerSelect).shapeType=type;
    this._shapeType=type;
  }

  public mouseMove(event: MouseEvent) {
    if (this.workspace.selectionLayer)
      this.workspace.selectionLayer.mouseMove(event);

  }

  public mouseDown(event: MouseEvent, layer: Layer) {
       
    this.workspace.selectionLayer.mouseDown(event);
    
  }
  public mouseUp(event: any) {
    if (this.workspace.selectionLayer)
      this.workspace.selectionLayer.mouseUp(event);
  }

  protected createLayer(width:number,height:number,left:number,top:number){
    return new LayerSelect(width,height,left,top);
  }

}


class WorkModeCrop extends WorkModeBase {
  
    constructor(workspace: Workspace) {
      super(workspace);
      this.workspace.cssClasses = "mouseCross";
      
  
    }
    public get typeOf(): number {
      return Workspace.WorkModeCrop;
    }
    public get subTypeOf():string{
      return "";
    }
  
    public mouseMove(event: MouseEvent) {
      if (this.workspace.workLayer)
        this.workspace.workLayer.mouseMove(event);
  
    }
  
    public mouseDown(event: MouseEvent, layer: Layer) {
     
      
      if (this.workspace.workLayer == undefined) {
       
        var rect = this.workspace.nativeElement.getBoundingClientRect();
        let mouseX = (event.pageX - rect.left) + window.scrollX;
        let mouseY = (event.pageY - rect.top) + window.scrollY;
        //buradaki 50 ve 50 workspace margin left ve top değerleri;
        let worklayer = this.createLayer(0, 0, mouseX - 50, mouseY - 50);
        worklayer.mouseDownSelectedPoint(event, 6);
        if(this.workspace.workLayer)
          this.workspace.workLayer.dispose();
        this.workspace.workLayer = worklayer;
       // this.workspace.selectionLayer.mouseDown(event);
      }
      
    }
    public mouseUp(event: any) {
      if (this.workspace.workLayer)
        this.workspace.workLayer.mouseUp(event);
    }
    protected createLayer(width:number,height:number,left:number,top:number){
      return new LayerCropRectangle(width,height,left,top);
    }
  
    
  
  }

  

    



    



      class WorkModeColorPicker extends WorkModeBase {
        private _previousWorkMode:WorkModeBase;
        private _isMouseDown=false;
        constructor(workspace: Workspace, previousMode:WorkModeBase) {
          //dont dispose previous workmode          
          super(workspace,false);
          this._previousWorkMode=previousMode;          
          this.workspace.cssClasses = "default";
      
        }
        public get typeOf(): number {
          return Workspace.WorkModeColorPicker;
        }
        public get subTypeOf():string{
          return "";
        }
      
        public mouseMove(event: MouseEvent) {
          if(this._isMouseDown)
          this.findPointInLayers(event);
        }
      
        public mouseDown(event: MouseEvent, layer: Layer) {
          this._isMouseDown=true;
          
          this.findPointInLayers(event);
          
        }
        public mouseUp(event: any) {
          this._isMouseDown=false;
          this.workspace.setWorkingMode(this._previousWorkMode);
          
        }

        private findPointInLayers(event:MouseEvent){
           for(let i=this.workspace.layers.length-1;i>-1;--i){
              let ly= this.workspace.layers[i];
              let hitPoint=ly.hitMouseEvent(event);
              if(hitPoint){
                  let color=ly.getColor(hitPoint.X,hitPoint.Y);
                  if(color.a!=0){
                    this.workspace.foregroundColor="rgb("+color.r+","+color.g+","+color.b+")";
                    return;
                  }
              }              
           }
        }
      
      
      }




class WorkModeResizeWorkspace extends WorkModeBase {
  private previousWorkingType: number;
  private previousWorkingSubType:string;
  constructor(workspace: Workspace, previousWorkingType: number,previousWorkingSubType:string) {
    super(workspace);
    this.previousWorkingType = previousWorkingType;
    this.previousWorkingSubType = previousWorkingSubType;
    this.workspace.cssClasses = "mouseNWSE";

  }
  public get typeOf(): number {
    return Workspace.WorkModeResizeWorkspace;
  }

  public get subTypeOf():string{
    return "";
  }


  public mouseMove(event: MouseEvent) {

    let w = this.workspace.width + event.movementX / this.workspace.scale;
    let h = this.workspace.height + event.movementY / this.workspace.scale;
    if (w > 20 && h > 20) {
      this.workspace.resize(w, h, new Callback(() => { }));
    }
  }

  public mouseDown(event: MouseEvent, layer: Layer) {


  }
  public mouseUp(event: any) {

    this.workspace.selectWorking(this.previousWorkingType,this.previousWorkingSubType);
  }


}








