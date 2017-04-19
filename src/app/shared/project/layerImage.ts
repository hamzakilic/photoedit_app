import { layer } from './layer';
import { graphics } from '../../lib/graphics';

import { image as iskilip_image } from 'iskilip/img/image';

export class layerImage extends layer{

  private img: iskilip_image;

  constructor(img:iskilip_image,name?: string) {
    super(name);
    this.img = img;
  }
  public render(grp: graphics){
      alert('rendered image');
  }
}
