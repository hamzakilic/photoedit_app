import { AppService } from './../../../services/app.service';

import { HImage } from './../../../lib/image';

import { element } from 'protractor';
import { Rect } from './../../../lib/draw/rect';
import { ToolsOptionsBrushComponent } from './../../../components/tools-options-brush/tools-options-brush.component';
import { LayerEmpty } from './../layerEmpty';
import { Helper } from './../lib/helper';
import { Graphics } from './../../../lib/graphics';
import { Point } from './../../../lib/draw/point';
import { Polygon } from './../../../lib/draw/polygon';
import { LayerSelect } from './../layerSelect';
import { IWorkspace, WorkModes } from './../iworkspace';
import { WorkModeBase } from "./workModeBase";
import { Layer } from '../layer';
import { Color } from '../../../lib/draw/color';
import { WorkModeEdit, EditType } from './workModeEdit';
import { HMath } from '../../../lib/hMath';

export class WorkModeBrush extends WorkModeEdit {

 
  constructor(workspace: IWorkspace,appService:AppService) {    
    super(workspace,appService);
    
  }
  protected createEditType():EditType{
    return new EditTypeBrush();
  }
  public  get typeOf(): number {
    return WorkModes.WorkModeBrush;
  }
  
  public get subTypeOf(): string{
     return "";
  }


}


interface CropedImage{
     rect:Rect;
     image:HImage;
}


export class EditTypeBrush extends EditType{
  private lastMovePoint: Point;
  private static _size: number=5;
  private static _opacity: number=1;
  private static _blendMode: string="normal";
  private static _hardness:number=1;
  constructor() {
    super();
    this.lastMovePoint = undefined;
    
    
  }

  public get size(): number {
    
    return EditTypeBrush._size;
  }
  public set size(val: number) {
    
    EditTypeBrush._size = val;
  }
  public get opacity(): number {
    return EditTypeBrush._opacity;
  }
  public set opacity(val: number) {
    EditTypeBrush._opacity = val;
  }

  public get blendMode(): string {
    return EditTypeBrush._blendMode;
  }
  public set blendMode(val: string) {
    EditTypeBrush._blendMode = val;
  }
  public get hardness():number{
    return EditTypeBrush._hardness;
  }
  public set hardness(val:number){
    EditTypeBrush._hardness = val;
  }
  
  private calculateHardness(brush:any,graphics:Graphics,x:number,y:number,size:number){
    if(this.hardness==1){      
      graphics.fillStyle(brush);
    }else{
      let gradient= graphics.createRadialGradient(x,y,0,x,y,size);
      let color =Color.fromStringRGBA(brush);
      if(!color){
        graphics.fillStyle(brush);
        return;
      }
      
      gradient.addColorStop(0,color.toRgb());
      color.a=this.opacity*255;
      gradient.addColorStop(this.hardness,color.toRgba())
      color.a=0;
      gradient.addColorStop(1,color.toRgba());
      graphics.fillStyle(gradient);
    }
  }

  render(layer:Layer, point: Point, brushFG:any,brushBG:any) {
    
    if(!point){
    
        return;
    }
    
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
        else item.x=item.x.extToInt32();

        if(this.lastMovePoint.y<=point.y)
        item.y = item.y.extCeil();
        else item.y=item.y.extToInt32();
        

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
    layer.graphics.setBlendMode(this.blendMode);
    
    
    points.forEach(element => {
       
      this.calculateHardness(brushFG,layer.graphics,element.x,element.y,this.size/2);
      
      
      if(this.hardness!=1){
        layer.graphics.beginPath();
        layer.graphics.ellipse(element.x, element.y, this.size/2, this.size/2, 0, 0, 2 * Math.PI);
        layer.graphics.closePath();
        layer.graphics.fill();
       }
      else{        
        let rect=new Rect((element.x-this.size/2).extRound(),(element.y-this.size/2).extRound(),this.size,this.size)
       
         layer.graphics.fillRect(rect);
      
      }
     
    });
    this.isSuccess=true;



  }
  mouseUp(event: MouseEvent,scroll:Point,layer:Layer) {
    this.lastMovePoint = undefined;
    
    
  }

  
  mouseDown(event:MouseEvent,scroll:Point,layer:Layer){
     this.isSuccess=false;
  
  }
}


