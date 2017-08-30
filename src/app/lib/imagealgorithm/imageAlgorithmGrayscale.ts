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
           case 3:
           this.selectedFunc=this.version3;break;
           case 4:
           this.selectedFunc=this.version4;break;
           case 5:
           this.selectedFunc=this.version5;break;
           case 6:
           this.selectedFunc=this.version6;break;
           case 7:
           this.selectedFunc=this.version7;break;
           case 8:
           this.selectedFunc=this.version8;break;
           case 9:
           this.selectedFunc=this.version9;break;
           case 10:
           this.selectedFunc=this.version10;break;
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

    private version5(img:HImage):HImage{
        return this.common(img,(r,g,b)=>{
        let temp=(Math.max(r,g,b));
       return temp.extRound();
        });
    }

    private version6(img:HImage):HImage{
        return this.common(img,(r,g,b)=>{
        let temp=(Math.min(r,g,b));
       return temp.extRound();
        });
    }

    private version7(img:HImage):HImage{
        return this.common(img,(r,g,b)=>{
        let temp=r;
       return temp;
        });
    }
    private version8(img:HImage):HImage{
        return this.common(img,(r,g,b)=>{
        let temp=g;
       return temp;
        });
    }
    private version9(img:HImage):HImage{
        return this.common(img,(r,g,b)=>{
        let temp=b;
       return temp;
        });
    }
    private version10(img:HImage):HImage{
        return this.common(img,(r,g,b)=>{
            let ConversionFactor = 255 / (16 - 1)
            let AverageValue = (r + g + b) / 3
            let Gray = (((AverageValue / ConversionFactor) + 0.5) * ConversionFactor).extRound()
        let temp=Gray;
       return temp;
        });
    } 
    
    
    

   

}