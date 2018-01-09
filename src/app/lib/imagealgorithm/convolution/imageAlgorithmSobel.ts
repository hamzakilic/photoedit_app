import { ConvolutionMatrix } from './imageAlgorithmConvolution';
import { ImageAlgorithmConvolutionXY } from './imageAlgorithmConvolutionXY';

export class ImageAlgorithmSobel extends ImageAlgorithmConvolutionXY{

    /**
     *
     */
    constructor(isGrayscale:boolean) {
        super("Sobel",isGrayscale,new ConvolutionMatrix(1,1,[
            [ -1,  0,  1],  
         [ -2,  0,  2],  
         [ -1,  0,  1],
         

        ]),new ConvolutionMatrix(1,1,[
            [ 1,  2,  1],  
            [ 0,  0,  0],  
            [-1, -2, -1],

        ]));
        
    }
}