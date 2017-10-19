import { WorkModeErase } from './workmodes/workModeErase';

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
import { WorkModeBase } from './workmodes/workModeBase';
import { WorkModeDefault } from './workmodes/workModeDefault';
import { WorkModeBrush } from './workmodes/workModeBrush';
import { WorkModeColorPicker } from './workmodes/workModeColorPicker';
import { WorkModeCrop } from './workmodes/workModeCrop';
import { WorkModeHand} from './workmodes/workModeHand';
import { WorkModeResizeWorkspace } from './workmodes/workModeResize';
import { WorkModeSelection } from './workmodes/workModeSelection';




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

  

  public selectionLayer: Layer;
  public workLayer: Layer;


  public foregroundColor: string;
  public backgroundColor: string;
  private _htmlElement:any=undefined;

  
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

    this.backgroundColor = "#000";
    this.foregroundColor = "#FFF";

  }
  public get htmlElement():any{
    if(this._htmlElement==undefined){
      this._htmlElement=document.querySelector("#"+this.uuid);
    }
    return this._htmlElement;
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
      ly.scale=this.scale;
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


  public replaceLayer(source: Layer, destination: Layer, marginLeft?: number, marginTop?: number) {
    let index = this._layers.findIndex(p => p == source);
    if (index > -1) {
      destination.blendMode=destination.blendMode;
      destination.globalAlpha=(source.globalAlpha);
      destination.isSelected = true;
      destination.scale = this.scale;
      destination.rotateAngleDeg = source.rotateAngleDeg;
      destination.marginLeft = marginLeft ? marginLeft : source.marginLeft;
      destination.marginTop = marginTop ? marginTop : source.marginTop;
      this._layers[index] = destination;
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
    let changeLayer0 = this._layers.length > 0 && this.backgroundLayer.width == this._layers[0].width && this.backgroundLayer.height == this._layers[0].height;

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
    
    this._workMode.mouseMove(event,new Point(this.htmlElement.scrollLeft,this.htmlElement.scrollTop));

  }



  public mouseDown(event: MouseEvent) {
    if(event.srcElement.localName!="workspace-component")
    this._workMode.mouseDown(event,new Point(this.htmlElement.scrollLeft,this.htmlElement.scrollTop));
    

  }
  public mouseUp(event: any) {

    
    this._workMode.mouseUp(event,new Point(this.htmlElement.scrollLeft,this.htmlElement.scrollTop));

  }

  public doubleClick(event: any) {   
        
        this._workMode.doubleClick(event,new Point(this.htmlElement.scrollLeft,this.htmlElement.scrollTop));
    
  }
  public scrollBy(x:number,y:number){
    if(this.htmlElement)
       this.htmlElement.scrollBy(x,y);
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
    if (this.selectionLayer)
      this.selectionLayer.scaleTo(val);
    if (this.workLayer)
      this.workLayer.scaleTo(val);
    this.backgroundLayer.render();

  }
  public zoomIn() {
    this.backgroundLayer.scalePlus();
    this._layers.forEach((item) => item.scalePlus());
    if (this.selectionLayer)
      this.selectionLayer.scalePlus();
    if (this.workLayer)
      this.workLayer.scalePlus();
    this.backgroundLayer.render();


  }

  public zoomOut() {
    this.backgroundLayer.scaleMinus();
    this._layers.forEach((item) => item.scaleMinus());
    if (this.selectionLayer)
      this.selectionLayer.scalePlus();
    if (this.workLayer)
      this.workLayer.scalePlus();
    this.backgroundLayer.render();


  }

  public selectWorking(working: number, parameter: string) {
    //console.log('selectWorking');
    switch (working) {
      case Workspace.WorkModeDefault:
        this._workMode = new WorkModeDefault(this);
        break;
      case Workspace.WorkModeResizeWorkspace:
        this._workMode = new WorkModeResizeWorkspace(this, this.workMode.typeOf, this.workMode.subTypeOf);
        break;

      case Workspace.WorkModeCrop:
        this._workMode = new WorkModeCrop(this);
        break;
      case Workspace.WorkModeSelection:
        if (!this.workMode || this._workMode.typeOf != working)
          this._workMode = new WorkModeSelection(this, parameter);
        else (this._workMode as WorkModeSelection).changeType(parameter);
        break;
      case Workspace.WorkModeColorPicker:
        this._workMode = new WorkModeColorPicker(this, this.workMode);
        break;
        case Workspace.WorkModeBrush:
        this._workMode = new WorkModeBrush(this);
        break;
        case Workspace.WorkModeErase:
        this._workMode = new WorkModeErase(this);
        break;
        case Workspace.WorkModeHand:
        this._workMode = new WorkModeHand(this);
        break;
      default:
        this._workMode = new WorkModeDefault(this);
    }

  }

  public setWorkingMode(working: WorkModeBase) {
    this._workMode = working;
  }

  public removeSelectionLayer() {
    if(this.selectionLayer)
    this.selectionLayer.dispose();
    this.selectionLayer = undefined;

  }
  public removeWorkLayer() {
    if(this.workLayer)
    this.workLayer.dispose();
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
  public static readonly WorkModeBrush = 13;
  public static readonly WorkModeErase = 14;
  public static readonly WorkModeHand=15;



}









