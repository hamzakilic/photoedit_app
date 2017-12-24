import { Layer } from './layer';
import { Graphics } from '../../lib/graphics';

import { HImage } from '../../lib/image';

export class LayerEmpty extends Layer {



  constructor(name?: string, width?: number, height?: number) {
    super(name);

    if (width)
      this.width = width;

    if (height)
      this.height = height;
    this.canRotate = false;


  }
  public createInstanceForClone(){
    return new LayerEmpty(this.name,this.width,this.height);
  }
  public render(): void {

  }
  public dispose() {

  }

  
}
