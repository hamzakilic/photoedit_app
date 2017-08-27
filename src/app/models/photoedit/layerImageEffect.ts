import { LayerImage } from './layerImage';
import { Graphics } from '../../lib/graphics';

import { HImage  } from '../../lib/image';
import { Rect} from '../../lib/draw/rect';
import { ImageAlgorithmClone} from '../../lib/imagealgorithm/imageAlgorithmClone';

export class LayerImageEffect extends LayerImage{

 
  private _orgImage:HImage;

  constructor(img:HImage,name?: string) {
    super(img,name);

    this.sourceMask=new Rect(0,0,img.width,img.height);
    this.width = img.width;
    this.height = img.height;
    this.canRotate = true;
  /*   let cloner= new ImageAlgorithmClone();
    this._orgImage=cloner.process(img); */
 
   
    
  }

  public dispose(){

  }
  public setImg(img:HImage){
    this.img=img;
    this.sourceMask=new Rect(0,0,img.width,img.height);
    this.width=img.width;
    this.height=img.height;
    this.render();
  }
  public setOrgImage(img:HImage){
   
    this._orgImage=img;
  }
  public getOriginalImage():HImage{
   
    let cloner= new ImageAlgorithmClone();
    let cloned=cloner.process(this._orgImage);
    return cloned;
  }
}
