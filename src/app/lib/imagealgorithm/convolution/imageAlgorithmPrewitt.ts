import { ConvolutionMatrix } from './imageAlgorithmConvolution';
import { ImageAlgorithmConvolutionXY } from './imageAlgorithmConvolutionXY';

export class ImageAlgorithmPrewitt extends ImageAlgorithmConvolutionXY{

    /**
     *
     */
    constructor(isGrayscale:boolean) {
        super("Prewitt",isGrayscale,new ConvolutionMatrix(1,1,[
            [ -1,  0,  1],  
            [ -1,  0,  1],  
            [ -1,  0,  1],
            
        ]),new ConvolutionMatrix(1,1,[
            [ 1,  1,  1],  
            [ 0,  0,  0],  
            [-1, -1, -1],

        ]));
        
    }
}