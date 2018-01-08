import { ImageAlgorithmConvolution, ConvolutionMatrix } from './imageAlgorithmConvolution';

export class ImageAlgorithmConvolutionSoften extends ImageAlgorithmConvolution {
    /**
     *
     */
    constructor() {
        super("Soften", new ConvolutionMatrix(1 / 8, 0, [
            [1, 1, 1],
            [1, 1, 1],
            [1, 1, 1],

        ]));

    }

}