import { Layer } from './layer';
import { LayerEmpty } from './layerEmpty';
import { LayerBackground } from './layerBackground';
import { LayerSelectRectangle } from './layerSelectRectangle';

import { Graphics } from '../../lib/graphics';
import { Callback } from '../../lib/callback';
import { HEventEmitter } from '../../lib/eventEmitter'
import { HImage } from '../../lib/image';
import { Utility } from '../../lib/utility';
import { CalcLayer } from "./lib/calcLayer";
import { Calc } from '../../lib/calc';
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

  public selectionRectangleLayer: Layer;


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
      this.selectionRectangleLayer = undefined;
  }


  public replaceLayer(source: Layer, destination: Layer) {
    let index=this._layers.findIndex(p=>p==source);
    if(index>-1){
    destination.setBlendMode(destination.blendMode);
    destination.setGlobalAlpha(source.globalAlpha);
    destination.isSelected = true;
    destination.scale=this.scale;
    destination.rotateAngleDeg = source.rotateAngleDeg;
    destination.marginLeft = source.marginLeft;
    destination.marginTop = source.marginTop;
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
    let keepRatio = this.backgroundLayer.keepRatio;
    this.backgroundLayer.keepRatio = false;
    this.backgroundLayer.setWidthHeight(this._width, this._height, new Callback(() => { this.backgroundLayer.render() }));
    this.backgroundLayer.keepRatio = keepRatio;

    if (this._layers.length > 0) {
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
      case Workspace.WorkModeRectangleSelection:
        this._workMode = new WorkModeSelectionRectangle(this);
        break;
      case Workspace.WorkModeResizeWorkspace:
        this._workMode = new WorkModeResizeWorkspace(this, this.workMode.typeOf);
        break;
      default:
        this._workMode = new WorkModeDefault(this);
    }

  }

  public removeSelectionRectangleLayer() {
    this.selectionRectangleLayer = undefined;

  }



  public cssClasses: string;

  public static readonly EVENTRESIZED = "resized";

  public static readonly WorkModeDefault = 1;
  public static readonly WorkModeRectangleSelection = 2;
  public static readonly WorkModeSelection = 3;
  public static readonly WorkModeResizeWorkspace = 4;
  public static readonly WorkModeAddTextLayer = 5;
  public static readonly WorkModeDraw = 6;


}

abstract class WorkModeBase {
  protected workspace: Workspace;

  constructor(workspace: Workspace) {
    this.workspace = workspace;
    this.workspace.selectionRectangleLayer = undefined;
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
    if (layer)
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
    this.workspace.removeSelectionRectangleLayer();

  }
  public get typeOf(): number {
    return Workspace.WorkModeDefault;
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
}

class WorkModeSelectionRectangle extends WorkModeBase {

  constructor(workspace: Workspace) {
    super(workspace);
    this.workspace.cssClasses = "mouseCross";

  }
  public get typeOf(): number {
    return Workspace.WorkModeRectangleSelection;
  }

  public mouseMove(event: MouseEvent) {
    if (this.workspace.selectionRectangleLayer)
      this.workspace.selectionRectangleLayer.mouseMove(event);

  }

  public mouseDown(event: MouseEvent, layer: Layer) {

    if (this.workspace.selectionRectangleLayer == undefined) {
      var rect = this.workspace.nativeElement.getBoundingClientRect();
      let mouseX = (event.pageX - rect.left) + window.scrollX;
      let mouseY = (event.pageY - rect.top) + window.scrollY;
      //buradaki 50 ve 50 workspace margin left ve top değerleri;
      let selectionRectangleLayer = new LayerSelectRectangle(0, 0, mouseX - 50, mouseY - 50);
      selectionRectangleLayer.mouseDownSelectedPoint(event, 6);
      this.workspace.selectionRectangleLayer = selectionRectangleLayer;
    }
  }
  public mouseUp(event: any) {
    if (this.workspace.selectionRectangleLayer)
      this.workspace.selectionRectangleLayer.mouseUp(event);
  }

}

class WorkModeResizeWorkspace extends WorkModeBase {
  private previousWorkingMode: number;
  constructor(workspace: Workspace, previousWorkingMode: number) {
    super(workspace);
    this.previousWorkingMode = previousWorkingMode;
    this.workspace.cssClasses = "mouseNWSE";

  }
  public get typeOf(): number {
    return Workspace.WorkModeResizeWorkspace;
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

    this.workspace.selectWorking(this.previousWorkingMode);
  }


}







