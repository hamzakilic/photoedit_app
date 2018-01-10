import { HImage } from './../../image';
import { ImageAlgorithmConvolution, ConvolutionMatrix } from './imageAlgorithmConvolution';

export class ImageAlgorithmEdgeDetection extends ImageAlgorithmConvolution {
    /**
     *
     */
    constructor() {
        super("Edge Detection", new ConvolutionMatrix(1, 0, [
            [-1, -1, -1],  
            [-1,  8, -1],  
            [-1, -1, -1], 
        ]));

    }

}
export class ImageAlgorithmEdgeDetection45Degree extends ImageAlgorithmConvolution {
    /**
     *
     */
    constructor() {
        super("45 Degree", new ConvolutionMatrix(1, 0, [
            [-1, 0, 0, 0, 0],
            [0, -2, 0, 0, 0],
            [0, 0, 6, 0, 0],
            [0, 0, 0, -2, 0],
            [0, 0, 0, 0, -1],
        ]));

    }

}

export class ImageAlgorithmEdgeDetectionHorizontal extends ImageAlgorithmConvolution {
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


export class ImageAlgorithmEdgeDetectionTopLeftBottomRight extends ImageAlgorithmConvolution {
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


export class ImageAlgorithmEdgeDetectionVertical extends ImageAlgorithmConvolution {
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

