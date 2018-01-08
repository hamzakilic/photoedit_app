
import { HImage } from './../../image';
import { ImageAlgorithmConvolution, ConvolutionMatrix } from './imageAlgorithmConvolution';
import { ImageAlgorithmEdgeDetectionLaplace } from './imageAlgorithmEdgeDetectionLaplace';


export class ImageAlgorithmEdgeDetectionLaplace5x5 extends ImageAlgorithmEdgeDetectionLaplace {

    constructor(isGrayscale: boolean = true) {
        super(isGrayscale, "Laplace 5x5 " + (isGrayscale ? "Gray" : ""), new ConvolutionMatrix(1, 0, [
            [-1, -1, -1, -1, -1],
            [-1, -1, -1, -1, -1],
            [-1, -1, 24, -1, -1],
            [-1, -1, -1, -1, -1],
            [-1, -1, -1, -1, -1]

        ]));
        this._isGrayscale = isGrayscale;

    }


}