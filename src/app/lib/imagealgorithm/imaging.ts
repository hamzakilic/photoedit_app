import { HImage } from '../image';
import { Rect } from '../draw/rect';
import { Calc } from '../calc';
import { Color } from '../draw/color';
import { Point } from '../draw/point';
import { ImageAlgorithmCrop } from './imageAlgorithmCrop';
import { ImageAlgorithmRotate } from './imageAlgorithmRotate';

export class Imaging {

       



    public static crop2(img: HImage, rectSource: Rect, rectDestination: Rect, angleDegrees: number): HImage {
        if (angleDegrees == 0) {
            
            let rectIntersect = Calc.intersectRect(rectSource, rectDestination);
            if (!rectIntersect)
                return undefined;
            rectIntersect.x -= rectSource.x;
            rectIntersect.y -= rectSource.y;
            rectIntersect.x = rectIntersect.x.extRound();
            rectIntersect.y = rectIntersect.y.extRound();
            rectIntersect.width = rectIntersect.width.extRound();
            rectIntersect.height = rectIntersect.height.extRound();
            return  img.processImmutable(new ImageAlgorithmCrop(rectIntersect));
        } else {
            let rotatedSourceRect = Calc.rotateRect(rectSource, angleDegrees);
            let rectIntersect = Calc.intersectRect(rotatedSourceRect, rectDestination);
            if (!rectIntersect)
                return undefined;
            rectIntersect.x -= rectSource.x;
            rectIntersect.y -= rectSource.y;
            rectIntersect.x = rectIntersect.x.extRound();
            rectIntersect.y = rectIntersect.y.extRound();
            rectIntersect.width = rectIntersect.width.extRound();
            rectIntersect.height = rectIntersect.height.extRound();

            let rotatedImage= img.processImmutable(new ImageAlgorithmRotate(angleDegrees,new Color(0,0,0,0)));
            //return rotatedImage;
           return rotatedImage.processImmutable(new ImageAlgorithmCrop(rectIntersect));

        }
       // return undefined;

    }

}