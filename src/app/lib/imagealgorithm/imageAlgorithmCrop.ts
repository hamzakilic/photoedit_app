import { RectInt } from './../draw/rectInt';
import { IImageAlgorithmMutable } from '../image';
import { IImageAlgorithmImmutable } from '../image';
import { HImage } from '../image';
import { Rect } from '../draw/rect';

/**
 * crops a @see HImage with a @see Rect
*/
export class ImageAlgorithmCrop implements IImageAlgorithmImmutable {
    private rect: RectInt;

    /**
     *@param rect source rectangle for crop
     */
    constructor(rect: Rect) {
        this.rect = new RectInt(rect.x,rect.y,rect.width,rect.height);
        if(this.rect.x<0)
          {
              this.rect.width+=this.rect.x;
              this.rect.x=0;
          }
          if(this.rect.y<0)
          {
              this.rect.height+=this.rect.y;
              this.rect.y=0;
          }

    }
    process(img: HImage): HImage {
       
        let arr = new Uint8ClampedArray(this.rect.width * this.rect.height * img.bytePerPixel);
        let pos = 0;
        for (let y = this.rect.y; y < this.rect.y + this.rect.height; ++y) {
            let start = y * img.width * img.bytePerPixel + this.rect.x * img.bytePerPixel;
            let end = start + this.rect.width * img.bytePerPixel;
            let row = img.Pixels.slice(start, end);
            arr.set(row, pos);
            pos += row.byteLength;
        }
        return new HImage(this.rect.width, this.rect.height, arr);
    }

    

}