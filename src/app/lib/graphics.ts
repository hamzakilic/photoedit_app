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
     //imageData.data=img.Pixels;

     //img.Pixels.forEach((val,index)=>{ data[index]=val});
     data.set(img.Pixels);


     this.context.putImageData(imageData,0,0);

  }


public  drawHtmlImage(img: HTMLImageElement,x: number, y: number){

      this.context.drawImage(img,x,y);

  }


  public fillRect(rect:Rect, brush:string):void{
    this.context.fillStyle = brush;
    this.context.fillRect(rect.x,rect.y,rect.width,rect.height);
  }
}
