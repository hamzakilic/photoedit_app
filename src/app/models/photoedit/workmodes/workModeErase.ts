import { Polygon } from './../../../lib/draw/polygon';
import { BUSY_CONFIG_DEFAULTS } from 'angular2-busy';
import { element } from 'protractor';
import { Helper } from './../lib/helper';
import { Point } from './../../../lib/draw/point';
import { Graphics } from './../../../lib/graphics';
import { Workspace } from './../workSpace';
import { WorkModeBrush } from './workModeBrush';
import { WorkModeEdit, EditType } from './workModeEdit';
import { Color } from '../../../lib/draw/color';
import { Layer } from '../layer';

export class WorkModeErase extends WorkModeEdit {

  constructor(workspace: Workspace) {
    super(workspace);

  }

  protected createEditType(): EditType {
    return new EditTypeErase();
  }
  public get typeOf(): number {
    return Workspace.WorkModeErase;
  }
  public get subTypeOf(): string {
    return "";
  }


  public mouseMove(event: MouseEvent, scroll: Point) {
    if (this._isMouseDown) {
      if (this.selectedLayer && this.selectedRegions.length > 0) {
        this.selectedLayer.graphics.save();
        this.selectedRegions.forEach((region) => {
          this.selectedLayer.graphics.drawPolygon(region, false);
          this.selectedLayer.graphics.clip();
          if (this.selectedLayer.hitMouseEvent(event, scroll)) {
            let normalizedEvent = this.selectedLayer.normalizeMouseEvent(event, scroll);
            if (normalizedEvent) {
              if (this.hitRegionsMouseEvent(normalizedEvent, this.selectedRegions)) {

                this._editType.render(this.selectedLayer, normalizedEvent, this.workspace.foregroundColor);

              }
            }

          }
        });

        this.selectedLayer.graphics.restore();
      }
    }
  }


}

export class EditTypeErase extends EditType {
  private lastMovePoint: Point;
  private _size: number;
  private _opacity: number;

  private _hardness: number;
  constructor() {
    super();
    this.lastMovePoint = undefined;
    this._size = 5;
    this._opacity = 1;
    this._hardness = 1;

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


  public get hardness(): number {
    return this._hardness;
  }
  public set hardness(val: number) {
    this._hardness = val;
  }
  private calculateHardness(brush: any, graphics: Graphics, x: number, y: number, size: number) {
    if (this._hardness == 1) {
      graphics.fillStyle(brush);
    } else {
      let gradient = graphics.createRadialGradient(x, y, 0, x, y, size);
      
      let color = Color.from(brush);
      if (!color) {
        graphics.fillStyle(brush);
        return;
      }

      gradient.addColorStop(0, color.toRgb());
      color.a = color.a*this.opacity;
      gradient.addColorStop(this.hardness, color.toRgba())
      color.a = 0;
      gradient.addColorStop(1, color.toRgba());
      graphics.fillStyle(gradient);
    }
  }
  render(layer: Layer, point: Point, brush: any) {


    let points = [];
    if (this.lastMovePoint) {
      let d = Math.sqrt((this.lastMovePoint.X - point.X) * (this.lastMovePoint.X - point.X) + (this.lastMovePoint.Y - point.Y) * (this.lastMovePoint.Y - point.Y));
      if(this.hardness !=1 && d<this.size/4){        
      return;
      } 
      points = Helper.calculateBetweenPoints([this.lastMovePoint, point], this._size/4);
    } else {
      points.push(point);
    }
    this.lastMovePoint = point;

   
    //layer.graphics.setGlobalAlpha(this._opacity);
    points.forEach(element => {
        if(this.opacity==1){
          layer.graphics.setBlendMode("destination-out");
        this.calculateHardness("rgba(255,255,255,"+this._opacity*255+")", layer.graphics, element.X, element.Y, this._size / 2);
        layer.graphics.beginPath();
        layer.graphics.ellipse(element.X, element.Y, this._size / 2, this._size / 2, 0, 0, 2 * Math.PI);
        layer.graphics.closePath();
        layer.graphics.fill();
        }else{
          //this.calculateHardness("rgba(255,255,255,0)", layer.graphics, element.X, element.Y, this._size / 2);
         // layer.graphics.fillStyle("#FFFF");
          //layer.graphics.beginPath();
          layer.graphics.ellipse(element.X, element.Y, this._size / 2, this._size / 2, 0, 0, 2 * Math.PI);
          //layer.graphics.closePath();
         
          for(let y=element.Y-this._size/2;y<element.Y+this._size/2;++y)
          for(let x=element.X-this._size/2;x<element.X+this._size/2;++x)
          {
             if(layer.graphics.isPointInPath(x,y)){
               let color= layer.graphics.getPixel(x,y);
               
               color.a -=this.opacity*255;              
               layer.graphics.setPixel(x,y,color);
             }
          }
        }
      
      
    });



  }
  mouseUp(event: MouseEvent, scroll: Point) {
    this.lastMovePoint = undefined;
  }
}