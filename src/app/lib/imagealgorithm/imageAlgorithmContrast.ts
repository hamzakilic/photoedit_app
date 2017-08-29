import { IImageAlgorithmMutable } from '../image';
import { IImageAlgorithmImmutable } from '../image';
import { HImage } from '../image';


/**
* creates a  filtered image
*/
export class ImageAlgorithmContrast implements IImageAlgorithmMutable {

    private _contrast:number;
    private _factor:number;
    constructor(contrast:number) {
        this._contrast=contrast;
        this._factor = (259 * (this._contrast + 255)) / (255 * (259 - this._contrast))
        
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
        let temp=this._factor * (val   - 128) + 128
        if(temp<0)return 0;
        if(temp>255) return 255;
        return temp;
    }

    

}