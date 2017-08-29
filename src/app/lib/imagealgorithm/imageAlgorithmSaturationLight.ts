import { IImageAlgorithmMutable } from '../image';
import { IImageAlgorithmImmutable } from '../image';
import { HImage } from '../image';
import { ColorConversion } from './colorConversion';

interface triple{
    r:number;
    g:number;
    b:number;
}

/**
* creates a  filtered image
* https://www.pocketmagic.net/enhance-saturation-in-images-programatically/
*/
export class ImageAlgorithmSaturationLight implements IImageAlgorithmMutable {

    
 private  Pr = .299;
 private  Pg = .587;
 private Pb = .114;
    _value:number;
    private _isLight:boolean;
    constructor(value:number,isLight:boolean) {
        this._value=value;
        this._isLight=isLight;
       
        
    }
    process(img: HImage): HImage {
        
        let start;
        for(let i=0;i<img.Pixels.byteLength/4;++i){
            start=i*4;
               let temp=this._isLight?this.calculate4(img.Pixels[start+0],img.Pixels[start+1],img.Pixels[start+2]):this.calculate3(img.Pixels[start+0],img.Pixels[start+1],img.Pixels[start+2])
            img.Pixels[start+0] =temp.r;
            img.Pixels[start+1] =temp.g;
            img.Pixels[start+2] =temp.b;
           
        }
            
        return img;
    }

  

    private calculate2(r:number,g:number,b:number):triple{
        let hsl=ColorConversion.rgbToHsl(r,g,b);
        let rgb= ColorConversion.hslToRgb(hsl[0],hsl[1]*this._value,hsl[2]);
        return {r:rgb[0],g:rgb[1],b:rgb[2]};
    }

    private calculate3(r:number,g:number,b:number):triple{
        let hsl=ColorConversion.rgbToHsl(r,g,b);
        if (this._value >= 0) {
            // we don't want to saturate unsaturated colors -> we get only defects
            // for unsaturared colors this tends to 0
            let gray_factor = hsl[1] / 255.0; 
            // how far can we go?
            // if we increase saturation, we have "255-s" space left
            let var_interval = 255 - hsl[1]; 
            // compute the new saturation
            hsl[1] = hsl[1] + this._value * var_interval * gray_factor;
        } else {
            // how far can we go?
            // for decrease we have "s" left
            let var_interval = hsl[1]; 
            hsl[1] = hsl[1] + this._value * var_interval  ;
        }
        let rgb= ColorConversion.hslToRgb(hsl[0],hsl[1],hsl[2]);
        return {r:rgb[0],g:rgb[1],b:rgb[2]};
    }


    private calculate4(r:number,g:number,b:number):triple{
        let hsl=ColorConversion.rgbToHsl(r,g,b);
        if (this._value >= 0) {
            // we don't want to saturate unsaturated colors -> we get only defects
            // for unsaturared colors this tends to 0
            let gray_factor = hsl[2] / 255.0; 
            // how far can we go?
            // if we increase saturation, we have "255-s" space left
            let var_interval = 255 - hsl[2]; 
            // compute the new saturation
            hsl[2] = hsl[2] + this._value * var_interval * gray_factor;
        } else {
            // how far can we go?
            // for decrease we have "s" left
            let var_interval = hsl[2]; 
            hsl[2] = hsl[2] + this._value * var_interval  ;
        }
        let rgb= ColorConversion.hslToRgb(hsl[0],hsl[1],hsl[2]);
        return {r:rgb[0],g:rgb[1],b:rgb[2]};
    }

}