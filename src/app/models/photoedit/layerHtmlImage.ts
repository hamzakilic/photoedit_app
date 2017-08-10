import { Layer } from './layer';
import { Graphics } from '../../lib/graphics';

import { HImage } from '../../lib/image';
import { Rect } from '../../lib/draw/rect';
import { Calc } from '../../lib/calc';

export class LayerHtmlImage extends Layer {

  private img: HTMLImageElement;

  constructor(img: HTMLImageElement, name?: string) {
    super(name);
    this.sourceMask=new Rect(0,0,img.width,img.height);
    this.width = img.width;
    this.height = img.height;
    this.canRotate = true;
    this.img = img;
    


  }
  public render(): void {
    
    
    this.graphics.save();
    this.graphics.clearRect(new Rect(0, 0, this.width, this.height));
    this.graphics.setGlobalAlpha(this.globalAlpha);
    /*if (this.rotateAngleDeg != 0) {
      let tx = this.width  / 2;
      let ty = this.height / 2;
      this.graphics.translate(tx,ty);
      
      this.graphics.rotate(this.rotateAngleDeg);
      //this.graphics.fillRect(new Rect(this.width * this.scale / 2 - 10, this.height * this.scale / 2 - 10, 20, 20), "#FFFFFF");
      this.graphics.translate(-tx,-ty); 
      let rotatedSourceMask=Calc.rotateRect(this.sourceMask,this.rotateAngleDeg,0,0);
      
      //this.graphics.drawHtmlImageRect(this.img,this.sourceMask,new Rect(0,0,this.sourceMask.width>this.width?this.width:this.sourceMask.width,this.sourceMask.height>this.height?this.height:this.sourceMask.height));

      //else{
      //let rotatedSourceMask=Calc.rotateRect(this.sourceMask,this.rotateAngleDeg,0,0);
      let x =(this.width-this.sourceMask.width)/2;
     
      let y =(this.height-this.sourceMask.height)/2;
      
      this.graphics.drawHtmlImageRect(this.img,this.sourceMask,new Rect(x,y,this.sourceMask.width>this.width?this.width:this.sourceMask.width,this.sourceMask.height>this.height?this.height:this.sourceMask.height));
      //this.graphics.drawHtmlImageRect(this.img,this.sourceMask,new Rect((this.width-rotatedSourceMask.width)/2,(this.height-rotatedSourceMask.height)/2,rotatedSourceMask.width>this.width?this.width:rotatedSourceMask.width,rotatedSourceMask.height>this.height?this.height:rotatedSourceMask.height));
      //}
     //this.graphics.drawHtmlImageRect(this.img,this.sourceMask,new Rect(0,0,this.sourceMask.width,this.sourceMask.height));
      
     
    }
    else*/
    if(!this.scaleView){

      this.graphics.drawHtmlImageRect(this.img,this.sourceMask,new Rect(0,0,this.sourceMask.width>this.width?this.width:this.sourceMask.width,this.sourceMask.height>this.height?this.height:this.sourceMask.height));
    }
    else this.graphics.drawHtmlImageRect(this.img,this.sourceMask,new Rect(0,0,this.width,this.height));
    
    this.graphics.restore();
  }




  public dispose() {

  }
}
