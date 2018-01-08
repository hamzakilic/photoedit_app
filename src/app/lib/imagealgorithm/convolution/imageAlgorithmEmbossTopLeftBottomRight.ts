import { ImageAlgorithmConvolution, ConvolutionMatrix } from './imageAlgorithmConvolution';

export class ImageAlgorithmEmbossTopLeftBottomRight extends ImageAlgorithmConvolution {
    /**
     *
     */
    constructor() {
        super("TopLeft BottomRight", new ConvolutionMatrix(1 , 128, [
            [-1, 0,  0],  
            [0,  0,  0],  
            [ 0,  0,  1],

        ]));

    }

}