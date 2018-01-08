import { ImageAlgorithmConvolution, ConvolutionMatrix } from './imageAlgorithmConvolution';

export class ImageAlgorithmConvolutionBlurGaussian5x5 extends ImageAlgorithmConvolution {
    /**
     *
     */
    constructor() {
        super("Blur Gaussian 5x5", new ConvolutionMatrix(1 / 159, 0, [
            [2, 4, 5, 4, 2],
            [4, 9, 12, 9, 4],
            [5, 12, 15, 12, 5],
            [4, 9, 12, 9, 4],
            [2, 4, 5, 4, 2],

        ]));

    }

}