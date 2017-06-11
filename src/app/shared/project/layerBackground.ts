import { Layer } from './layer';
import { Graphics } from '../../lib/graphics';

import { HImage  } from '../../lib/image';
import  { Rect } from '../../lib/draw/rect'

export class LayerBackground extends Layer{



  constructor(name?: string) {
    super(name);

  }
  public render(): void{


    this.graphics.fillRect(new Rect(0,0,this.width,this.height),'#FFFFFF')
    for(let i=0;i<this.width;i+=25)
      this.graphics.drawLine(i,0,i,this.height,1,'#000000');
    for(let i=0;i<this.height;i+=25)
    this.graphics.drawLine(0,i,this.width,i,1,'#000000');
  }

  public dispose(){

  }
}
