import { IImageAlgorithmMutable } from '../image';
import { IImageAlgorithmImmutable } from '../image';
import { HImage } from '../image';


/**
* creates a deep copy image
*/
export class ImageAlgorithmClone implements IImageAlgorithmImmutable {
    process(img: HImage): HImage {
        let arr = new Uint8ClampedArray(img.width * img.height * 4);
        arr.set(img.Pixels);
        return new HImage(img.width, img.height, arr);
    }

}