import { HImage } from './../../image';
import { ImageAlgorithmConvolution, ConvolutionMatrix } from './imageAlgorithmConvolution';
import { ImageAlgorithmEdgeDetectionLaplace } from './imageAlgorithmEdgeDetectionLaplace';

export class ImageAlgorithmEdgeDetectionLaplace3x3 extends ImageAlgorithmEdgeDetectionLaplace {
    
    constructor(isGrayscale:boolean=true) {
        super(isGrayscale, "Laplace 3x3 "+(isGrayscale?"Gray":""), new ConvolutionMatrix(1, 0, [
            [-1, -1, -1],
            [-1, 8, -1],
            [-1, -1, -1],

        ]));
        

    }
   

}