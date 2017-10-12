import { BUSY_CONFIG_DEFAULTS } from 'angular2-busy';
import { element } from 'protractor';
import { Rect } from './../../../lib/draw/rect';
import { ToolsOptionsBrushComponent } from './../../../components/tools-options-brush/tools-options-brush.component';
import { LayerEmpty } from './../layerEmpty';
import { Helper } from './../lib/helper';
import { Graphics } from './../../../lib/graphics';
import { Point } from './../../../lib/draw/point';
import { Polygon } from './../../../lib/draw/polygon';
import { LayerSelect } from './../layerSelect';
import { Workspace } from './../workSpace';
import { WorkModeBase } from "./workModeBase";
import { Layer } from '../layer';
import { Color } from '../../../lib/draw/color';
import { WorkModeEdit, EditType } from './workModeEdit';

export class WorkModeBrush extends WorkModeEdit {

 
  constructor(workspace: Workspace) {    
    super(workspace);
    
  }
  protected createEditType():EditType{
    return new EditTypeBrush();
  }
  public  get typeOf(): number {
    return Workspace.WorkModeBrush;
  }
  
  public get subTypeOf(): string{
     return "";
  }


}


export class EditTypeBrush extends EditType{
  private lastMovePoint: Point;
  private _size: number;
  private _opacity: number;
  private _blendMode: string;
  private _hardness:number;
  constructor() {
    super();
    this.lastMovePoint = undefined;
    this._size = 5;
    this._opacity = 1;
    this._hardness=1;
    this._blendMode = "normal";
  }

  public get size(): number {
    return this._size;
  }
  public set size(val: number) {
    this._size = val;
  }
  public get opacity(): number {
    return this._opacity;
  }
  public set opacity(val: number) {
    this._opacity = val;
  }

  public get blendMode(): string {
    return this._blendMode;
  }
  public set blendMode(val: string) {
    this._blendMode = val;
  }
  public get hardness():number{
    return this._hardness;
  }
  public set hardness(val:number){
    this._hardness = val;
  }
  private calculateHardness(brush:any,graphics:Graphics,x:number,y:number,size:number){
    if(this._hardness==1){
      graphics.fillStyle(brush);
    }else{
      let gradient= graphics.createRadialGradient(x,y,0,x,y,size);
      let color =Color.from(brush);
      if(!color){
        graphics.fillStyle(brush);
        return;
      }
      
      gradient.addColorStop(0,color.toRgb());
      color.a=this._hardness*255;
      gradient.addColorStop(this.hardness,color.toRgba())
      color.a=0;
      gradient.addColorStop(1,color.toRgba());
      graphics.fillStyle(gradient);
    }
  }
  render(layer:Layer, point: Point, brush: any) {
    let points = [];
    if (this.lastMovePoint) {
      points = Helper.calculateBetweenPoints([this.lastMovePoint, point],this._size);
    } else {
      points.push(point);
    }
    this.lastMovePoint = point;
   
    layer.graphics.setBlendMode(this._blendMode);
    layer.graphics.setGlobalAlpha(this._opacity);
    points.forEach(element => {
      this.calculateHardness(brush,layer.graphics,element.X,element.Y,this._size/2);
      layer.graphics.beginPath();
      if(this.hardness!=1)      
      layer.graphics.ellipse(element.X, element.Y, this._size/2, this._size/2, 0, 0, 2 * Math.PI);
      else{
        layer.graphics.fillRect(new Rect(element.X-this.size/2,element.Y-this.size/2,this.size,this.size));
      }
      layer.graphics.closePath();
      layer.graphics.fill();
    });



  }
  mouseUp(event: MouseEvent) {
    this.lastMovePoint = undefined;
  }
}


