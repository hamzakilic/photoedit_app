import { ImageAlgorithmConvolution, ConvolutionMatrix } from './imageAlgorithmConvolution';

export class ImageAlgorithmConvolutionBlurMotionLeftToRight extends ImageAlgorithmConvolution {
    /**
     *
     */
    constructor() {
        super("Blur Motion Left To Right", new ConvolutionMatrix(1 / 9, 0, [
            [ 1, 0, 0, 0, 0, 0, 0, 0, 0], 
            [ 0, 1, 0, 0, 0, 0, 0, 0, 0],
            [ 0, 0, 1, 0, 0, 0, 0, 0, 0],
            [ 0, 0, 0, 1, 0, 0, 0, 0, 0],
            [ 0, 0, 0, 0, 1, 0, 0, 0, 0], 
            [ 0, 0, 0, 0, 0, 1, 0, 0, 0],
            [ 0, 0, 0, 0, 0, 0, 1, 0, 0],
            [ 0, 0, 0, 0, 0, 0, 0, 1, 0],
            [ 0, 0, 0, 0, 0, 0, 0, 0, 1],

        ]));

    }

}