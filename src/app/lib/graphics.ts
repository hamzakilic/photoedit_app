import {HImage } from './image';
import { Rect } from '../lib/draw/rect'

export class Graphics{
  private context : CanvasRenderingContext2D;
  public readonly width:number;
  public readonly height:number;
  public scale: number;
  /**
   * creates a graphics context from canvas element
   */
  constructor(element: any,width: number, height: number,scale: number) {

     this.context = element.nativeElement.getContext("2d");
     this.width = width;
     this.height = height;
     this.scale = scale;
    /* this.context.fillStyle = "rgba(255,255,255,1)";
     this.context.rect(0, 0, width, height);
     this.context.fill();*/

  }
  public dispose(){

  }
  public  drawImage(img:HImage){

     let imageData = this.context.getImageData(0,0,this.width,this.height);

     var data = imageData.data;

     data.set(img.Pixels);


     this.context.putImageData(imageData,0,0);



  }


public  drawHtmlImageFit(img: HTMLImageElement,x: number, y: number){
      //console.log("drawHmlImage:"+img.naturalWidth+"/"+img.naturalHeight+"/"+this.width+"/"+this.height);
      this.context.drawImage(img,x,y,img.naturalWidth,img.naturalHeight,0,0,this.width,this.height);

  }
  public  drawHtmlImage(img: HTMLImageElement,x: number, y: number){

      this.context.drawImage(img,x,y);

  }


  public fillRect(rect:Rect, brush:string):void{
    this.context.fillStyle = brush;
    this.context.fillRect(rect.x,rect.y,rect.width,rect.height);
  }

  public drawLine(x1: number,y1: number ,x2: number,y2: number,lineWidth: number = 1, brush?: string){
   this.context.beginPath();
   this.context.moveTo(x1,y1);
   this.context.lineTo(x2,y2);
   this.context.lineWidth = lineWidth;
   if(brush)
    this.context.strokeStyle = brush;
  this.context.stroke();
  }
}
