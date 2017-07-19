import { Layer } from './layer';
import { Graphics } from '../../lib/graphics';

import { HImage  } from '../../lib/image';
import { Rect} from '../../lib/draw/rect';

export class LayerImage extends Layer{

  private img: HImage;

  constructor(img:HImage,name?: string) {
    super(name);

    this.sourceMask=new Rect(0,0,img.width,img.height);
    this.width = img.width;
    this.height = img.height;
    this.canRotate = true;

    this.img = img;
  }
  public render(): void{

    this.graphics.drawImage(this.img);
    //this.graphics.fillRect(new Rect(0,0,this.width,this.height),"#FFFFFF")
  }
  public dispose(){

  }
}
