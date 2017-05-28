import { Layer } from './layer';
import { Graphics } from '../../lib/graphics';

import { HImage  } from '../../lib/image';

export class LayerImage extends Layer{

  private img: HImage;

  constructor(img:HImage,name?: string) {
    super(name);
    this.img = img;
  }
  public render(): void{

  }
  public dispose(){

  }
}
