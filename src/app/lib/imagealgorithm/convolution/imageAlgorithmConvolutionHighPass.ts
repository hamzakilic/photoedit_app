import { ImageAlgorithmConvolution, ConvolutionMatrix } from './imageAlgorithmConvolution';

export class ImageAlgorithmConvolutionHighPass extends ImageAlgorithmConvolution {
    /**
     *
     */
    constructor() {
        super("High pass", new ConvolutionMatrix(1 / 16, 128, [
            [-1, -2, -1],
            [-2, 12, -2],
            [-1, -2, -1]

        ]));

    }

}