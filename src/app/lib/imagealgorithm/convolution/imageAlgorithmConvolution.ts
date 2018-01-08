
import { IImageAlgorithmImmutable, HImage } from './../../image';
import { } from '../../extensions';

export class ConvolutionMatrix{
        private _factor:number;
        private _bias:number;
        private _matrix:number[][];
        private _width:number;
        private _height:number;
        /**
         *
         */
        constructor(factor:number,bias:number,matrix:number[][]) {            
            this._factor=factor;
            this._bias=bias;
            this._matrix=matrix;
            this._height=matrix.length;
            this._width=matrix[0].length;
            
        }
        get factor():number{return this._factor;}
        get bias():number{return this._bias;}
        get width():number{return this._width};
        get height():number{return this._height}
        get matrix():number[][]{return this._matrix};

        

}

export class ImageAlgorithmConvolution implements IImageAlgorithmImmutable{
    protected convolution:ConvolutionMatrix;
    private _name:string;
    /**
     *
     */
    constructor(name:string,convolution:ConvolutionMatrix) {
        this.convolution=convolution;
        this._name=name;
        
    }
    public get name(){return this._name};
    
    process(img: HImage): HImage {
        let pixels=new Uint8ClampedArray(img.Pixels);
        let imgTemp=new HImage(img.width,img.height,pixels,img.bytePerPixel);
        let filterWidth=this.convolution.width;
        let filterHeight=this.convolution.height;
        let filterOffset=((filterWidth-1)/2).extToInt32();
        let calcOffset=0;

        let byteOffset=0;
        for(let offsetY=filterOffset;offsetY<img.height-filterOffset;++offsetY)
        for(let offsetX=filterOffset;offsetX<img.width-filterOffset;++offsetX){
            let blue=0,green=0,red=0;
            byteOffset=offsetY*img.width*img.bytePerPixel+offsetX*img.bytePerPixel;

            for(let filterY=-filterOffset;filterY<=filterOffset;++filterY)
            for(let filterX=-filterOffset;filterX<=filterOffset;++filterX){

                //calcOffset=byteOffset+(filterX*img.bytePerPixel)+(filterY*img.width*img.bytePerPixel);
                calcOffset=(offsetY+filterY)*img.width*img.bytePerPixel+(offsetX+filterX)*img.bytePerPixel;
                red +=img.Pixels[calcOffset+0]*this.convolution.matrix[filterY+filterOffset][filterX+filterOffset]
                green +=img.Pixels[calcOffset+1]*this.convolution.matrix[filterY+filterOffset][filterX+filterOffset]
                blue +=img.Pixels[calcOffset+2]*this.convolution.matrix[filterY+filterOffset][filterX+filterOffset]
            }
            red=this.convolution.factor*red+this.convolution.bias;
            green=this.convolution.factor*green+this.convolution.bias;
            blue=this.convolution.factor*blue+this.convolution.bias;

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
    
}