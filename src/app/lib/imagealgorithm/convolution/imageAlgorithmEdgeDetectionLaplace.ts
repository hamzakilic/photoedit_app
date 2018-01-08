import { HImage } from './../../image';
import { ImageAlgorithmConvolution, ConvolutionMatrix } from './imageAlgorithmConvolution';

export class ImageAlgorithmEdgeDetectionLaplace extends ImageAlgorithmConvolution {
    protected _isGrayscale:boolean;
    constructor(isGrayscale:boolean=true,name:string,matrix:ConvolutionMatrix) {
        super(name,matrix);
        this._isGrayscale=isGrayscale;

    }
    protected prepareImage(img: HImage): HImage {
        if(this._isGrayscale)
        return this.grayscale(img);
        return img;
    }
    protected grayscale(img:HImage):HImage{
        let grayscale=new HImage(img.width,img.height);
        let start;
        for(let i=0;i<img.Pixels.byteLength/4;++i){
            start=i*4;
            let val=img.Pixels[start+0]*0.11+img.Pixels[start+1]*0.59+img.Pixels[start+2]*0.3;
            grayscale.Pixels[start+0] =val;
            grayscale.Pixels[start+1] =val;
            grayscale.Pixels[start+2] =val;
            grayscale.Pixels[start+3]=img.Pixels[start+3];
           
        }            
        return grayscale;

    }

}