import { IImageAlgorithmMutable } from '../image';
import { IImageAlgorithmImmutable } from '../image';
import { HImage } from '../image';
import { Color } from '../draw/color';
import { } from '../extensions';

export enum GradientEdgeFilterType {
    None,
    EdgeDetectMono,
    EdgeDetectGradient,
    Sharpen,
    SharpenGradient,
}

export enum GradientDerivativeLevel {
    First = 1,
    Second = 2
}


export class ImageAlgorithmEdgeDetectionGradient implements IImageAlgorithmImmutable {
    _threshold: number;
    _blueFactor: number;
    _greenFactor: number;
    _redFactor: number;
    _level: GradientDerivativeLevel;
    _filterType: GradientEdgeFilterType;
    _name:string;

    constructor(filterType: GradientEdgeFilterType, level: GradientDerivativeLevel, redFactor: number, greenFactor: number, blueFactor: number, threshold: number,name:string="Gradient Edge Detection") {
        this._filterType = filterType;
        this._level = level;
        this._redFactor = redFactor;
        this._greenFactor = greenFactor;
        this._blueFactor = blueFactor;
        this._threshold = threshold;
        this._name=name;

    }
    public get name():string{
        return this._name;
    }
    process(img: HImage): HImage {
        let tempImage = new HImage(img.width, img.height, new Uint8ClampedArray(img.Pixels), img.bytePerPixel);

        let derivative = this._level.extToInt32();
        let byteOffset = 0;
        let blueGradient = 0, greenGradient = 0, redGradient = 0;
        let blue = 0, green = 0, red = 0;

        let exceedsThreshold = false;
        let stride = img.width * img.bytePerPixel;

        for (let offsetY = 1; offsetY < img.height - 1; ++offsetY)
            for (let offsetX = 1; offsetX < img.width - 1; ++offsetX) {
                byteOffset = offsetY * img.width * img.bytePerPixel + offsetX * img.bytePerPixel;

                redGradient = this.calculateDerivation(img.Pixels, byteOffset, 4, derivative)
                redGradient += this.calculateDerivation(img.Pixels, byteOffset, stride, derivative);
                byteOffset++;

                greenGradient = this.calculateDerivation(img.Pixels, byteOffset, 4, derivative);
                greenGradient += this.calculateDerivation(img.Pixels, byteOffset, stride, derivative);
                byteOffset++;

                blueGradient = this.calculateDerivation(img.Pixels, byteOffset, 4, derivative);
                blueGradient += this.calculateDerivation(img.Pixels, byteOffset, stride, derivative);

                if (redGradient + greenGradient + blueGradient > this._threshold) {
                    exceedsThreshold = true;
                } else {

                    byteOffset += -2;
                    redGradient = this.calculateDerivation(img.Pixels, byteOffset, 4, derivative);

                    byteOffset++;
                    greenGradient = this.calculateDerivation(img.Pixels, byteOffset, 4, derivative);

                    byteOffset++;
                    blueGradient = this.calculateDerivation(img.Pixels, byteOffset, 4, derivative);

                    if (redGradient + greenGradient + blueGradient > this._threshold) {
                        exceedsThreshold = true;
                    } else {

                        byteOffset += -2;
                        redGradient = this.calculateDerivation(img.Pixels, byteOffset, stride, derivative);

                        byteOffset++;
                        greenGradient = this.calculateDerivation(img.Pixels, byteOffset, stride, derivative);

                        byteOffset++;
                        blueGradient = this.calculateDerivation(img.Pixels, byteOffset, stride, derivative);


                        if (redGradient + greenGradient + blueGradient > this._threshold) {
                            exceedsThreshold = true;
                        } else {

                            byteOffset += -2;
                            redGradient = this.calculateDerivation(img.Pixels, byteOffset, 4 + stride, derivative);
                            redGradient += this.calculateDerivation(img.Pixels, byteOffset, (stride - 4), derivative);
                            byteOffset++;
                            greenGradient = this.calculateDerivation(img.Pixels, byteOffset, 4 + stride, derivative);
                            greenGradient += this.calculateDerivation(img.Pixels, byteOffset, (stride - 4), derivative);
                            byteOffset++;
                            blueGradient = this.calculateDerivation(img.Pixels, byteOffset, 4 + stride, derivative);
                            blueGradient += this.calculateDerivation(img.Pixels, byteOffset, (stride - 4), derivative);

                            if (redGradient + greenGradient + blueGradient > this._threshold) {
                                exceedsThreshold = true;
                            } else {

                                byteOffset += -2;
                                redGradient = this.calculateDerivation(img.Pixels, byteOffset, 4 + stride, derivative);
                                redGradient += this.calculateDerivation(img.Pixels, byteOffset, (stride - 4), derivative);
                                byteOffset++;
                                greenGradient = this.calculateDerivation(img.Pixels, byteOffset, 4 + stride, derivative);
                                greenGradient += this.calculateDerivation(img.Pixels, byteOffset, (stride - 4), derivative);
                                byteOffset++;
                                blueGradient = this.calculateDerivation(img.Pixels, byteOffset, 4 + stride, derivative);
                                blueGradient += this.calculateDerivation(img.Pixels, byteOffset, (stride - 4), derivative);

                                if (blueGradient + greenGradient + redGradient > this._threshold) { exceedsThreshold = true; }
                                else { exceedsThreshold = false; }

                            }

                        }


                    }
                }
            }


            byteOffset += -2;

                    if (exceedsThreshold)
                    {
                        if (this._filterType == GradientEdgeFilterType.EdgeDetectMono)
                        {
                            blue = green = red = 255;
                        }
                        else if (this._filterType == GradientEdgeFilterType.EdgeDetectGradient)
                        {
                            blue = blueGradient * this._blueFactor;
                            green = greenGradient * this._greenFactor;
                            red = redGradient * this._redFactor;
                        }
                        else if (this._filterType == GradientEdgeFilterType.Sharpen)
                        {
                            red = img.Pixels[byteOffset] * this._redFactor;
                            green = img.Pixels[byteOffset + 1] * this._greenFactor;
                            blue = img.Pixels[byteOffset + 2] * this._blueFactor;
                        }
                        else if (this._filterType == GradientEdgeFilterType.SharpenGradient)
                        {
                            red = img.Pixels[byteOffset] + redGradient * this._redFactor;
                            green = img.Pixels[byteOffset + 1] + greenGradient * this._greenFactor;
                            blue = img.Pixels[byteOffset + 2] + blueGradient * this._blueFactor;
                        }
                    }
                    else
                    {
                        if (this._filterType == GradientEdgeFilterType.EdgeDetectMono || 
                            this._filterType == GradientEdgeFilterType.EdgeDetectGradient)
                        {
                            blue = green = red = 0;
                        }
                        else if (this._filterType == GradientEdgeFilterType.Sharpen || 
                            this._filterType == GradientEdgeFilterType.SharpenGradient)
                        {
                            red = img.Pixels[byteOffset];
                            green = img.Pixels[byteOffset + 1];
                            blue = img.Pixels[byteOffset + 2];
                        }
                    }

                    blue = (blue > 255 ? 255 :
                           (blue < 0 ? 0 :
                            blue));

                    green = (green > 255 ? 255 :
                            (green < 0 ? 0 :
                             green));

                    red = (red > 255 ? 255 :
                          (red < 0 ? 0 :
                           red)); 

                    tempImage.Pixels[byteOffset] = red.extToInt32();
                    tempImage.Pixels[byteOffset + 1] = green.extToInt32();
                    tempImage.Pixels[byteOffset + 2] = blue.extToInt32();
                    tempImage.Pixels[byteOffset + 3] = img.Pixels[byteOffset+3];  




        return tempImage;
    }

    private calculateDerivation(pixels: Uint8ClampedArray, offset: number, val: number, derivative: number) {
        return ((pixels[offset - val] - pixels[offset + val]) / derivative).extAbs();
    }

}