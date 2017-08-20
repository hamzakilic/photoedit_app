import { IImageAlgorithmMutable } from '../image';
import { IImageAlgorithmImmutable } from '../image';
import { HImage } from '../image';


/**
* creates a 1977 filtered image
*/
export class ImageAlgorithm1977 implements IImageAlgorithmMutable {
    process(img: HImage): HImage {
        
        let start,end;
        for(let i=0;i<img.Pixels.byteLength/4;++i){
            start=i*4;
            img.Pixels[start+0] *=0.16666;
            img.Pixels[start+1] *=0.5;
            img.Pixels[start+2] *=0.833333;
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