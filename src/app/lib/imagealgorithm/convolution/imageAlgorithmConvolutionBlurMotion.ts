import { ImageAlgorithmConvolution, ConvolutionMatrix } from './imageAlgorithmConvolution';

export class ImageAlgorithmConvolutionBlurMotion extends ImageAlgorithmConvolution {
    /**
     *
     */
    constructor() {
        super("Blur Motion", new ConvolutionMatrix(1 / 18, 0, [
           [ 1, 0, 0, 0, 0, 0, 0, 0, 1], 
           [ 0, 1, 0, 0, 0, 0, 0, 1, 0],
           [ 0, 0, 1, 0, 0, 0, 1, 0, 0],
           [ 0, 0, 0, 1, 0, 1, 0, 0, 0],
           [ 0, 0, 0, 0, 1, 0, 0, 0, 0], 
           [ 0, 0, 0, 1, 0, 1, 0, 0, 0],
           [ 0, 0, 1, 0, 0, 0, 1, 0, 0],
           [ 0, 1, 0, 0, 0, 0, 0, 1, 0],
           [ 1, 0, 0, 0, 0, 0, 0, 0, 1],

        ]));

    }

}