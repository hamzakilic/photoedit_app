
import { ColorConversion } from './../imagealgorithm/colorConversion';
import { Point } from './../draw/point';
import { Polygon } from './../draw/polygon';
import { Color } from './../draw/color';
import { HImage } from './../image';

export class ImageProcessSimilarColors{

    public static process(img:HImage,color:Color,point:Point):Array<Polygon>{
        let threshold=10;
        let xyz=ColorConversion.rgbToXYZ(color.r,color.g,color.b);
        let lab= ColorConversion.XYZToCIE_Lab(xyz[0],xyz[1],xyz[2]);
        let points:Array<Point>=[];
        ImageProcessSimilarColors.check(points,lab,threshold,point);
        return undefined;
    }

    private static check(points:Array<Point>,lab:number[],threshold:number,point:Point){

    }
}