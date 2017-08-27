import { IImageAlgorithmMutable } from '../image';
import { IImageAlgorithmImmutable } from '../image';
import { HImage } from '../image';
import { ImageColorMath,ImageColorMathBrightness } from './imageColorMath';


/**
* creates a  filtered image
*/
export class ImageAlgorithmBrightness implements IImageAlgorithmMutable {
    
    _brightness:ImageColorMath;
    constructor(value:number) {
        this._brightness=new ImageColorMathBrightness(value);
        
    }
    process(img: HImage): HImage {
        
        let start;
        for(let i=0;i<img.Pixels.byteLength/4;++i){
            start=i*4;

            img.Pixels[start+0] =this._brightness.calc(img.Pixels[start+0]);
            img.Pixels[start+1] =this._brightness.calc(img.Pixels[start+1]);
            img.Pixels[start+2] =this._brightness.calc(img.Pixels[start+2]);
           
        }
            
        return img;
    }

   

}