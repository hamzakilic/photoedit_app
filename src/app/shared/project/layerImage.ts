import { Layer } from './layer';
import { Graphics } from '../../lib/graphics';

import { Image  } from '../../lib/image';

export class LayerImage extends Layer{

  private img: Image;

  constructor(img:Image,name?: string) {
    super(name);
    this.img = img;
  }
  public render(grp: Graphics): void{

  }
  public dispose(){

  }
}
