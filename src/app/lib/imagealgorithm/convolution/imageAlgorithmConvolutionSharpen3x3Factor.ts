import { ImageAlgorithmConvolution, ConvolutionMatrix } from './imageAlgorithmConvolution';

export class ImageAlgorithmConvolutionSharpen3x3Factor extends ImageAlgorithmConvolution {
    /**
     *
     */
    constructor() {
        super("Sharpen Factor 3x3", new ConvolutionMatrix(1 / 3, 0, [
            [0, -2, 0],
            [-2, 11, -2],
            [0, -2, 0],
        ]));

    }

}