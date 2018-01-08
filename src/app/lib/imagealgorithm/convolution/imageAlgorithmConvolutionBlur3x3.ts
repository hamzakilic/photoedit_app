import { ImageAlgorithmConvolution, ConvolutionMatrix } from './imageAlgorithmConvolution';

export class ImageAlgorithmConvolutionBlur3x3 extends ImageAlgorithmConvolution {
    /**
     *
     */
    constructor() {
        super("Blur 3x3", new ConvolutionMatrix(1, 0, [
            [0.0, 0.2, 0.0],
            [0.2, 0.2, 0.2],
            [0.0, 0.2, 0.2]
        ]));

    }

}