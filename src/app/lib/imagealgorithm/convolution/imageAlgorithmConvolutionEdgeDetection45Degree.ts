import { ImageAlgorithmConvolution, ConvolutionMatrix } from './imageAlgorithmConvolution';

export class ImageAlgorithmConvolutionEdgeDetection45Degree extends ImageAlgorithmConvolution {
    /**
     *
     */
    constructor() {
        super("45 Degree", new ConvolutionMatrix(1, 0, [
            [-1, 0, 0, 0, 0],
            [0, -2, 0, 0, 0],
            [0, 0, 6, 0, 0],
            [0, 0, 0, -2, 0],
            [0, 0, 0, 0, -1],
        ]));

    }

}