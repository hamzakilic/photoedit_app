import { HImage } from './../../image';
import { ImageAlgorithmConvolution, ConvolutionMatrix } from './imageAlgorithmConvolution';
import { ImageAlgorithmEdgeDetectionLaplace } from './imageAlgorithmEdgeDetectionLaplace';

export class ImageAlgorithmEdgeDetectionLaplaceGaussian extends ImageAlgorithmEdgeDetectionLaplace {

    constructor(isGrayscale: boolean = true) {
        super(isGrayscale, "Laplace Gaussian " + (isGrayscale ? "Gray" : ""), new ConvolutionMatrix(1, 0, [
          [  0,  0, -1,  0,  0 ],  
          [  0, -1, -2, -1,  0 ],  
          [ -1, -2, 16, -2, -1 ], 
          [  0, -1, -2, -1,  0 ], 
          [  0,  0, -1,  0,  0 ]

        ]));
        this._isGrayscale = isGrayscale;

    }


}