import { ImageAlgorithmConvolution, ConvolutionMatrix } from './imageAlgorithmConvolution';

export class ImageAlgorithmHighPass3x3 extends ImageAlgorithmConvolution {
    /**
     *
     */
    constructor() {
        super("High pass 3x3", new ConvolutionMatrix(1 , 128, [
            [-1, -2, -1],
            [-2, 12, -2],
            [-1, -2, -1]

        ]));

    }

}