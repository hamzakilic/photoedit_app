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
    this.graphics.setGlobalAlpha(this.globalAlpha);
    
    this.graphics.drawHtmlImageRect(this.img, new Rect(0,0,this.img.naturalWidth,this.img.naturalHeight), new Rect(0, 0, this.width, this.height));

    this.graphics.restore();
  }

  

  public dispose() {

  }
}
