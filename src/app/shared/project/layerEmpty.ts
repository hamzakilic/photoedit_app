import { Layer } from './layer';
import { Graphics } from '../../lib/graphics';

import { HImage  } from '../../lib/image';

export class LayerEmpty extends Layer{



  constructor(name?: string,width?: number, height?: number) {
    super(name);

    if(width){

    this.width = width;
    this.stwidth=this.width;
    }
    if(height){
    this.height =height;
    this.stheight=this.height;
    }

  }
  public render(): void{

  }
  public dispose(){

  }
}
