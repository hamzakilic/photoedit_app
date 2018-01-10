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


export class ImageAlgorithmEmboss45Degree extends ImageAlgorithmConvolution {
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

export class ImageAlgorithmEmbossTopLeftBottomRight extends ImageAlgorithmConvolution {
    /**
     *
     */
    constructor() {
        super("TopLeft BottomRight", new ConvolutionMatrix(1 , 128, [
            [-1, 0,  0],  
            [0,  0,  0],  
            [ 0,  0,  1],

        ]));

    }

}