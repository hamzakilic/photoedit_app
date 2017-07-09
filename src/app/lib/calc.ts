
import { Point } from './draw/point';
import { Rect } from './draw/rect';

export class Calc{
    public static rotatePoint(point: Point,degres:number,pointAround: Point): Point{
        let X = (point.X-pointAround.X)*Math.cos(degres/180*Math.PI) - (point.Y-pointAround.Y)*Math.sin(degres/180*Math.PI)+pointAround.X;
        
        let Y =(point.X-pointAround.X)*Math.sin(degres/180*Math.PI) + (point.Y-pointAround.Y)*Math.cos(degres/180*Math.PI)+pointAround.Y;
        
        return new Point(X,Y);
    }

     

     public static rotateRect(rect: Rect,degres:number): Rect{
        let center=new Point(rect.leftTop.X+rect.width/2,rect.leftTop.Y+rect.height/2);
        let pointLeftTop = this.rotatePoint(rect.leftTop,degres,center);
        let pointLeftBottom = this.rotatePoint(rect.leftBottom,degres,center);
        let pointRightTop = this.rotatePoint(rect.rightTop,degres,center);
        let pointRightBottom = this.rotatePoint(rect.rightBottom,degres,center);
    
        let minx=Math.min(pointLeftTop.X,pointLeftBottom.X,pointRightTop.X,pointRightBottom.X);
        let miny=Math.min(pointLeftTop.Y,pointLeftBottom.Y,pointRightTop.Y,pointRightBottom.Y);
        let width=Math.abs(Math.max(pointLeftTop.X,pointLeftBottom.X,pointRightTop.X,pointRightBottom.X)-Math.min(pointLeftTop.X,pointLeftBottom.X,pointRightTop.X,pointRightBottom.X));
        let height=Math.abs(Math.max(pointLeftTop.Y,pointLeftBottom.Y,pointRightTop.Y,pointRightBottom.Y)-Math.min(pointLeftTop.Y,pointLeftBottom.Y,pointRightTop.Y,pointRightBottom.Y));
        return new Rect(minx,miny,width,height);
    }
}