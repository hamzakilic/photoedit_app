import { ImageAlgorithmConvolution, ConvolutionMatrix } from './imageAlgorithmConvolution';

export class ImageAlgorithmMean3x3 extends ImageAlgorithmConvolution {
    /**
     *
     */
    constructor() {
        super("Mean 3x3", new ConvolutionMatrix(1, 0, [
            [1, 1, 1],
            [1, 1, 1],
            [1, 1, 1],
        ]));

    }

}

export class ImageAlgorithmMean5x5 extends ImageAlgorithmConvolution {
    /**
     *
     */
    constructor() {
        super("Mean 5x5", new ConvolutionMatrix(1, 0, [
           [1,1,1,1,1],
           [1,1,1,1,1],
           [1,1,1,1,1],
           [1,1,1,1,1],
           [1,1,1,1,1],
        ]));

    }

}
