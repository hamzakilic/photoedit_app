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
import { Rect } from '../../../lib/draw/rect';

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
  render2(layer: Layer, point: Point, brush: any) {

    
    let points = [];
    if (this.lastMovePoint) {
       let d = Helper.pointDif(this.lastMovePoint,point);
       if(d<2)return;
       
      points = Helper.calculateBetweenPoints([this.lastMovePoint, point],this.opacity==1?this._size/4:this._size,false);
    } else {
      points.push(point);
    }
    this.lastMovePoint = points[points.length-1];

   
    
    points.forEach(element => {
      console.log(element);
        if(this.opacity==1){
          layer.graphics.setBlendMode("destination-out");
        this.calculateHardness("rgba(255,255,255,"+this._opacity*255+")", layer.graphics, element.X, element.Y, this._size / 2);
        layer.graphics.beginPath();
        layer.graphics.ellipse(element.X, element.Y, this._size / 2, this._size / 2, 0, 0, 2 * Math.PI);
        layer.graphics.closePath();
        layer.graphics.fill();
        }else{
          
          
          let rect = new Rect(element.X-this.size/2, element.Y-this.size/2,this.size,this.size);
          
          let image= layer.graphics.getImage(rect);
          for(let i=0;i<image.Pixels.byteLength;i+=4){
            image.Pixels[i+3]=image.Pixels[i+3]*this.opacity;
          }
          layer.graphics.putImage(image,rect);
        }
      
      
    });



  }

  render(layer:Layer, point: Point, brush: any) {
    if(!point)
        return;
       
    //console.log("move:"+point.X+":"+point.Y);
    let points:Array<Point>=[];
    if(this.lastMovePoint==undefined){
      points.push(Helper.intPoint(point));
      

    }else{
    //  console.log("lastmove:");
    //  console.log(this.lastMovePoint);
      let tempSize=this.size/2;
      if(this.hardness!=1)
      tempSize=this.size/3;
      let innerPoints= Helper.calculatePointsBetween(this.lastMovePoint,point,tempSize);
      innerPoints.forEach(item=>{
        if(this.lastMovePoint.X<=point.X)
        item.X = item.X.extCeil();
        else item.X=item.X.extFloor();

        if(this.lastMovePoint.Y<=point.Y)
        item.Y = item.Y.extCeil();
        else item.Y=item.Y.extFloor();
        

        points.push(item);
      });

    }
    
    
    Helper.distinctPoints(points);
    if(this.lastMovePoint && points.length>=1 && points[0].X==this.lastMovePoint.X && points[0].Y==this.lastMovePoint.Y)
       points.splice(0,1);
    if(points.length==0)
        return;
    
    //console.log(points);

    this.lastMovePoint=point;
   
    
    
    points.forEach(element => {
       
      if(this.opacity==1){
        layer.graphics.setBlendMode("destination-out");
      this.calculateHardness("rgba(255,255,255,"+this._opacity*255+")", layer.graphics, element.X, element.Y, this._size / 2);
      layer.graphics.beginPath();
      layer.graphics.ellipse(element.X, element.Y, this._size / 2, this._size / 2, 0, 0, 2 * Math.PI);
      layer.graphics.closePath();
      layer.graphics.fill();
      }/* else{
        layer.graphics.setBlendMode("normal");
        
        let rect = new Rect(element.X-this.size/2, element.Y-this.size/2,this.size,this.size);
        
        let image= layer.graphics.getImage(rect);
        for(let i=0;i<image.Pixels.byteLength;i+=4){
          image.Pixels[i+3]=image.Pixels[i+3]*this.opacity;
        }
        layer.graphics.putImage(image,rect);
      } */
     
    });



  }
  mouseUp(event: MouseEvent, scroll: Point) {
    this.lastMovePoint = undefined;
  }
  mouseDown(event: MouseEvent, scroll: Point) {
    //boş olmalı
  }
}