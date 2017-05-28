import { Layer } from './layer';
import { Graphics } from '../../lib/graphics';

import { HImage  } from '../../lib/image';

export class LayerHtmlImage extends Layer{

  private img: HTMLImageElement;

  constructor(img:HTMLImageElement,name?: string) {
    super(name);

    this.width=img.width;
    this.height = img.height;
    this.stwidth = img.width;
    this.stheight = img.height;
    this.img = img;


  }
  public render(): void{

    this.graphics.drawHtmlImage(this.img,0,0);
  }
  public dispose(){

  }
}
