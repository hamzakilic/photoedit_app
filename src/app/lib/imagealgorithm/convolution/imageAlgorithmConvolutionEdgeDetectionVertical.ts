import { ImageAlgorithmConvolution, ConvolutionMatrix } from './imageAlgorithmConvolution';

export class ImageAlgorithmConvolutionEdgeDetectionVertical extends ImageAlgorithmConvolution {
    /**
     *
     */
    constructor() {
        super("Edge Vertical", new ConvolutionMatrix(1, 0, [
            [0, 0, -1, 0, 0],
            [0, 0, -1, 0, 0],
            [0, 0, 4, 0, 0],
            [0, 0, -1, 0, 0],
            [0, 0, -1, 0, 0],
        ]));

    }

}