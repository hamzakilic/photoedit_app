import { ImageAlgorithmRgbToLab } from './../imagealgorithm/imageAlgorithmRgbToLab';

import { ColorConversion } from './../imagealgorithm/colorConversion';
import { Point } from './../draw/point';
import { Polygon } from './../draw/polygon';
import { Color } from './../draw/color';
import { HImage } from './../image';
import { Layer } from '../../models/photoedit/layer';

export class ImageProcessSimilarColors {

    ///layer parametresini debug yapmak için kullanıyorum
    public static process(layer:Layer,img: HImage, color: Color, point: Point,threshold:number,continous:number=5): Array<Polygon> {
        

        let xyz = ColorConversion.rgbToXYZ(color.r, color.g, color.b);
        let lab = ColorConversion.XYZToLab(xyz[0], xyz[1], xyz[2]);
        let lch = ColorConversion.LabToLCH(lab[0], lab[1], lab[2]);
        let points: Array<Point> = [];
        ImageProcessSimilarColors.check(layer,img, points, lch, threshold, point);
        return [new Polygon(points)];
    }

    private static check(layer:Layer,img: HImage, points: Array<Point>, reflch: number[], threshold: number, point: Point) {

        let visited = new Array<boolean>(img.width * img.height);
        visited.forEach((item, index, arr) => visited[index] = false);
        let visitPoints = [];
        visitPoints.push(point);
        while (visitPoints.length > 0) {
            let currentPoint = visitPoints.pop();
            let x = currentPoint.x;
            let y = currentPoint.y;
            if (x < 0 || y < 0)
                continue;
            if (x > img.width || y > img.height)
                continue;
            if (visited[y * img.width + x])
                continue;
            visited[y * img.width + x] = true;
            let position = y * img.width * img.bytePerPixel + x * img.bytePerPixel;
            let r = img.Pixels[position];
            let g = img.Pixels[position + 1];
            let b = img.Pixels[position + 2];

            let xyz = ColorConversion.rgbToXYZ(r, g, b);
            let lab = ColorConversion.XYZToLab(xyz[0], xyz[1], xyz[2]);
            let lch = ColorConversion.LabToLCH(lab[0], lab[1], lab[2]);
            let dif = ImageProcessSimilarColors.delta2000({ L: lch[0], a: lch[1], b: lch[2] }, { L: reflch[0], a: reflch[1], b: reflch[2] });
            
            if (dif < threshold) {
                points.push(new Point(x, y));
              //  layer.graphics.setPixel(x,y,new Color(255,255,255,255));

                //visitPoints.push(new Point(x - 1, y - 1));
                visitPoints.push(new Point(x - 1, y));
                //visitPoints.push(new Point(x - 1, y + 1));
                visitPoints.push(new Point(x, y - 1));
                visitPoints.push(new Point(x, y + 1));
                //visitPoints.push(new Point(x + 1, y - 1));
                visitPoints.push(new Point(x + 1, y));
                //visitPoints.push(new Point(x + 1, y + 1));

            }else{
               // layer.graphics.setPixel(x,y,new Color(255,0,0,255));
               // debugger;
            }


        }


    }

  

    private static delta2000(Lab1: any, Lab2: any): number {
        let kL = 1.0;
        let kC = 1.0;
        let kH = 1.0;
        let lBarPrime = 0.5 * (Lab1.L + Lab2.L);
        let c1 = Math.sqrt(Lab1.a * Lab1.a + Lab1.b * Lab1.b);
        let c2 = Math.sqrt(Lab2.a * Lab2.a + Lab2.b * Lab2.b);
        let cBar = 0.5 * (c1 + c2);
        let cBar7 = cBar * cBar * cBar * cBar * cBar * cBar * cBar;
        let g = 0.5 * (1.0 - Math.sqrt(cBar7 / (cBar7 + 6103515625.0)));	/* 6103515625 = 25^7 */
        let a1Prime = Lab1.a * (1.0 + g);
        let a2Prime = Lab2.a * (1.0 + g);
        let c1Prime = Math.sqrt(a1Prime * a1Prime + Lab1.b * Lab1.b);
        let c2Prime = Math.sqrt(a2Prime * a2Prime + Lab2.b * Lab2.b);
        let cBarPrime = 0.5 * (c1Prime + c2Prime);
        let h1Prime = (Math.atan2(Lab1.b, a1Prime) * 180.0) / Math.PI;
        if (h1Prime < 0.0)
            h1Prime += 360.0;
        var h2Prime = (Math.atan2(Lab2.b, a2Prime) * 180.0) / Math.PI;
        if (h2Prime < 0.0)
            h2Prime += 360.0;
        var hBarPrime = (Math.abs(h1Prime - h2Prime) > 180.0) ? (0.5 * (h1Prime + h2Prime + 360.0)) : (0.5 * (h1Prime + h2Prime));
        var t = 1.0 -
            0.17 * Math.cos(Math.PI * (hBarPrime - 30.0) / 180.0) +
            0.24 * Math.cos(Math.PI * (2.0 * hBarPrime) / 180.0) +
            0.32 * Math.cos(Math.PI * (3.0 * hBarPrime + 6.0) / 180.0) -
            0.20 * Math.cos(Math.PI * (4.0 * hBarPrime - 63.0) / 180.0);
        let dhPrime = 0;
        if (Math.abs(h2Prime - h1Prime) <= 180.0)
            dhPrime = h2Prime - h1Prime;
        else
            dhPrime = (h2Prime <= h1Prime) ? (h2Prime - h1Prime + 360.0) : (h2Prime - h1Prime - 360.0);
        let dLPrime = Lab2.L - Lab1.L;
        let dCPrime = c2Prime - c1Prime;
        let dHPrime = 2.0 * Math.sqrt(c1Prime * c2Prime) * Math.sin(Math.PI * (0.5 * dhPrime) / 180.0);
        let sL = 1.0 + ((0.015 * (lBarPrime - 50.0) * (lBarPrime - 50.0)) / Math.sqrt(20.0 + (lBarPrime - 50.0) * (lBarPrime - 50.0)));
        let sC = 1.0 + 0.045 * cBarPrime;
        let sH = 1.0 + 0.015 * cBarPrime * t;
        let dTheta = 30.0 * Math.exp(-((hBarPrime - 275.0) / 25.0) * ((hBarPrime - 275.0) / 25.0));
        let cBarPrime7 = cBarPrime * cBarPrime * cBarPrime * cBarPrime * cBarPrime * cBarPrime * cBarPrime;
        let rC = Math.sqrt(cBarPrime7 / (cBarPrime7 + 6103515625.0));
        let rT = -2.0 * rC * Math.sin(Math.PI * (2.0 * dTheta) / 180.0);
        let DE2000 = Math.sqrt(
            (dLPrime / (kL * sL)) * (dLPrime / (kL * sL)) +
            (dCPrime / (kC * sC)) * (dCPrime / (kC * sC)) +
            (dHPrime / (kH * sH)) * (dHPrime / (kH * sH)) +
            (dCPrime / (kC * sC)) * (dHPrime / (kH * sH)) * rT);
        return DE2000;
    }


}