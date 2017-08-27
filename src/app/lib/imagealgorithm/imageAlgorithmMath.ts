import { IImageAlgorithmMutable } from '../image';
import { IImageAlgorithmImmutable } from '../image';
import { HImage } from '../image';
import { ImageColorMath } from './imageColorMath';


/**
* creates a  filtered image
*/
export class ImageAlgorithmMath implements IImageAlgorithmMutable {
    
    _maths:Array<ImageColorMath>;
    constructor(maths:Array<ImageColorMath>) {
        this._maths=maths;
        
    }
    process(img: HImage): HImage {
        
        let start;
        for(let i=0;i<img.Pixels.byteLength/4;++i){
            start=i*4;
            
            for(let m=0;m<this._maths.length;++m){
            img.Pixels[start+0] =this._maths[m].calc(img.Pixels[start+0]);
            img.Pixels[start+1] =this._maths[m].calc(img.Pixels[start+1]);
            img.Pixels[start+2] =this._maths[m].calc(img.Pixels[start+2]);
            }
           
        }
            
        return img;
    }

   

}