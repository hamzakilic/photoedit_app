import { Layer } from './layer';
import { Graphics } from '../../lib/graphics';
import { Callback } from '../../lib/callback';
import { HImage } from '../../lib/image';
import { Rect } from '../../lib/draw/rect';

import { Point } from '../../lib/draw/point';
import { RotationHelper, RotationMove } from './lib/rotationHelper';


export class LayerSelectRectangle extends Layer {

   isFinishedContructing:boolean
   animation:any;

  constructor(width: number, height: number,left: number, top: number) {
    super("select rectangle layer");
    
    this.keepRatio = false;
    this.scaleView = false;

     this.width = width;
     this.height = height;
     this.marginLeft = left;
     this.marginTop = top;
     this.isSelected= true;

     this.canRotate = false;
     this.isFinishedContructing= false;



  }




  public get classes():any{   
    return { clayerEmpty:true};
  }
   public mouseDown(event:MouseEvent){
     super.mouseDown(event);
     
    
   }
   public mouseMove(event: MouseEvent) {
    if(this.isFinishedContructing){
     super.mouseMove(event);
    }else
    if (this.isSelected && this.isMouseDown ) {          
        this.calculateBy(event.movementX,event.movementY,0,0,0,0,new Callback(()=>this.render()));
        /* this.width += event.movementX;
        this.height += event.movementY;
        this.resizedAgain=false;
        this.whenCreatedGraphicsAgain=new Callback(()=>this.render()); */

      }
    
      

  }

  public mouseDownSelectedPoint(event: MouseEvent, corner: number) {
    super.mouseDownSelectedPoint(event,corner);
    this.stopAnimation();
  }

  
  
  
  public mouseUp(event: any) {

    //console.log(this.name + " mouseup");
    super.mouseUp(event);
    this.isFinishedContructing=true;
    this.startAnimation();
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


  

  public render(): void {
      this.graphics.save();
      let rect= new Rect(0,0,this.width,this.height);
      this.graphics.clearRect(rect);
      this.graphics.lineWidth(3);
      this.graphics.fillRect(rect,this.fillStyle);
      this.graphics.drawRect(rect,this.strokeStyle);
      /*this.graphics.fillRect(new Rect(0,0,10,10),"#FFFFFF");
      this.graphics.fillRect(new Rect(this.width-10,0,10,10),"#FFFFFF");
      this.graphics.fillRect(new Rect(this.width-10,this.height-10,10,10),"#FFFFFF");
      this.graphics.fillRect(new Rect(0,this.height-10,10,10),"#FFFFFF");*/
      this.graphics.restore();
      
      
  }
  protected frameCounter=0;
  protected strokeStyle="#FFF";
  public fillStyle="rgba(" + 10 + "," + 10 + "," + 50 + "," + (100 / 255) + ")";
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

  //this.animation=window.requestAnimationFrame(()=>this.renderAnimation());
   this.scheduleAnimation();
 
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

  public selectedCss() {
     let classes =  {
            divSelectedLayer: false,
            divCropLayer: true,
        };
        return classes;
   }

   protected calculatePoint(event:MouseEvent):Point{
    if (this.htmlElement) {
      let rc = (<HTMLCanvasElement>this.htmlElement.nativeElement).getBoundingClientRect();
      let point = { x: event.clientX - rc.left, y: event.clientY - rc.top };     

        if (point.x >= 0 && point.y >= 0 && point.x <= this.width && point.y <= this.height) {
          let curPoint=new Point(point.x, point.y);
          
          return curPoint;
        }
      
    }
    return undefined;
  }
}
