import { ImageAlgorithmConvolution, ConvolutionMatrix } from './imageAlgorithmConvolution';

export class ImageAlgorithmBlur3x3 extends ImageAlgorithmConvolution {
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

export class ImageAlgorithmBlur5x5 extends ImageAlgorithmConvolution {
    /**
     *
     */
    constructor() {
        super("Blur 5x5", new ConvolutionMatrix(1 / 13, 0, [
            [0, 0, 1, 0, 0],
            [0, 1, 1, 1, 0],
            [1, 1, 1, 1, 1],
            [0, 1, 1, 1, 0],
            [0, 0, 1, 0, 0]
        ]));

    }

}


export class ImageAlgorithmBlurGaussian3x3 extends ImageAlgorithmConvolution {
    /**
     *
     */
    constructor() {
        super("Blur Gaussian 3x3", new ConvolutionMatrix(1 / 16, 0, [
            [1, 2, 1],
            [2, 4, 2],
            [1, 2, 1]
        ]));

    }

}

export class ImageAlgorithmBlurGaussian5x5 extends ImageAlgorithmConvolution {
    /**
     *
     */
    constructor() {
        super("Blur Gaussian 5x5", new ConvolutionMatrix(1 / 159, 0, [
            [2, 4, 5, 4, 2],
            [4, 9, 12, 9, 4],
            [5, 12, 15, 12, 5],
            [4, 9, 12, 9, 4],
            [2, 4, 5, 4, 2],

        ]));

    }

}
export class ImageAlgorithmBlurGaussian7x7 extends ImageAlgorithmConvolution {
    /**
     *
     */
    constructor() {
        super("Blur Gaussian 7x7", new ConvolutionMatrix(1 / 136, 0, [
            [ 1,  1,  2,  2,  2,  1,  1, ],
               [ 1,  2,  2,  4,  2,  2,  1, ]  ,
               [ 2,  2,  4,  8,  4,  2,  2, ]  ,
               [ 2,  4,  8, 16,  8,  4,  2, ]  ,
               [ 2,  2,  4,  8,  4,  2,  2, ]  ,
               [ 1,  2,  2,  4,  2,  2,  1, ]  ,
               [ 1,  1,  2,  2,  2,  1,  1, ],

        ]));

    }

}

export class ImageAlgorithmBlurMotion extends ImageAlgorithmConvolution {
    /**
     *
     */
    constructor() {
        super("Blur Motion", new ConvolutionMatrix(1 / 18, 0, [
           [ 1, 0, 0, 0, 0, 0, 0, 0, 1], 
           [ 0, 1, 0, 0, 0, 0, 0, 1, 0],
           [ 0, 0, 1, 0, 0, 0, 1, 0, 0],
           [ 0, 0, 0, 1, 0, 1, 0, 0, 0],
           [ 0, 0, 0, 0, 1, 0, 0, 0, 0], 
           [ 0, 0, 0, 1, 0, 1, 0, 0, 0],
           [ 0, 0, 1, 0, 0, 0, 1, 0, 0],
           [ 0, 1, 0, 0, 0, 0, 0, 1, 0],
           [ 1, 0, 0, 0, 0, 0, 0, 0, 1],

        ]));

    }

}

export class ImageAlgorithmBlurMotionLeftToRight extends ImageAlgorithmConvolution {
    /**
     *
     */
    constructor() {
        super("Blur Motion Left To Right", new ConvolutionMatrix(1 / 9, 0, [
            [ 1, 0, 0, 0, 0, 0, 0, 0, 0], 
            [ 0, 1, 0, 0, 0, 0, 0, 0, 0],
            [ 0, 0, 1, 0, 0, 0, 0, 0, 0],
            [ 0, 0, 0, 1, 0, 0, 0, 0, 0],
            [ 0, 0, 0, 0, 1, 0, 0, 0, 0], 
            [ 0, 0, 0, 0, 0, 1, 0, 0, 0],
            [ 0, 0, 0, 0, 0, 0, 1, 0, 0],
            [ 0, 0, 0, 0, 0, 0, 0, 1, 0],
            [ 0, 0, 0, 0, 0, 0, 0, 0, 1],

        ]));

    }

}


export class ImageAlgorithmBlurMotionRightToLeft extends ImageAlgorithmConvolution {
    /**
     *
     */
    constructor() {
        super("Blur Motion Right To Left", new ConvolutionMatrix(1 / 9, 0, [
            [0, 0, 0, 0, 0, 0, 0, 0, 1],
            [0, 0, 0, 0, 0, 0, 0, 1, 0],
            [0, 0, 0, 0, 0, 0, 1, 0, 0],
            [0, 0, 0, 0, 0, 1, 0, 0, 0],
            [0, 0, 0, 0, 1, 0, 0, 0, 0],
            [0, 0, 0, 1, 0, 0, 0, 0, 0],
            [0, 0, 1, 0, 0, 0, 0, 0, 0],
            [0, 1, 0, 0, 0, 0, 0, 0, 0],
            [1, 0, 0, 0, 0, 0, 0, 0, 0],

        ]));

    }

}