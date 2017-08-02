import { Layer } from './layer';
import { LayerEmpty } from './layerEmpty';
import { LayerBackground } from './layerBackground';
import { LayerCrop } from './layerCrop';

import { Graphics } from '../../lib/graphics';
import { Callback } from '../../lib/callback';
import { HEventEmitter } from '../../lib/eventEmitter'
import { HImage } from '../../lib/image';
import { Utility } from '../../lib/utility';
import { CalcLayer } from "./lib/calcLayer";
import { Point } from "../../lib/draw/point";


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

  public cropLayer: Layer;


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


  }
  public get hasLayer(): boolean{
    return this._layers.length>0;
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
  public get workMode(): WorkModeBase{
    return this._workMode;
  }
  public get zoom():number {
    if(this.backgroundLayer)
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
      this.cropLayer = undefined;
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
    let keepRatio=this.backgroundLayer.keepRatio;
    this.backgroundLayer.keepRatio=false;
    this.backgroundLayer.setWidthHeight(this._width,this._height,new Callback(()=>{this.backgroundLayer.render()}));
    this.backgroundLayer.keepRatio=keepRatio;
    
    if(this._layers.length>0){
      keepRatio=this._layers[0].keepRatio;
      this._layers[0].keepRatio=false;
      this._layers[0].setWidthHeight(this._width,this._height,new Callback(()=>{this._layers[0].render()}));
      this._layers[0].keepRatio=keepRatio;
    }
    

    this.callEvent(Workspace.EVENTRESIZED, afterResized);

  }
  public rotate90(){
    let width=this._height;
    let height=this._width;
    this._width=width;
    this._height=height;
     let keepRatio=this.backgroundLayer.keepRatio;
    this.backgroundLayer.keepRatio=false;
    this.backgroundLayer.setWidthHeight(this._width,this._height,new Callback(()=>{this.backgroundLayer.render()}));
    this.backgroundLayer.keepRatio=keepRatio;
    
    if(this._layers.length>0){
      keepRatio=this._layers[0].keepRatio;
      this._layers[0].keepRatio=false;
      let angle=this._layers[0].rotateAngleDeg;
      angle +=90;
      if(angle>180){        
       angle=180-angle;
      }
      this._layers[0].rotateByDegrees(angle);
     
      let point1=CalcLayer.calculateLeft(0,this._layers[0]);
      this._layers[0].setLeft(point1.X);
      this._layers[0].setTop(point1.Y);
      point1=CalcLayer.calculateTop(0,this._layers[0]);
      this._layers[0].setLeft(point1.X);
      this._layers[0].setTop(point1.Y);
      this._layers[0].keepRatio=keepRatio;
    }

  }

  public mouseWheelUpFunc() {
   // console.log('wheelup');
  }

  public mouseWheelDownFunc() {
    //console.log('wheeldown');
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



  public zoomTo(val: number){
    this.backgroundLayer.scaleTo(val);
    this._layers.forEach((item) => item.scaleTo(val));
  }
  public zoomIn() {
    this.backgroundLayer.scalePlus();
    this._layers.forEach((item) => item.scalePlus());


  }

  public zoomOut() {
    this.backgroundLayer.scaleMinus();
    this._layers.forEach((item) => item.scaleMinus());
  }

  public selectWorking(working: number) {
    //console.log('selectWorking');
    switch (working) {
      case Workspace.WorkModeDefault:
        this._workMode = new WorkModeDefault(this);
        break;
      case Workspace.WorkModeCrop:
        this._workMode = new WorkModeCrop(this);
        break;
      default:
        this._workMode = new WorkModeDefault(this);
    }

  }

  public removeCropLayer(){
    this.cropLayer = undefined;
   
  }



  public cssClasses: string;

  public static readonly EVENTRESIZED = "resized";

  public static readonly WorkModeDefault = 1;
  public static readonly WorkModeCrop = 2;
  public static readonly WorkModeSelection = 3;
  public static readonly WorkModeText = 4;
  public static readonly WorkModeDraw = 5;


}

abstract class WorkModeBase {
  protected workspace: Workspace;

  constructor(workspace: Workspace) {
    this.workspace = workspace;
    this.workspace.cropLayer = undefined;
    this.workspace.layers.forEach((item) => { if (item.isSelected) item.mouseUp(event); });
  }

  public mouseMove(event: MouseEvent) {

    this.workspace.layers.forEach((item) => {
      if (item.isSelected)
        item.mouseMove(event);
    });

  }
   public abstract get typeOf(): number;


  public mouseDown(event: MouseEvent, layer: Layer) {

    this.workspace.makeLayersNotSelected(layer);
    if(layer)
    layer.mouseDown(event);
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
    this.workspace.removeCropLayer();

  }
  public  get typeOf(): number{
    return Workspace.WorkModeDefault;
  }

}


class WorkModeHand extends WorkModeBase {

  constructor(workspace: Workspace) {
    super(workspace);
    this.workspace.cssClasses = "mouseDefault";

  }
  public  get typeOf(): number{
    return Workspace.WorkModeDefault;
  }
}

class WorkModeCrop extends WorkModeBase {

  constructor(workspace: Workspace) {
    super(workspace);
    this.workspace.cssClasses = "mouseCross";

  }
  public  get typeOf(): number{
    return Workspace.WorkModeCrop;
  }

  public mouseMove(event: MouseEvent) {
    if (this.workspace.cropLayer)
      this.workspace.cropLayer.mouseMove(event);

  }

  public mouseDown(event: MouseEvent, layer: Layer) {

    if(this.workspace.cropLayer==undefined){
    var rect = this.workspace.nativeElement.getBoundingClientRect();
    let mouseX = (event.pageX - rect.left) + window.scrollX;
    let mouseY = (event.pageY - rect.top) + window.scrollY;
   // console.log(event.clientX + ":" + event.clientY + "/" + event.movementX + ":" + event.movementY + "/" + event.offsetX + ":" + event.offsetY + "/" + event.pageX + ":" + event.pageY + "/" + event.screenX + ":" + event.screenY);
   // console.log(mouseX + ":" + mouseY);
    let cropLayer = new LayerCrop(0, 0, mouseX - 50, mouseY - 50);
    cropLayer.mouseDownSelectedPoint(event, 6);
    this.workspace.cropLayer= cropLayer;
    }
  }
  public mouseUp(event: any) {
    if (this.workspace.cropLayer)
      this.workspace.cropLayer.mouseUp(event);
  }

}







