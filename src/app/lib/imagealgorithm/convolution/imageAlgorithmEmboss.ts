import { ImageAlgorithmConvolution, ConvolutionMatrix } from './imageAlgorithmConvolution';

export class ImageAlgorithmEmboss extends ImageAlgorithmConvolution {
    /**
     *
     */
    constructor() {
        super("Emboss", new ConvolutionMatrix(1, 128, [
            [2, 0, 0],
            [0, -1, 0],
            [0, 0, -1],

        ]));

    }

}