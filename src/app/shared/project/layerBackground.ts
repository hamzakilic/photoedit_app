import { Layer } from './layer';
import { Graphics } from '../../lib/graphics';

import { HImage  } from '../../lib/image';
import  { Rect } from '../../lib/draw/rect'

export class LayerBackground extends Layer{



  constructor(name?: string) {
    super(name);
    this.canRotate = false;

  }
  public render(): void{


    this.graphics.fillRect(new Rect(0,0,this.width,this.height),'#FFFFFF')
    for(let i=0;i<this.width;i+=5*this.scale)
      this.graphics.drawLine(i,0,i,this.height,0.7*this.scale,'#000000');
    for(let i=0;i<this.height;i+=5*this.scale)
    this.graphics.drawLine(0,i,this.width,i,0.7*this.scale,'#000000');
  }

  public dispose(){

  }
}
