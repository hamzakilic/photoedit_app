import { Layer } from './layer';
import { Graphics } from '../../lib/graphics';

import { HImage } from '../../lib/image';
import { Rect } from '../../lib/draw/rect';
import { HMath } from '../../lib/hMath';
import { LayerImage } from './layerImage';

export class LayerHtmlImage extends Layer {

  private img: HTMLImageElement;

  constructor(img: HTMLImageElement, name?: string) {
    super(name);
    this.sourceMask = new Rect(0, 0, img.width, img.height);
    this.width = img.width;
    this.height = img.height;
    this.canRotate = true;
    this.img = img;
  }

  
  public createInstanceForClone(){
    if(this.graphics)
    return new LayerImage(this.getImage(),this.name);
    return new LayerHtmlImage(this.img.cloneNode() as HTMLImageElement,this.name);
  }
  public render(): void {


    this.graphics.save();
    this.graphics.clearRect(new Rect(0, 0, this.width, this.height));
    //this.graphics.setGlobalAlpha(this.globalAlpha);
    
    if (!this.scaleView) {

      this.graphics.drawHtmlImageRect(this.img, this.sourceMask, new Rect(0, 0, this.sourceMask.width > this.width ? this.width : this.sourceMask.width, this.sourceMask.height > this.height ? this.height : this.sourceMask.height));
    }
    else this.graphics.drawHtmlImageRect(this.img, this.sourceMask, new Rect(0, 0, this.width, this.height));

    this.graphics.restore();
  }

  

  public dispose() {

  }
}
