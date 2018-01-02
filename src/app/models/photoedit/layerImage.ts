import { ImageAlgorithmClone } from './../../lib/imagealgorithm/imageAlgorithmClone';
import { Callback } from './../../lib/callback';
import { Layer } from './layer';
import { Graphics } from '../../lib/graphics';

import { HImage  } from '../../lib/image';
import { Rect} from '../../lib/draw/rect';

export class LayerImage extends Layer{

  protected img: HImage;

  constructor(img:HImage,name?: string,uuid?:string) {
    super(name);

    this.sourceMask=new Rect(0,0,img.width,img.height);
    this.width = img.width;
    this.height = img.height;
    this.canRotate = true;

    this.img = img;
    if(uuid)
    this.setuuid(uuid);
    
  }

  /**
   * for testing purpose
   */
  public get hImage():HImage{
    return this.img;
  }
  
  public createInstanceForClone(){
    if(this.graphics){
      return new LayerImage(this.graphics.getImage(),this.name);
    }
    let cloner=new ImageAlgorithmClone();
    let clonedImg= cloner.process(this.img);
    return new LayerImage(clonedImg,this.name);
  }
  public render(): void{   
    
    this.graphics.save();
   
    this.graphics.clearRect(new Rect(0,0,this.width,this.height));
    
    if(!this.scaleView){

      this.graphics.drawImageRect(this.img,this.sourceMask,new Rect(0,0,this.sourceMask.width>this.width?this.width:this.sourceMask.width,this.sourceMask.height>this.height?this.height:this.sourceMask.height),new Callback(()=>this.graphics.restore()));
    }
    else this.graphics.drawImageRect(this.img,this.sourceMask,new Rect(0,0,this.width,this.height),new Callback(()=>this.graphics.restore())); 
    //this.graphics.putImage2(this.img);
   
  }
  public dispose(){
    if(this.graphics)
    this.graphics.dispose();
  }



}
