import { ImageAlgorithmConvolution, ConvolutionMatrix } from './imageAlgorithmConvolution';

export class ImageAlgorithmLowpass3x3 extends ImageAlgorithmConvolution {
    /**
     *
     */
    constructor() {
        super("Lowpass 3x3", new ConvolutionMatrix(1/16, 0, [
            [ 1, 2, 1, ],  
            [ 2, 4, 2, ],   
            [ 1, 2, 1, ],
        ]));

    }

}

export class ImageAlgorithmLowpass5x5 extends ImageAlgorithmConvolution {
    /**
     *
     */
    constructor() {
        super("Lowpass 5x5", new ConvolutionMatrix(1/60, 0, [
            [ 1, 1,  1, 1, 1, ],  
            [ 1, 4,  4, 4, 1, ],  
            [ 1, 4, 12, 4, 1, ],  
            [ 1, 4,  4, 4, 1, ],  
            [ 1, 1,  1, 1, 1, ],
        ]));

    }

}
