import { ImageAlgorithmConvolution, ConvolutionMatrix } from './imageAlgorithmConvolution';

export class ImageAlgorithmConvolutionEdgeDetection extends ImageAlgorithmConvolution {
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