import { ConvolutionMatrix } from './imageAlgorithmConvolution';
import { ImageAlgorithmConvolutionXY } from './imageAlgorithmConvolutionXY';

export class ImageAlgorithmKrish extends ImageAlgorithmConvolutionXY{

    /**
     *
     */
    constructor(isGrayscale:boolean) {
        super("Krish",isGrayscale,new ConvolutionMatrix(1,1,[
             [ 5,  5,  5],  
             [-3,  0, -3],  
             [-3, -3, -3],

        ]),new ConvolutionMatrix(1,1,[
            [ 5, -3, -3],  
            [ 5,  0, -3],  
            [ 5, -3, -3],

        ]));
        
    }
}