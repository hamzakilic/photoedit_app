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


export class ImageAlgorithmEdgeDetectionLaplace3x3 extends ImageAlgorithmEdgeDetectionLaplace {
    
    constructor(isGrayscale:boolean=true) {
        super(isGrayscale, "Laplace 3x3 "+(isGrayscale?"Gray":""), new ConvolutionMatrix(1, 0, [
            [-1, -1, -1],
            [-1, 8, -1],
            [-1, -1, -1],

        ]));
        

    }
   

}

export class ImageAlgorithmEdgeDetectionLaplace5x5_2 extends ImageAlgorithmEdgeDetectionLaplace {

    constructor(isGrayscale: boolean = true) {
        super(isGrayscale, "Laplace 5x5_2" + (isGrayscale ? " Gray" : ""), new ConvolutionMatrix(1/159, 0, [
         [ 2, 4, 5, 4, 2],  
         [ 4, 9, 12, 9, 4],  
         [ 5, 12, 15, 12, 5], 
         [ 4, 9, 12, 9, 4], 
         [ 2, 4, 5, 4, 2],
        ]));
        

    }


}


export class ImageAlgorithmEdgeDetectionLaplace5x5_3 extends ImageAlgorithmEdgeDetectionLaplace {

    constructor(isGrayscale: boolean = true) {
        super(isGrayscale, "Laplace 5x5_3" + (isGrayscale ? " Gray" : ""), new ConvolutionMatrix(1/256, 0, [
            [  1,   4,  6,  4,  1 ],  
            [  4,  16, 24, 16,  4 ],  
            [  6,  24, 36, 24,  6 ], 
            [  4,  16, 24, 16,  4 ], 
            [  1,   4,  6,  4,  1 ],
        ]));
        

    }


}

export class ImageAlgorithmEdgeDetectionLaplace5x5 extends ImageAlgorithmEdgeDetectionLaplace {

    constructor(isGrayscale: boolean = true) {
        super(isGrayscale, "Laplace 5x5 " + (isGrayscale ? "Gray" : ""), new ConvolutionMatrix(1, 0, [
            [-1, -1, -1, -1, -1],
            [-1, -1, -1, -1, -1],
            [-1, -1, 24, -1, -1],
            [-1, -1, -1, -1, -1],
            [-1, -1, -1, -1, -1]

        ]));
        this._isGrayscale = isGrayscale;

    }


}

export class ImageAlgorithmEdgeDetectionLaplaceGaussian extends ImageAlgorithmEdgeDetectionLaplace {

    constructor(isGrayscale: boolean = true) {
        super(isGrayscale, "Laplace Gaussian " + (isGrayscale ? "Gray" : ""), new ConvolutionMatrix(1, 0, [
          [  0,  0, -1,  0,  0 ],  
          [  0, -1, -2, -1,  0 ],  
          [ -1, -2, 16, -2, -1 ], 
          [  0, -1, -2, -1,  0 ], 
          [  0,  0, -1,  0,  0 ]

        ]));
        this._isGrayscale = isGrayscale;

    }


}