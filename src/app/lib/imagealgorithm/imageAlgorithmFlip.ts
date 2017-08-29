import { IImageAlgorithmMutable } from '../image';
import { IImageAlgorithmImmutable } from '../image';
import { HImage } from '../image';



/**
* creates a  filtered image
*/
export class ImageAlgorithmFlip implements IImageAlgorithmImmutable {
    
    _isHorizontal:boolean;
    constructor(isHorizontal:boolean) {
        this._isHorizontal=isHorizontal;
        
    }
    process(img: HImage): HImage {
        
        if(this._isHorizontal){
           return this.processHorizontal(img);
        }
       return this.processVertical(img);
    }

    private processHorizontal(img: HImage):HImage{
        let newImage=new HImage(img.width,img.height);
        
        for(let y=0;y<img.height;++y) 
            for(let x=0;x<img.width;++x)        
        {
            let start=y*img.width*4+x*4;
            let startN=y*img.width*4+(img.width-x-1)*4;
            
            newImage.Pixels[startN+0] =img.Pixels[start+0];
            newImage.Pixels[startN+1] =img.Pixels[start+1];
            newImage.Pixels[startN+2] =img.Pixels[start+2];
            newImage.Pixels[startN+3] =img.Pixels[start+3];
           
        }
            
        return newImage;
    }


    private processVertical(img:HImage):HImage{
        let newImage=new HImage(img.width,img.height);
        
        for(let y=0;y<img.height;++y)              
        {
            let start=(img.height-1- y)*img.width*4; ;
            let end=start+img.width*4;
            let startN=y*img.width*4 ;
            
            newImage.Pixels.set(img.Pixels.slice(start,end),startN);
           
           
        }
            
        return newImage;

    }
  
   

}