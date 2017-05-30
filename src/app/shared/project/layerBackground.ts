import { Layer } from './layer';
import { Graphics } from '../../lib/graphics';

import { HImage  } from '../../lib/image';
import  { Rect } from '../../lib/draw/rect'

export class LayerBackground extends Layer{



  constructor(name?: string) {
    super(name);

  }
  public render(): void{

    console.log("rendering background layer");
    this.graphics.fillRect(new Rect(0,0,this.width,this.height),'#FFFFFF')
  }

  public dispose(){

  }
}
