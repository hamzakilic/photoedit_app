import { Layer } from './layer';
import { Graphics } from '../../lib/graphics';

import { HImage } from '../../lib/image';
import { Rect } from '../../lib/draw/rect';

export class LayerCrop extends Layer {



  constructor(width: number, height: number,left: number, top: number) {
    super("crop layer");

     this.width = width;
     this.height = height;
     this.marginLeft = left;
     this.marginTop = top;
     this.isSelected= true;

     this.canRotate = false;




  }




  public render(): void {
      this.graphics.fillRectRGBA(new Rect(0,0,this.width,this.height),10,10,50,100);
      /*this.graphics.fillRect(new Rect(0,0,10,10),"#FFFFFF");
      this.graphics.fillRect(new Rect(this.width-10,0,10,10),"#FFFFFF");
      this.graphics.fillRect(new Rect(this.width-10,this.height-10,10,10),"#FFFFFF");
      this.graphics.fillRect(new Rect(0,this.height-10,10,10),"#FFFFFF");*/
  }
  public dispose() {

  }

  public selectedCss() {
     let classes =  {
            divSelectedLayer: false,
            divCropLayer: true,
        };
        return classes;
   }
}
