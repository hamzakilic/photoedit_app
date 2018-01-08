import { HImage } from './../../image';
import { ImageAlgorithmConvolution, ConvolutionMatrix } from './imageAlgorithmConvolution';
import { ImageAlgorithmEdgeDetectionLaplace } from './imageAlgorithmEdgeDetectionLaplace';

export class ImageAlgorithmEdgeDetectionLaplace5x5_2 extends ImageAlgorithmEdgeDetectionLaplace {

    constructor(isGrayscale: boolean = true) {
        super(isGrayscale, "Laplace 5x5_2" + (isGrayscale ? " Gray" : ""), new ConvolutionMatrix(1/159, 0, [
         [ 2, 4, 5, 4, 2],  
         [ 4, 9, 12, 9, 4],  
         [ 5, 12, 15, 12, 5], 
         [ 4, 9, 12, 9, 4], 
         [ 2, 4, 5, 4, 2],
        ]));
        

    }


}