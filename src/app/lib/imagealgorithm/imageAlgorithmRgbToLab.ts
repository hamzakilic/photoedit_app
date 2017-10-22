import { ColorConversion } from './colorConversion';
import { IImageAlgorithmMutable } from '../image';
import { IImageAlgorithmImmutable } from '../image';
import { HImage } from '../image';



/**
* convert an image RGB color space to CIELab
*/
export class ImageAlgorithmRgbToLab implements IImageAlgorithmImmutable {
    
    
    constructor() {
        
        
    }
    process(img: HImage): HImage {
        let arr = new Uint8ClampedArray(img.width * img.height * 3);
       
        let temp=new HImage(img.width, img.height, arr);
        let start;
        let tempindex=0;
        for(let i=0;i<img.Pixels.byteLength/4;++i){
            start=i*4;
            tempindex=i*3;
            let res=this.calc(img.Pixels[start+0],img.Pixels[start+1],img.Pixels[start+2])
            temp.Pixels[tempindex+0] =res[0];
            temp.Pixels[tempindex+1] =res[1];
            temp.Pixels[tempindex+2] =res[2];
            
           
        }
            
        return temp;
    }
    private calc(r,g,b):number[]{
        let res= ColorConversion.rgbToXYZ(r,g,b);
        return ColorConversion.XYZToCIE_Lab(res[0],res[1],res[2]);
    }

   

}