import { ImageAlgorithmConvolution, ConvolutionMatrix } from './imageAlgorithmConvolution';

export class ImageAlgorithmSharpenIntense extends ImageAlgorithmConvolution {
    /**
     *
     */
    constructor() {
        super("Sharpen Intense", new ConvolutionMatrix(1, 0, [
            [ 1,  1, 1, ],  
            [ 1, -7, 1, ],  
            [ 1,  1, 1, ], 
        ]));

    }

}