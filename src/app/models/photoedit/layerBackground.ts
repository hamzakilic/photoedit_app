
import { Layer } from './layer';
import { Graphics } from '../../lib/graphics';

import { HImage } from '../../lib/image';
import { Rect } from '../../lib/draw/rect'

export class LayerBackground extends Layer {

  private pattern: any;

  constructor(name?: string) {
    super(name);
    this.canRotate = false;



  }
  private lastScaleValue = 0;
  private createPattern(graphics: Graphics): boolean {
    let a = [255, 255, 255, 255]
    let b = [180, 180, 180, 255];

    let array = [];

    if (this.lastScaleValue == this.scale)
      return false;
    this.lastScaleValue = this.scale;
    let count=Math.round((this.scale<5?(5-this.scale):0)+1);
    
    for(let xt=0;xt<count;++xt){
    for(let x=0;x<count;++x){
      a.forEach(item => array.push(item));      
    }
    for(let x=0;x<count;++x){
      b.forEach(item => array.push(item));      
    }
  }
  for(let xt=0;xt<count;++xt){
    for(let x=0;x<count;++x){
      b.forEach(item => array.push(item));      
    }
    for(let x=0;x<count;++x){
      a.forEach(item => array.push(item));      
    }
  }
 




    let data = new Uint8ClampedArray(array);

    let imageData = new ImageData(data, Math.sqrt(array.length/4), Math.sqrt(array.length/4));

    createImageBitmap(imageData).then((bitmap) => {

      this.pattern = graphics.createPattern(bitmap, "");
      this.render();


    }).catch((ex) => {

      //TODO: exception durumu handle edilmeli
    });
    return true;
  }


  public render(): void {
    
      if (this.createPattern(this.graphics))
        return;
    

    this.graphics.fillRect(new Rect(0, 0, this.width, this.height), this.pattern)

  }


  public dispose() {

  }
}
