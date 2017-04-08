import {image as iskilip_image} from 'iskilip/img/image';


export class graphics{
  private context : CanvasRenderingContext2D;
  readonly width:number;
  readonly height:number;
  /**
   * creates a graphics context from canvas element
   */
  constructor(element: any,width: number, height: number) {

     this.context = element.nativeElement.getContext("2d");
     this.width = width;
     this.height = height;
     this.context.fillStyle = "rgba(255,255,255,1)";
     this.context.rect(0, 0, width, height);
     this.context.fill();

  }
  drawImage(img:iskilip_image){

     let imageData = this.context.createImageData(this.width,this.height);

     var data = imageData.data;


      for (var i = 0; i < data.length; i += 4) {
      data[i]   = img.Pixels[i];     // red
      data[i + 1] = img.Pixels[i+1];; // green
      data[i + 2] = img.Pixels[i+2]; // blue
      data[i + 3] = img.Pixels[i+3]; // blue
    }

     this.context.putImageData(imageData,0,0);

  }
}
