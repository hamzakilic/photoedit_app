import { IImageAlgorithmMutable } from '../image';
import { IImageAlgorithmImmutable } from '../image';
import { HImage } from '../image';
import { Color } from '../draw/color';
import { Rect } from '../draw/rect';
import { Point } from '../draw/point';
import { HMath } from '../hMath';
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

        if (this.angleDegrees == 90) {

            return this.rotate90(img);
        }
        if (this.angleDegrees == -90) {

            return this.rotate90Minus(img);
        }
        if (this.angleDegrees == 180 || this.angleDegrees==-180) {
            //debugger;
            return this.rotate180(img);
        }
        return this.rotateOther(img);

    }
    /**
     * rotates 90 degress
     * @param img 
     */
    private rotate90(img: HImage): HImage {
        let rotatedImage = new HImage(img.height, img.width);


        let arr = new Uint8ClampedArray(rotatedImage.width * 4);
        for (let x1 = 0; x1 < img.width; ++x1) {

            for (let y1 = img.height - 1; y1 >= 0; --y1) {

                arr[(img.height - y1 - 1) * 4 + 0] = img.Pixels[y1 * img.width * 4 + x1 * 4 + 0];
                arr[(img.height - y1 - 1) * 4 + 1] = img.Pixels[y1 * img.width * 4 + x1 * 4 + 1];
                arr[(img.height - y1 - 1) * 4 + 2] = img.Pixels[y1 * img.width * 4 + x1 * 4 + 2];
                arr[(img.height - y1 - 1) * 4 + 3] = img.Pixels[y1 * img.width * 4 + x1 * 4 + 3];
            }
            rotatedImage.Pixels.set(arr, x1 * rotatedImage.width * 4)
        }




        return rotatedImage;
    }
    /**
     * rotates -90 degress
     * @param img 
     */
    private rotate90Minus(img: HImage): HImage {
        let rotatedImage = new HImage(img.height, img.width);


        let arr = new Uint8ClampedArray(rotatedImage.width * 4);
        for (let x1 = 0; x1 < img.width; ++x1) {

            for (let y1 = 0; y1 < img.height; ++y1) {

                arr[y1 * 4 + 0] = img.Pixels[y1 * img.width * 4 + x1 * 4 + 0];
                arr[y1 * 4 + 1] = img.Pixels[y1 * img.width * 4 + x1 * 4 + 1];
                arr[y1 * 4 + 2] = img.Pixels[y1 * img.width * 4 + x1 * 4 + 2];
                arr[y1 * 4 + 3] = img.Pixels[y1 * img.width * 4 + x1 * 4 + 3];
            }
            rotatedImage.Pixels.set(arr, (img.width - 1 - x1) * rotatedImage.width * 4)
        }




        return rotatedImage;
    }
    /**
     * rotates 180 degress
     * @param img 
     */
    private rotate180(img: HImage): HImage {
        let rotatedImage = new HImage(img.width, img.height);


        let arr = new Uint8ClampedArray(rotatedImage.width * 4);
        for (let y1 = 0; y1 < img.height; ++y1) {

            for (let x1 = 0; x1 < img.width; ++x1) {
                arr[(img.width - x1 - 1) * 4 + 0] = img.Pixels[y1 * img.width * 4 + x1 * 4 + 0];
                arr[(img.width - x1 - 1) * 4 + 1] = img.Pixels[y1 * img.width * 4 + x1 * 4 + 1];
                arr[(img.width - x1 - 1) * 4 + 2] = img.Pixels[y1 * img.width * 4 + x1 * 4 + 2];
                arr[(img.width - x1 - 1) * 4 + 3] = img.Pixels[y1 * img.width * 4 + x1 * 4 + 3];
               
            }
             rotatedImage.Pixels.set(arr, (img.height - 1 - y1) * rotatedImage.width * 4)
        }




        return rotatedImage;
    }
    
    



    //bilinear interpolation rotation algorithm
    private rotateOther(img: HImage): HImage {
        let rectSource = new Rect(0, 0, img.width, img.height);
        let rotatedSourceRect = HMath.rotateRect(rectSource, this.angleDegrees);

        let rotatedImage = new HImage(rotatedSourceRect.width.extCeil(), rotatedSourceRect.height.extCeil());
        if (this.padColor)
            rotatedImage.processMutable(new ImageAlgorithmFill(undefined, this.padColor));
        else
            rotatedImage.processMutable(new ImageAlgorithmFill(0, undefined));

        let centerPoint = new Point(rotatedImage.width / 2, rotatedImage.height / 2);

        let ymax = img.height - 1;
        let xmax = img.width - 1;
        let ox, oy, dx1, dy1, dx2, dy2;
        let ox1, oy1, ox2, oy2;
        let v1, v2;
        let p1, p2, p3, p4;

        for (let y = 0; y < rotatedImage.height; ++y) {
            for (let x = 0; x < rotatedImage.width; ++x) {
                let rotatedPoint = HMath.rotatePoint(new Point(x, y), -this.angleDegrees, centerPoint);
                rotatedPoint.x += rotatedSourceRect.x;
                rotatedPoint.y += rotatedSourceRect.y;
                ox = rotatedPoint.x;
                oy = rotatedPoint.y;
                ox1 = ox.extFloor();
                oy1 = oy.extFloor();

                if (ox1 >= 0 && oy1 >= 0 && ox1 < img.width && oy1 < img.height) {
                    ox2 = (ox1 == xmax) ? ox1 : ox1 + 1;
                    oy2 = (oy1 == ymax) ? oy1 : oy1 + 1;

                    if ((dx1 = ox - ox1) < 0)
                        dx1 = 0;
                    dx2 = 1.0 - dx1;

                    if ((dy1 = oy - oy1) < 0)
                        dy1 = 0;
                    dy2 = 1.0 - dy1;

                    p1 = p2 = oy1 * img.width * 4;
                    p1 += ox1 * 4;
                    p2 += ox2 * 4;

                    p3 = p4 = oy2 * img.width * 4;
                    p3 += ox1 * 4;
                    p4 += ox2 * 4;

                    // red
                    let p1pixels = img.Pixels.slice(p1, p1 + 4);
                    p1pixels.forEach((val, index, array) => array[index] = dx2 * val);
                    let p2pixels = img.Pixels.slice(p2, p2 + 4);
                    p2pixels.forEach((val, index, array) => array[index] = dx1 * val);
                    let p3pixels = img.Pixels.slice(p3, p3 + 4);
                    p3pixels.forEach((val, index, array) => array[index] = dx2 * val);
                    let p4pixels = img.Pixels.slice(p4, p4 + 4);
                    p4pixels.forEach((val, index, array) => array[index] = dx1 * val);
                    let result = [0, 0, 0, 0];
                    for (let a = 0; a < 4; ++a) {
                        let v1 = p1pixels[a] + p2pixels[a];
                        let v2 = p3pixels[a] + p4pixels[a];
                        let val = (dy2 * v1 + dy1 * v2);
                        result[a] = val;
                    }


                    rotatedImage.Pixels.set(result, y * rotatedImage.width * 4 + x * 4);
                }
            }
        }

        return rotatedImage;
    }

}