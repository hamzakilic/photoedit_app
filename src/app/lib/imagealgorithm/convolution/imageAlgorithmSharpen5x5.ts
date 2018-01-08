import { ImageAlgorithmConvolution, ConvolutionMatrix } from './imageAlgorithmConvolution';

export class ImageAlgorithmSharpen5x5 extends ImageAlgorithmConvolution {
    /**
     *
     */
    constructor() {
        super("Sharpen 5x5", new ConvolutionMatrix(1/8, 0, [
            [-1, -1, -1, -1, -1],
            [-1, 2, 2, 2, -1],
            [-1, 2, 8, 2, -1],
            [-1, 2, 2, 2, -1],
            [-1, -1, -1, -1, -1],
        ]));

    }

}