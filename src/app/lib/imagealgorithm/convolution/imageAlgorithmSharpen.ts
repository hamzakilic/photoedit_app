import { ImageAlgorithmConvolution, ConvolutionMatrix } from './imageAlgorithmConvolution';

export class ImageAlgorithmSharpen extends ImageAlgorithmConvolution {
    /**
     *
     */
    constructor() {
        super("Sharpen", new ConvolutionMatrix(1, 0, [
            [-1, -1, -1],
            [-1, 9, -1],
            [-1, -1, -1],
        ]));

    }

}

export class ImageAlgorithmSharpen3x3 extends ImageAlgorithmConvolution {
    /**
     *
     */
    constructor() {
        super("Sharpen 3x3", new ConvolutionMatrix(1, 0, [
            [0, -1, 0],
            [-1, 5, -1],
            [0, -1, 0],
        ]));

    }

}

export class ImageAlgorithmSharpen3x3Factor extends ImageAlgorithmConvolution {
    /**
     *
     */
    constructor() {
        super("Sharpen Factor 3x3", new ConvolutionMatrix(1 / 3, 0, [
            [0, -2, 0],
            [-2, 11, -2],
            [0, -2, 0],
        ]));

    }

}

export class ImageAlgorithmSharpen5x5 extends ImageAlgorithmConvolution {
    /**
     *
     */
    constructor() {
        super("Sharpen 5x5", new ConvolutionMatrix(1/8, 0, [
            [-1, -1, -1, -1, -1],
            [-1, 2, 2, 2, -1],
            [-1, 2, 8, 2, -1],
            [-1, 2, 2, 2, -1],
            [-1, -1, -1, -1, -1],
        ]));

    }

}

export class ImageAlgorithmSharpenIntense extends ImageAlgorithmConvolution {
    /**
     *
     */
    constructor() {
        super("Sharpen Intense", new ConvolutionMatrix(1, 0, [
            [ 1,  1, 1, ],  
            [ 1, -7, 1, ],  
            [ 1,  1, 1, ], 
        ]));

    }

}