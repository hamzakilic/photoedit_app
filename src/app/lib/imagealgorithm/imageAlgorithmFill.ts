import { IImageAlgorithmMutable } from '../image';
import { IImageAlgorithmImmutable } from '../image';
import { HImage } from '../image';
import { Color } from '../draw/color';


/**
*  fills an image with a number or a color
*/
export class ImageAlgorithmFill implements IImageAlgorithmMutable {
    private fillValue:number;
    private fillColor:Color;
    /**
     * @param fillValue if value is defined then fills with  value
     * @param fillColor if color is defined then fills with color
     */
     constructor(fillValue?:number,fillColor?:Color) {
        this.fillValue = fillValue;
        this.fillColor =fillColor;
         
     }
    process(img: HImage): HImage {
        if(this.fillValue)
         img.Pixels.fill(this.fillValue);
        else if(this.fillColor){
        
             let array= [this.fillColor.r,this.fillColor.g,this.fillColor.b,this.fillColor.a];
        for(let y=0;y<img.height;++y)
            for(let x=0;x<img.width;++x){
                img.Pixels.set(array,y*img.width*4+x*4);
            }
        }

         return img;
    }

}