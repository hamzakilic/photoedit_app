import { IImageAlgorithmMutable } from '../image';
import { IImageAlgorithmImmutable } from '../image';
import { HImage } from '../image';



/**
* creates a  filtered image
*/
export class ImageAlgorithmBrightness implements IImageAlgorithmMutable {
    
    _brightness:number;
    constructor(value:number) {
        this._brightness=value;
        
    }
    process(img: HImage): HImage {
        
        let start;
        for(let i=0;i<img.Pixels.byteLength/4;++i){
            start=i*4;

            img.Pixels[start+0] =this.calc(img.Pixels[start+0]);
            img.Pixels[start+1] =this.calc(img.Pixels[start+1]);
            img.Pixels[start+2] =this.calc(img.Pixels[start+2]);
           
        }
            
        return img;
    }
    private calc(val:number):number{
        let temp=val+this._brightness;
        if(temp<0)return 0;
        if(temp>255) return 255;
        return temp;
    }

   

}