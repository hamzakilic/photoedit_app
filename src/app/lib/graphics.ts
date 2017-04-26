import {Image } from './image';


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
     this.context.fillStyle = "rgba(255,255,255,1)";
     this.context.rect(0, 0, width, height);
     this.context.fill();

  }
  public dispose(){

  }
  public  drawImage(img:Image){

     let imageData = this.context.getImageData(0,0,this.width,this.height);

     var data = imageData.data;
     //imageData.data=img.Pixels;

     //img.Pixels.forEach((val,index)=>{ data[index]=val});
     data.set(img.Pixels);


     this.context.putImageData(imageData,0,0);

  }
}
