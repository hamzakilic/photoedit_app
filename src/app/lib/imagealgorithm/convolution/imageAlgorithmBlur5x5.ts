import { ImageAlgorithmConvolution, ConvolutionMatrix } from './imageAlgorithmConvolution';

export class ImageAlgorithmBlur5x5 extends ImageAlgorithmConvolution {
    /**
     *
     */
    constructor() {
        super("Blur 5x5", new ConvolutionMatrix(1 / 13, 0, [
            [0, 0, 1, 0, 0],
            [0, 1, 1, 1, 0],
            [1, 1, 1, 1, 1],
            [0, 1, 1, 1, 0],
            [0, 0, 1, 0, 0]
        ]));

    }

}