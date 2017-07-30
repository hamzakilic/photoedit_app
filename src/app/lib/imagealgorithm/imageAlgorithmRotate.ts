import { IImageAlgorithmMutable } from '../image';
import { IImageAlgorithmImmutable } from '../image';
import { HImage } from '../image';
import { Color } from '../draw/color';
import { Rect } from '../draw/rect';
import { Point } from '../draw/point';
import { Calc } from '../calc';
import { ImageAlgorithmFill } from './imageAlgorithmFill';


/**
* rotates an image
*/
export class ImageAlgorithmRotate implements IImageAlgorithmImmutable {
    private padColor: Color;
    private angleDegrees: number;
    /**
     * 
     * @param angleDegrees rotation angle
     * @param padColor padding color 
     */
    constructor(angleDegrees: number, padColor?: Color) {
        this.padColor = padColor;
        this.angleDegrees = angleDegrees;

    }

    process(img: HImage): HImage {
        debugger;
        let rectSource = new Rect(0, 0, img.width, img.height);
        let rotatedSourceRect = Calc.rotateRect(rectSource, this.angleDegrees);
        
        let rotatedImage = new HImage(rotatedSourceRect.width.extCeil(), rotatedSourceRect.height.extCeil());
        if (this.padColor)
            rotatedImage.processMutable(new ImageAlgorithmFill(undefined, this.padColor));
        else 
            rotatedImage.processMutable(new ImageAlgorithmFill(0, undefined));

        let centerPoint = new Point(rectSource.width / 2, rectSource.height / 2);

         for (let y = 0; y < img.height; ++y) {
            for (let x = 0; x < img.width; ++x) {
                let rotatedPoint = Calc.rotatePoint(new Point(x, y), this.angleDegrees, centerPoint);
                rotatedPoint.X -=rotatedSourceRect.x;
                rotatedPoint.Y -= rotatedSourceRect.y;
                rotatedPoint.X = rotatedPoint.X.extFloor();
                rotatedPoint.Y = rotatedPoint.Y.extFloor();
                let startSource = y * img.width * 4 + x * 4;
                let sourcePixelValues = img.Pixels.slice(startSource, startSource + 4);
                let destination = (rotatedPoint.Y * rotatedImage.width * 4 + rotatedPoint.X * 4).extRound();
                rotatedImage.Pixels.set(sourcePixelValues, destination);
            }
        } 

        return rotatedImage;
    }

}