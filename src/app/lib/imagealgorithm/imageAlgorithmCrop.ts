import { IImageAlgorithmMutable } from '../image';
import { IImageAlgorithmImmutable } from '../image';
import { HImage } from '../image';
import { Rect } from '../draw/rect';

/**
 * crops a @see HImage with a @see Rect
*/
export class ImageAlgorithmCrop implements IImageAlgorithmImmutable {
    private rect: Rect;

    /**
     *@param rect source rectangle for crop
     */
    constructor(rect: Rect) {
        this.rect = rect;

    }
    process(img: HImage): HImage {
       
        let arr = new Uint8ClampedArray(this.rect.width * this.rect.height * 4);
        let pos = 0;
        for (let y = this.rect.y; y < this.rect.y + this.rect.height; ++y) {
            let start = y * img.width * 4 + this.rect.x * 4;
            let end = start + this.rect.width * 4;
            let row = img.Pixels.slice(start, end);
            arr.set(row, pos);
            pos += row.byteLength;
        }
        return new HImage(this.rect.width, this.rect.height, arr);
    }

    

}