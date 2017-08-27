import { IImageAlgorithmMutable } from '../image';
import { IImageAlgorithmImmutable } from '../image';
import { HImage } from '../image';


/**
* creates a  filtered image
*/
export class ImageAlgorithmGamma implements IImageAlgorithmMutable {

    _gamma:number;
    _gammaCorrection:number;
    constructor(value:number) {
        this._gamma=value;
        this._gammaCorrection=1/this._gamma
        
    }
    process(img: HImage): HImage {
        
        let start;
        for(let i=0;i<img.Pixels.byteLength/4;++i){
            start=i*4;

            img.Pixels[start+0] =this.calculate(img.Pixels[start+0]);
            img.Pixels[start+1] =this.calculate(img.Pixels[start+1]);
            img.Pixels[start+2] =this.calculate(img.Pixels[start+2]);
           
        }
            
        return img;
    }

    private calculate(val:number):number{

        
        let temp=255 * (val/ 255) ^ this._gammaCorrection;
        if(temp<0)return 0;
        if(temp>255) return 255;
        return temp.extRound();

    }

}