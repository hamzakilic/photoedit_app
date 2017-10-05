
import { Rect } from './../../lib/draw/rect';
import { Graphics } from './../../lib/graphics';
import { Polygon } from '../../lib/draw/polygon';
import { Layer } from './layer';

import { Callback } from '../../lib/callback';
import { HImage } from '../../lib/image';


import { Point } from '../../lib/draw/point';
import { RotationHelper, RotationMove } from './lib/rotationHelper';





abstract class Shape{

  protected strokeStyle="#FFF";
  protected fillStyle="rgba(" + 10 + "," + 10 + "," + 50 + "," + (100 / 255) + ")";

  abstract render(graphics:Graphics);
  abstract mouseDown(point:Point):boolean;
  abstract mouseMove(point:Point):boolean;
  abstract mouseUp(point:Point);
  abstract toPolygon():Polygon;
  abstract doubleClick(point:Point);
}
class ShapeRect extends Shape{
    private _startPoint:Point;
    private _endPoint:Point;
    private _isConstructing=true;
    constructor(point:Point) {
      super();
      this._startPoint=point;
      this._endPoint=point;
      
    }
    render(graphics:Graphics){
      graphics.lineWidth(2);
      let sxmin =Math.min(this._startPoint.X,this._endPoint.X);
      let symin=Math.min(this._startPoint.Y,this._endPoint.Y);
      let exmax=Math.max(this._startPoint.X,this._endPoint.X);
      let eymax=Math.max(this._startPoint.Y,this._endPoint.Y);
      
      let rect=new Rect(sxmin,symin,exmax-sxmin,eymax-symin);      
      graphics.fillRect(rect,this.fillStyle);
      graphics.drawRect(rect,this.strokeStyle);
    }

    mouseMove(point:Point):boolean{
      if(point)
      if(this._isConstructing){
        this._endPoint=point;
        
       return true;   
      }
      return false;
    }

    mouseUp(point:Point):boolean{
      this._isConstructing=false;
      return true;
    }
    mouseDown(point:Point):boolean{
      return true;
    }
    doubleClick(point:Point){

    }
    toPolygon():Polygon{
      let sxmin =Math.min(this._startPoint.X,this._endPoint.X);
      let symin=Math.min(this._startPoint.Y,this._endPoint.Y);
      let exmax=Math.max(this._startPoint.X,this._endPoint.X);
      let eymax=Math.max(this._startPoint.Y,this._endPoint.Y);
      
      let rect=new Rect(sxmin,symin,exmax-sxmin,eymax-symin);      
      let points=[new Point(rect.x,rect.y),
        new Point(rect.x,rect.y+rect.height),
        new Point(rect.x+rect.width,rect.y+rect.height),
        new Point(rect.x+rect.width,rect.y)];
      return  new Polygon(points);
    }
}

class ShapeEllipse extends Shape{
  private _isConstructing=true;
  
  private _startPoint:Point;
  private _endPoint:Point;
  constructor(point:Point) {
    super();
    
    this._startPoint=point;
    this._endPoint=point;
    
  }
  render(graphics:Graphics){

    let sxmin =Math.min(this._startPoint.X,this._endPoint.X);
    let symin=Math.min(this._startPoint.Y,this._endPoint.Y);
    let exmax=Math.max(this._startPoint.X,this._endPoint.X);
    let eymax=Math.max(this._startPoint.Y,this._endPoint.Y);
    let width=exmax-sxmin;
    let height=eymax-symin;

    let centerX = width / 2+sxmin;
    let centerY = height / 2+symin;    
  
    graphics.beginPath();
    graphics.lineWidth(2);
    graphics.strokeStyle(this.strokeStyle);
    graphics.fillStyle(this.fillStyle);
    graphics.ellipse(centerX,centerY,width/2,height/2,0,0,2*Math.PI);    
        
    graphics.fill();
    graphics.stroke();
  }

  mouseDown(point:Point):boolean{
    return true;
  }
  mouseMove(point:Point):boolean{
    if(point)
    if(this._isConstructing){
      this._endPoint=point;
      
     return true;   
    }
    return false;
  }

  mouseUp(point:Point):boolean{
    this._isConstructing=false;
    return true;
  }
  toPolygon():Polygon{
    return undefined;
  }

  doubleClick(point:Point){
    
  }
}

class ShapeLasso extends Shape{
  protected _isConstructing=true;
  protected points: Array<Point>;
  
  constructor(point:Point) {
    super();
    this.points=[];
    if(point)
    this.points.push(point);
    
  }
  render(graphics:Graphics){

    if (this.points.length > 2) {
      graphics.beginPath();
      graphics.strokeStyle("#FFF");
      graphics.fillStyle(this.fillStyle);
      graphics.lineWidth(2);
      graphics.moveTo(this.points[0].X, this.points[0].Y);
      let i = 1;
      for (i = 1; i < this.points.length - 2; ++i) {

        var xc = (this.points[i].X + this.points[i + 1].X) / 2;
        var yc = (this.points[i].Y + this.points[i + 1].Y) / 2;
        graphics.quadraticCurveTo(this.points[i].X, this.points[i].Y, xc, yc);
      }

      graphics.quadraticCurveTo(this.points[i + 1].X, this.points[i + 1].Y, this.points[0].X, this.points[0].Y);//close curve
      graphics.closePath();
      graphics.stroke();
      graphics.fill();
    }
  }

  mouseDown(point:Point):boolean{
    return true;
  }
  mouseMove(point:Point):boolean{
    if(point)
    if(this._isConstructing){
      
        this.calculateBetweenPoints(point).forEach(item => this.points.push(item));
        this.points.push(point);       
      
      
     return true;   
    }
    return false;
  }

  mouseUp(point:Point):boolean{
    this._isConstructing=false;
    if (this.points.length > 1)
    this.calculateBetweenPoints(this.points[0]).forEach(item => this.points.push(item));
    return true;
  }

  doubleClick(point:Point){
    
  }

  toPolygon():Polygon{
    return undefined;
  }

  protected calculateBetweenPoints(curPoint: Point): Array<Point> {
    let pTemps = [];
    if (this.points.length >= 1) {

      let prevPoint = this.points[this.points.length - 1];
      while (true) {

        let d = Math.sqrt((curPoint.X - prevPoint.X) * (curPoint.X - prevPoint.X) + (curPoint.Y - prevPoint.Y) * (curPoint.Y - prevPoint.Y));
        if (d > 5) {
          let t = 5 / d;
          let temp = new Point((1 - t) * prevPoint.X + t * curPoint.X, (1 - t) * prevPoint.Y + t * curPoint.Y);
          pTemps.push(temp);
          prevPoint = temp;
        } else break;
      }

    }
    return pTemps;
  }
}

class ShapePolygon extends ShapeLasso{
  /**
   *
   */
  constructor(point:Point) {
    super(point);
    //algorithma için bir tane fazladan ekledik
    //this.point[this.point.length-1]=point
    //mousemove için çalışsın diye
    this.points.push(point);
    
  }

  render(graphics:Graphics){
    if (this.points.length > 1) {
      graphics.beginPath();
      let strokeStyle="#FFF";
      /*  graphics.createLinearGradient(0,0,50,0);
      strokeStyle.addColorStop(0,'rgb(0,0,0)');
      strokeStyle.addColorStop(1,'rgb(255,255,255)'); */
      graphics.strokeStyle(strokeStyle);
      graphics.fillStyle(this.fillStyle);
      graphics.lineWidth(2);
      graphics.beginPath();
      graphics.moveTo(this.points[0].X, this.points[0].Y);
      let i = 1;
      for (i = 1; i < this.points.length; ++i) {
        graphics.drawLine2(this.points[i].X,this.points[i].Y);
        
      }      
      graphics.closePath();
      graphics.stroke();
      graphics.fill();
    }
  }
  

  mouseMove(point:Point):boolean{
    if(point)
    if(this._isConstructing){      
      
      this.points[this.points.length-1]=point;
      
      
     return true;   
    }
    return false;
  }

  mouseDown(point:Point):boolean{
    if(!this._isConstructing){
      this._isConstructing=true;
      this.points = [];
      this.points.push(point);
      this.points.push(point);//add twice
      return true;
    }
    return false;
  }

  mouseUp(point:Point):boolean{
    
    if (this.points.length > 1){
    this.points[this.points.length-1]=point;
        this.points.push(point);
        return false;
    }
    return true;
  }
  doubleClick(point:Point){
    if(this._isConstructing){
      this._isConstructing=false;
      this.points[this.points.length-1]=point;
    }
  }
  
}


export class LayerSelect extends Layer {

   static readonly SubTypeRect="rect";
   static readonly SubTypeEllipse="ellipse";
   static readonly SubTypePolygon="polygon";
   static readonly SubTypeLasso="lasso";

   private _polygons:Array<Polygon>;
   isFinishedContructing:boolean
   animation:any;
   private _shapeType:string;
   private _shape:Shape;

  constructor(width: number, height: number,left: number, top: number) {
    super("select layer");
    
    this.keepRatio = false;
    this.scaleView = false;

     this.width = width;
     this.height = height;
     this.marginLeft = left;
     this.marginTop = top;
     this.isSelected= true;
     this.showSelected=false;
     this.canRotate = false;
     this.isFinishedContructing= false;
     this._polygons=[];

  }


 public set shapeType(type:string){
   this._shapeType=type;
 }

  public get classes():any{   
    return { clayerEmpty:true};
  }
   public mouseDown(event:MouseEvent){
     super.mouseDown(event);
     switch(this._shapeType){
      case LayerSelect.SubTypeRect:
          let point = this.normalizeMouseEvent(event);
          if(point){            
          this._shape = new ShapeRect(point);
          }
          break;
          case LayerSelect.SubTypeEllipse:
          point = this.normalizeMouseEvent(event);
          if(point){            
          this._shape = new ShapeEllipse(point);
          }
          break;
          case LayerSelect.SubTypeLasso:
          point = this.normalizeMouseEvent(event);
          if(point){            
          this._shape = new ShapeLasso(point);
          }
          break;
          case LayerSelect.SubTypePolygon:
          point = this.normalizeMouseEvent(event);
          if(point && !(this._shape instanceof ShapePolygon)){            
          this._shape = new ShapePolygon(point);
          }
          else this._shape.mouseDown(this.normalizeMouseEvent(event));          
          break;

     }
    
   }
   public mouseMove(event: MouseEvent) {
      if(this._shape){
        if(this._shape.mouseMove(this.normalizeMouseEvent(event)))//if something changed
          this.render();//then render again
    }
    
      

  }
   
  
  
  public mouseUp(event: any) {
    
    super.mouseUp(event);
    if(this._shape)
       if(this._shape.mouseUp(this.normalizeMouseEvent(event))){
         this._polygons.push(this._shape.toPolygon());         
         this._shape=undefined;
         this.render();
       }
    
  }

  

  protected strokeStyle="#FFF";
  public fillStyle="rgba(" + 10 + "," + 10 + "," + 50 + "," + (100 / 255) + ")";

  renderPolygon(polygon:Polygon){
    let points= polygon.Points;
    this.graphics.lineWidth(2);
    this.graphics.strokeStyle(this.strokeStyle);
    this.graphics.beginPath();
    this.graphics.moveTo(points[0].X,points[0].Y);
    for(let i=1;i<points.length;++i){
      this.graphics.drawLine2(points[i].X,points[i].Y);
    }
    this.graphics.closePath();
    this.graphics.stroke();

  }

  public render(): void {
      
      this.graphics.save();
      let rect= new Rect(0,0,this.width,this.height);
      this.graphics.clearRect(rect);
      this._polygons.forEach((item)=>this.renderPolygon(item));
      if(this._shape)
          this._shape.render(this.graphics);
      this.graphics.restore();
      
      
  }

  protected scheduleAnimation(){
    setTimeout(()=>{
      if(this.animation)
     this.animation=window.requestAnimationFrame(()=>this.renderAnimation());
   },1000/3);
  }
  
  
  public dispose() {
    this.stopAnimation();

  }

  protected frameCounter=0;
  
  protected renderAnimation():void{
  }

  protected startAnimation(){
    if(!this.animation)
    this.animation=window.requestAnimationFrame(()=>this.renderAnimation());
  }
  protected stopAnimation(){
    if(this.animation)
      window.cancelAnimationFrame(this.animation);
      this.animation=undefined;
  }

  public doubleClick(event:MouseEvent){
    if(this._shape)
    this._shape.doubleClick(this.normalizeMouseEvent(event));
  }


 /* 

  protected frameCounter=0;
  
  protected renderAnimation():void{
    
    if(this.graphics){
      
    this.graphics.save();
    let rect= new Rect(0,0,this.width,this.height);
    this.graphics.clearRect(rect);
    
    this.graphics.beginPath();
    let splitSize=5;
    let totalParts= Math.ceil(this.width/splitSize)*2+Math.ceil(this.height/splitSize)*2;
    let lh=4;//linewidth
    
    this.frameCounter++;
    let dividen=this.frameCounter%totalParts;
    for(let x=0;x<totalParts;x+=1){     
      
        if((x+dividen)%2==0){
        if(x*splitSize<this.width)          
           this.graphics.drawLine(x*splitSize,0,x*splitSize+splitSize,0,lh,this.strokeStyle);
        else
        if(x*splitSize<this.width+this.height)
          this.graphics.drawLine(this.width,x*splitSize-this.width,this.width,x*splitSize+splitSize-this.width,lh,this.strokeStyle);
        else
        if(x*splitSize<this.width+this.height+this.width)
          this.graphics.drawLine(this.width+this.height+this.width-x*splitSize,this.height,this.width+this.height+this.width-x*splitSize+splitSize,this.height,lh,this.strokeStyle);
        else
          this.graphics.drawLine(0,this.width+this.height+this.width+this.height-x*splitSize,0,this.width+this.height+this.width+this.height-x*splitSize+splitSize,lh,this.strokeStyle);
        
        
      }
      
      
    }
    this.graphics.restore();
  }

  
   this.scheduleAnimation();
 
  }

   */

  
}


