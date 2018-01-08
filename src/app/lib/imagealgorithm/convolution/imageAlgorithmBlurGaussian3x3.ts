import { ImageAlgorithmConvolution, ConvolutionMatrix } from './imageAlgorithmConvolution';

export class ImageAlgorithmBlurGaussian3x3 extends ImageAlgorithmConvolution {
    /**
     *
     */
    constructor() {
        super("Blur Gaussian 3x3", new ConvolutionMatrix(1 / 16, 0, [
            [1, 2, 1],
            [2, 4, 2],
            [1, 2, 1]
        ]));

    }

}