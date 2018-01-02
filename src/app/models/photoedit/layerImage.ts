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
    
    this.graphics.drawImageRect(this.img,new Rect(0,0,this.img.width,this.img.height),new Rect(0,0,this.width,this.height),Callback.from(()=>this.graphics.restore())); 
    //this.graphics.putImage2(this.img);
   
  }
  public dispose(){
    if(this.graphics)
    this.graphics.dispose();
  }



}
