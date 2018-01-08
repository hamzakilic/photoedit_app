import { ImageAlgorithmConvolution, ConvolutionMatrix } from './imageAlgorithmConvolution';

export class ImageAlgorithmConvolutionEdgeDetectionTopLeftBottomRight extends ImageAlgorithmConvolution {
    /**
     *
     */
    constructor() {
        super("Edge TopLeft", new ConvolutionMatrix(1, 0, [
            [-5, 0, 0],
            [0, 0, 0],
            [0, 0, 5],
        ]));

    }

}