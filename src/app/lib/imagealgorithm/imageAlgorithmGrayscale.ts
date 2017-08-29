import { IImageAlgorithmMutable } from '../image';
import { IImageAlgorithmImmutable } from '../image';
import { HImage } from '../image';




/**
* creates a  grayscale image
*/
export class ImageAlgorithmGrayscale implements IImageAlgorithmMutable {
    
    private selectedFunc:any;
    constructor(version:number) {
       
       switch(version){
           case 1:
           this.selectedFunc=this.version1;break;
           case 2:
           this.selectedFunc=this.version2;break;
           default:
           this.selectedFunc=this.version1;break;


       } 
    }
    process(img: HImage): HImage {
        
      return this.selectedFunc(img);
     
    }

    private  common(img:HImage,func:any):HImage{
        let start;
        for(let i=0;i<img.Pixels.byteLength/4;++i){
            start=i*4;
            let val=func(img.Pixels[start+0],img.Pixels[start+1],img.Pixels[start+2]);
            img.Pixels[start+0] =val;
            img.Pixels[start+1] =val;
            img.Pixels[start+2] =val;
           
        }            
        return img;
    }

    
    private version1(img:HImage):HImage{
        return this.common(img,(r,g,b)=>{
        let temp=(r+g+b)/3
       return temp.extRound();
        });
    }

    private version2(img:HImage):HImage{
        return this.common(img,(r,g,b)=>{
        let temp=(r*0.3+g*0.59+b*0.11)
       return temp.extRound();
        });
    }

    private version3(img:HImage):HImage{
        return this.common(img,(r,g,b)=>{
        let temp=(r*0.2126+g*0.7152+b*0.0722)
       return temp.extRound();
        });
    }

    private version4(img:HImage):HImage{
        return this.common(img,(r,g,b)=>{
        let temp=(r*0.299+g*0.587+b*0.114)
       return temp.extRound();
        });
    }
    
    
    

   

}