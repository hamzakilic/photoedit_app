
import { Point } from './draw/point';
import { Rect } from './draw/rect';

export class Calc{
    public static rotatePoint(point: Point,degres:number,halfWidth:number,halfHeight:number): Point{
        let X = point.X*Math.cos(degres/180*Math.PI) - point.Y*Math.sin(degres/180*Math.PI);
        X += halfWidth;
        let Y =point.X*Math.sin(degres/180*Math.PI) + point.Y*Math.cos(degres/180*Math.PI);
        Y += halfHeight;
        return new Point(X,Y);
    }

     public static rotateRect(rect: Rect,degres:number,halfWidth:number,halfHeight:number): Rect{

        let pointLeftTop = this.rotatePoint(rect.leftTop,degres,0,0);
        let pointLeftBottom = this.rotatePoint(rect.leftBottom,degres,0,0);
        let pointRightTop = this.rotatePoint(rect.rightTop,degres,0,0);
        let pointRightBottom = this.rotatePoint(rect.rightBottom,degres,0,0);
    
        let minx=Math.min(pointLeftTop.X,pointLeftBottom.X,pointRightTop.X,pointRightBottom.X);
        let miny=Math.min(pointLeftTop.Y,pointLeftBottom.Y,pointRightTop.Y,pointRightBottom.Y);
        let width=Math.abs(Math.max(pointLeftTop.X,pointLeftBottom.X,pointRightTop.X,pointRightBottom.X)-Math.min(pointLeftTop.X,pointLeftBottom.X,pointRightTop.X,pointRightBottom.X));
        let height=Math.abs(Math.max(pointLeftTop.Y,pointLeftBottom.Y,pointRightTop.Y,pointRightBottom.Y)-Math.min(pointLeftTop.Y,pointLeftBottom.Y,pointRightTop.Y,pointRightBottom.Y));
        return new Rect(minx,miny,width,height);
    }
}