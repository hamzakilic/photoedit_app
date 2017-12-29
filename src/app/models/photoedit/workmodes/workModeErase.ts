import { AppService } from './../../../services/app.service';
import { HMath } from './../../../lib/hMath';
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

  constructor(workspace: Workspace,appService:AppService) {
    super(workspace,appService);

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

                this._editType.render(this.selectedLayer, normalizedEvent, this.workspace.foregroundColor,this.workspace.backgroundColor);

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
  private static _size: number=5;
  private static _opacity: number=1;

  private static _hardness: number=1;
  constructor() {
    super();
    this.lastMovePoint = undefined;
    

  }

  public get size(): number {
    return EditTypeErase._size;
  }
  public set size(val: number) {
    EditTypeErase._size = val;
  }
  public get opacity(): number {
    return EditTypeErase._opacity;
  }
  public set opacity(val: number) {
    EditTypeErase._opacity = val;
  }


  public get hardness(): number {
    return EditTypeErase._hardness;
  }
  public set hardness(val: number) {
    EditTypeErase._hardness = val;
  }
  private calculateHardness(brush: any, graphics: Graphics, x: number, y: number, size: number) {
    if (EditTypeErase._hardness == 1) {
      graphics.fillStyle(brush);
    } else {
      let gradient = graphics.createRadialGradient(x, y, 0, x, y, size);
      
      let color = Color.fromStringRGBA(brush);
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
 

  render(layer:Layer, point: Point, brushFG:any,brushBG:any) {
    
    if(!point){      
        return;
    }
       
    //console.log("move:"+point.X+":"+point.Y);
    let points:Array<Point>=[];
    if(this.lastMovePoint==undefined){
      points.push(HMath.intPoint(point));
      

    }else{
    //  console.log("lastmove:");
    //  console.log(this.lastMovePoint);
      let tempSize=this.size/2;
      if(this.hardness!=1)
      tempSize=this.size/3;
      let innerPoints= HMath.calculatePointsBetween(this.lastMovePoint,point,tempSize);
      innerPoints.forEach(item=>{
        if(this.lastMovePoint.x<=point.x)
        item.x = item.x.extCeil();
        else item.x=item.x.extFloor();

        if(this.lastMovePoint.y<=point.y)
        item.y = item.y.extCeil();
        else item.y=item.y.extFloor();
        

        points.push(item);
      });

    }
    
    
    Helper.distinctPoints(points);
    if(this.lastMovePoint && points.length>=1 && points[0].x==this.lastMovePoint.x && points[0].y==this.lastMovePoint.y)
       points.splice(0,1);
    if(points.length==0){
      
        return;
    }
    
    //console.log(points);

    this.lastMovePoint=point;
   
    
    layer.graphics.save();
    points.forEach(element => {
       
      if(this.opacity==1){
        
        layer.graphics.setBlendMode("destination-out");
      this.calculateHardness("rgba(255,255,255,"+this.opacity*255+")", layer.graphics, element.x, element.y, this.size / 2);
      layer.graphics.beginPath();
      layer.graphics.ellipse(element.x, element.y, this.size / 2, this.size / 2, 0, 0, 2 * Math.PI);
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
    this.isSuccess=true;
    layer.graphics.restore();



  }
  mouseUp(event: MouseEvent, scroll: Point) {
    this.lastMovePoint = undefined;
  }
  mouseDown(event: MouseEvent, scroll: Point) {
    this.isSuccess=false;
    //boş olmalı
  }
}