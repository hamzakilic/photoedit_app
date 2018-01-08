import { ImageAlgorithmConvolution, ConvolutionMatrix } from './imageAlgorithmConvolution';

export class ImageAlgorithmConvolutionEdgeDetectionHorizontal extends ImageAlgorithmConvolution {
    /**
     *
     */
    constructor() {
        super("Edge Horizontal", new ConvolutionMatrix(1, 0, [
            [0, 0, 0, 0, 0],
            [0, 0, 0, 0, 0],
            [-1, -1, 2, 0, 0],
            [0, 0, 0, 0, 0],
            [0, 0, 0, 0, 0],
        ]));

    }

}