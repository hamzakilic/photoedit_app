import { ImageAlgorithmEdgeDetectionLaplace } from './imageAlgorithmEdgeDetectionLaplace';
import { HImage } from './../../image';
import { ImageAlgorithmConvolution, ConvolutionMatrix } from './imageAlgorithmConvolution';


export class ImageAlgorithmEdgeDetectionLaplace5x5_3 extends ImageAlgorithmEdgeDetectionLaplace {

    constructor(isGrayscale: boolean = true) {
        super(isGrayscale, "Laplace 5x5_3" + (isGrayscale ? " Gray" : ""), new ConvolutionMatrix(1/256, 0, [
            [  1,   4,  6,  4,  1 ],  
            [  4,  16, 24, 16,  4 ],  
            [  6,  24, 36, 24,  6 ], 
            [  4,  16, 24, 16,  4 ], 
            [  1,   4,  6,  4,  1 ],
        ]));
        

    }


}