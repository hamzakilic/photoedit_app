import { ImageAlgorithmConvolution, ConvolutionMatrix } from './imageAlgorithmConvolution';

export class ImageAlgorithmEmbossIntense extends ImageAlgorithmConvolution {
    /**
     *
     */
    constructor() {
        super("Intense", new ConvolutionMatrix(1, 128, [
            [-1, -1, -1, -1, 0],
            [-1, -1, -1, 0, 1],
            [-1, -1, 0, 1, 1],
            [-1, 0, 1, 1, 1],
            [0, 1, 1, 1, 1],
        ]));

    }

}