import { IImageAlgorithmMutable } from '../image';
import { IImageAlgorithmImmutable } from '../image';
import { HImage } from '../image';
import { Effect } from '../../entities/effect';

/**
* creates a Clarendon filtered image
*/
export class ImageAlgorithmEffect implements IImageAlgorithmMutable {

    private _effect: Effect;
    constructor(effect:Effect) {
        this._effect=effect;
        
    }
    process(img: HImage): HImage {
        
        let start;
        for(let i=0;i<img.Pixels.byteLength/4;++i){
            start=i*4;
            img.Pixels[start+0] =this._effect.r[img.Pixels[start+0]];
            img.Pixels[start+1] =this._effect.g[img.Pixels[start+1]];
            img.Pixels[start+2] =this._effect.b[img.Pixels[start+2]];
           
        }
            /* for(let x=0;x<img.width;++x){
                start=y*img.width*4+x*4;
                end=start+4;
               let array= img.Pixels.slice(start,end);
               array[0] *=0.16666;
               array[1] *=0.5;
               array[2] *=0.833333;
               img.Pixels.set(array,start);
            }
         */
        return img;
    }

}