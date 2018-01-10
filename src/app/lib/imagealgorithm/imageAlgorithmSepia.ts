import { IImageAlgorithmMutable } from '../image';
import { IImageAlgorithmImmutable } from '../image';
import { HImage } from '../image';
import { } from '../extensions';

/**
* creates a  filtered image
*/
export class ImageAlgorithmSepia implements IImageAlgorithmImmutable {

   private _name:string;
  
   constructor(name:string=undefined) {
       this._name=name;
       
   }
   public get name():string{
       return this._name;
   }
    process(img: HImage): HImage {
        let temp=new HImage(img.width,img.height,new Uint8ClampedArray(img.Pixels),img.bytePerPixel);
        let start;
        for(let i=0;i<img.Pixels.byteLength/4;++i){
            start=i*4;
            let red=img.Pixels[start];
            let green=img.Pixels[start+1];
            let blue=img.Pixels[start+2];

            temp.Pixels[start+0] =(0.393*red+0.769*green+0.189*blue).extToInt32();
            temp.Pixels[start+1] = (0.349*red+0.686*green+0.168*blue).extToInt32();
            temp.Pixels[start+2] = (0.272*red+0.534*green+0.131*blue).extToInt32();
           
        }
            
        return temp;
    }

  

}