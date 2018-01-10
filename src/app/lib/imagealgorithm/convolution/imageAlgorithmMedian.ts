import { ConvolutionMatrix } from './imageAlgorithmConvolution';
import { HImage, IImageAlgorithmImmutable } from './../../image';
import { } from '../../extensions';




export class ImageAlgorithmMedian implements IImageAlgorithmImmutable {
    private _matrix: ConvolutionMatrix;
    private _name: string;
    constructor(name: string, matrix: ConvolutionMatrix) {
        this._matrix = matrix;
        this._name = name;

    }
    public get name() {
        return this._name;
    }
    process(img: HImage): HImage {
        let tempImage = new HImage(img.width, img.height, new Uint8ClampedArray(img.Pixels), img.bytePerPixel);
        let filterOffset = ((this._matrix.width - 1) / 2).extToInt32();
        let calcOffset = 0;
        let neighboursPixels: number[] = [];
        let middlePixel: number[] = [];
        let byteOffset = 0;

        for (let offsetY = filterOffset; offsetY < img.height - filterOffset; ++offsetY)
            for (let offsetX = filterOffset; offsetX < img.width - filterOffset; ++offsetX) {
               debugger;

                byteOffset = offsetY * img.width * img.bytePerPixel + offsetX * img.bytePerPixel;
                neighboursPixels = [];

                for (let filterY = -filterOffset; filterY <= filterOffset; ++filterY)
                    for (let filterX = -filterOffset; filterX <= filterOffset; ++filterX) {

                        calcOffset = (offsetY + filterY) * img.width * img.bytePerPixel + (offsetX + filterX) * img.bytePerPixel;
                        let red = img.Pixels[calcOffset] << 24;
                        let green = img.Pixels[calcOffset + 1] << 16;
                        let blue = img.Pixels[calcOffset + 2] << 8;
                        let alpha = img.Pixels[calcOffset + 3];
                        neighboursPixels.push(red | green | blue | alpha);

                    }

                neighboursPixels = neighboursPixels.sort();
                let r = neighboursPixels[filterOffset] >>> 24;
                let g = neighboursPixels[filterOffset] << 8 >>> 24;
                let b = neighboursPixels[filterOffset] << 16 >>> 24;
                let a = neighboursPixels[filterOffset] << 24 >>> 24;


                tempImage.Pixels[byteOffset] = r;
                tempImage.Pixels[byteOffset + 1] = g;
                tempImage.Pixels[byteOffset + 2] = b;
                tempImage.Pixels[byteOffset + 3] = a;



            }


        return tempImage;
    }

}


export class ImageAlgorithmMedian3x3 extends ImageAlgorithmMedian {

    constructor() {
        super("Median 3x3", new ConvolutionMatrix(1, 0, [
            [1, 1, 1,],
            [1, 1, 1,],
            [1, 1, 1,]
        ]));


    }


}

export class ImageAlgorithmMedian5x5 extends ImageAlgorithmMedian {

    constructor() {
        super("Median 5x5", new ConvolutionMatrix(1, 0, [
            [1, 1, 1, 1, 1,],
            [1, 1, 1, 1, 1,],
            [1, 1, 1, 1, 1,],
            [1, 1, 1, 1, 1,],
            [1, 1, 1, 1, 1,],
        ]));


    }


}
export class ImageAlgorithmMedian7x7 extends ImageAlgorithmMedian {

    constructor() {
        super("Median 7x7", new ConvolutionMatrix(1, 0, [
            [1, 1, 1, 1, 1, 1, 1],
            [1, 1, 1, 1, 1, 1, 1],
            [1, 1, 1, 1, 1, 1, 1],
            [1, 1, 1, 1, 1, 1, 1],
            [1, 1, 1, 1, 1, 1, 1],
            [1, 1, 1, 1, 1, 1, 1],
            [1, 1, 1, 1, 1, 1, 1],
        ]));


    }


}

export class ImageAlgorithmMedian9x9 extends ImageAlgorithmMedian {

    constructor() {
        super("Median 9x9", new ConvolutionMatrix(1, 0, [
            [1, 1, 1, 1, 1, 1, 1,1,1],
            [1, 1, 1, 1, 1, 1, 1,1,1],
            [1, 1, 1, 1, 1, 1, 1,1,1],
            [1, 1, 1, 1, 1, 1, 1,1,1],
            [1, 1, 1, 1, 1, 1, 1,1,1],
            [1, 1, 1, 1, 1, 1, 1,1,1],
            [1, 1, 1, 1, 1, 1, 1,1,1],
            [1, 1, 1, 1, 1, 1, 1,1,1],
            [1, 1, 1, 1, 1, 1, 1,1,1]
            
        ]));


    }


}