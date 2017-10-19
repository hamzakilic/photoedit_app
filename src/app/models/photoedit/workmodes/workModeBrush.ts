import { Imaging } from './../../../lib/imagealgorithm/imaging';
import { HImage } from './../../../lib/image';
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
      let color =Color.from(brush);
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

  render(layer:Layer, point: Point, brush: any) {
    if(!point)
        return;
     //   console.log("*******");
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
    layer.graphics.setBlendMode(this.blendMode);
    
    
    points.forEach(element => {
       
      this.calculateHardness(brush,layer.graphics,element.X,element.Y,this.size/2);
      
      
      if(this.hardness!=1){
        layer.graphics.beginPath();
        layer.graphics.ellipse(element.X, element.Y, this.size/2, this.size/2, 0, 0, 2 * Math.PI);
        layer.graphics.closePath();
        layer.graphics.fill();
       }
      else{        
        let rect=new Rect((element.X-this.size/2).extRound(),(element.Y-this.size/2).extRound(),this.size,this.size)
       
         layer.graphics.fillRect(rect);
      
      }
     
    });



  }
  mouseUp(event: MouseEvent,scroll:Point,layer:Layer) {
    this.lastMovePoint = undefined;
  
    
  }

  
  mouseDown(event:MouseEvent,scroll:Point,layer:Layer){
     //boş olmalı
  
  }
}


