import { ImageAlgorithmConvolution, ConvolutionMatrix } from './imageAlgorithmConvolution';

export class ImageAlgorithmSharpen3x3 extends ImageAlgorithmConvolution {
    /**
     *
     */
    constructor() {
        super("Sharpen 3x3", new ConvolutionMatrix(1, 0, [
            [0, -1, 0],
            [-1, 5, -1],
            [0, -1, 0],
        ]));

    }

}