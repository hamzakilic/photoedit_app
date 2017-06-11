import { Layer } from './layer';
import { Graphics } from '../../lib/graphics';

import { HImage } from '../../lib/image';
import { Rect } from '../../lib/draw/rect';

export class LayerHtmlImage extends Layer {

  private img: HTMLImageElement;

  constructor(img: HTMLImageElement, name?: string) {
    super(name);

    this.width = img.width;
    this.height = img.height;

    this.img = img;


  }
  public render(): void {
    this.graphics.clearRect(new Rect(0, 0, this.width, this.height))
    this.graphics.save();
    if (this.rotateAngleDeg != 0) {
      let tx = this.width * this.scale / 2;
      let ty = this.height * this.scale / 2;
      this.graphics.translate(tx,ty);
      console.log(this.rotateAngleDeg);
      this.graphics.rotate(this.rotateAngleDeg);
      this.graphics.fillRect(new Rect(this.width * this.scale / 2 - 10, this.height * this.scale / 2 - 10, 20, 20), "#FFFFFF");
      this.graphics.translate(-tx,-ty);

      this.graphics.drawHtmlImageRect(this.img,new Rect((this.width-this.img.naturalWidth)/2,(this.height-this.img.naturalHeight)/2,this.img.naturalWidth,this.img.naturalHeight));
    }
    else
    this.graphics.drawHtmlImageFit(this.img, 0, 0);
    this.graphics.restore();
  }




  public dispose() {

  }
}
