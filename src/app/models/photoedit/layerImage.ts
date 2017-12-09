import { Callback } from './../../lib/callback';
import { Layer } from './layer';
import { Graphics } from '../../lib/graphics';

import { HImage  } from '../../lib/image';
import { Rect} from '../../lib/draw/rect';

export class LayerImage extends Layer{

  protected img: HImage;

  constructor(img:HImage,name?: string) {
    super(name);

    this.sourceMask=new Rect(0,0,img.width,img.height);
    this.width = img.width;
    this.height = img.height;
    this.canRotate = true;

    this.img = img;
    
  }
  public render(): void{
    
    
    this.graphics.save();
   // this.graphics.setGlobalAlpha(this.globalAlpha);
    this.graphics.clearRect(new Rect(0,0,this.width,this.height));
   
    if(!this.scaleView){

      this.graphics.drawImageRect(this.img,this.sourceMask,new Rect(0,0,this.sourceMask.width>this.width?this.width:this.sourceMask.width,this.sourceMask.height>this.height?this.height:this.sourceMask.height),new Callback(()=>this.graphics.restore()));
    }
    else this.graphics.drawImageRect(this.img,this.sourceMask,new Rect(0,0,this.width,this.height),new Callback(()=>this.graphics.restore()));
   // this.graphics.restore();
    //this.graphics.fillRect(new Rect(0,0,this.width,this.height),"#FFFFFF")
  }
  public dispose(){

  }

}
