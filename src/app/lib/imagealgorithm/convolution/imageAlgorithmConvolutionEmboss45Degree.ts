import { ImageAlgorithmConvolution, ConvolutionMatrix } from './imageAlgorithmConvolution';

export class ImageAlgorithmConvolutionEmboss45Degree extends ImageAlgorithmConvolution {
    /**
     *
     */
    constructor() {
        super("45 Degree", new ConvolutionMatrix(1, 128, [
            [-1, -1, 0],
            [-1, 0, 1],
            [0, 1, 1],

        ]));

    }

}