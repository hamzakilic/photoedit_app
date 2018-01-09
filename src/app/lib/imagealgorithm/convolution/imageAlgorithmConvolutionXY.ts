import { ConvolutionMatrix } from './imageAlgorithmConvolution';

import { IImageAlgorithmImmutable, HImage } from './../../image';
import { } from '../../extensions';



export class ImageAlgorithmConvolutionXY implements IImageAlgorithmImmutable{
    private _convolutionX:ConvolutionMatrix;
    private _convolutionY:ConvolutionMatrix;
    private _name:string;
    private _isGrayscale:boolean;
    /**
     *
     */
    constructor(name:string,isGrayscale:boolean,convolutionX:ConvolutionMatrix,convolutionY:ConvolutionMatrix) {
       this._isGrayscale=isGrayscale;
        this._name=name+(isGrayscale?" Gray":"");
        this._convolutionX=convolutionX;
        this._convolutionY=convolutionY;
        
        
    }
    public get name(){return this._name};
    
    process(img: HImage): HImage {
        let preparedImage=this.prepareImage(img);
        let pixels=new Uint8ClampedArray(preparedImage.Pixels);
        let imgTemp=new HImage(preparedImage.width,preparedImage.height,pixels,preparedImage.bytePerPixel);
        let filterWidth=this._convolutionX.width;
        let filterHeight=this._convolutionX.height;
        let filterOffset=((filterWidth-1)/2).extToInt32();
        let calcOffset=0;

        let byteOffset=0;
        for(let offsetY=filterOffset;offsetY<preparedImage.height-filterOffset;++offsetY)
        for(let offsetX=filterOffset;offsetX<preparedImage.width-filterOffset;++offsetX){
            let blueX=0,greenX=0,redX=0;
            let blueY=0,greenY=0,redY=0;
            byteOffset=offsetY*preparedImage.width*preparedImage.bytePerPixel+offsetX*preparedImage.bytePerPixel;

            for(let filterY=-filterOffset;filterY<=filterOffset;++filterY)
            for(let filterX=-filterOffset;filterX<=filterOffset;++filterX){

                
                calcOffset=(offsetY+filterY)*preparedImage.width*preparedImage.bytePerPixel+(offsetX+filterX)*preparedImage.bytePerPixel;
                redX +=preparedImage.Pixels[calcOffset+0]*this._convolutionX.matrix[filterY+filterOffset][filterX+filterOffset]
                greenX +=preparedImage.Pixels[calcOffset+1]*this._convolutionX.matrix[filterY+filterOffset][filterX+filterOffset]
                blueX +=preparedImage.Pixels[calcOffset+2]*this._convolutionX.matrix[filterY+filterOffset][filterX+filterOffset]

                redY +=preparedImage.Pixels[calcOffset+0]*this._convolutionY.matrix[filterY+filterOffset][filterX+filterOffset]
                greenY +=preparedImage.Pixels[calcOffset+1]*this._convolutionY.matrix[filterY+filterOffset][filterX+filterOffset]
                blueY +=preparedImage.Pixels[calcOffset+2]*this._convolutionY.matrix[filterY+filterOffset][filterX+filterOffset]
            }
            let red=Math.sqrt(redX*redX+redY*redY);
            let green=Math.sqrt(greenX*greenX+greenY*greenY);
            let blue=Math.sqrt(blueX*blueX+blueY*blueY);

            if(blue>255) blue=255;
            if(blue<0) blue=0;
            if(green>255) green=255;
            if(green<0) green=0;
            if(red>255) red=255;
            if(red<0) red=0;
            imgTemp.Pixels[byteOffset+0]=red;
            imgTemp.Pixels[byteOffset+1]=green;
            imgTemp.Pixels[byteOffset+2]=blue;
        }

        return imgTemp;
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






