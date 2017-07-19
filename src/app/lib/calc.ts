
import { Point } from './draw/point';
import { Rect } from './draw/rect';
import { Rect2D } from './draw/rect2D';

export class Calc{
    //counter clockwise formula
    public static rotatePoint(point: Point,degres:number,pointAround: Point): Point{
        let X = (point.X-pointAround.X)*Math.cos(degres/180*Math.PI) - (point.Y-pointAround.Y)*Math.sin(degres/180*Math.PI)+pointAround.X;
        
        let Y =(point.X-pointAround.X)*Math.sin(degres/180*Math.PI) + (point.Y-pointAround.Y)*Math.cos(degres/180*Math.PI)+pointAround.Y;
        
        return new Point(X,Y);
    }

     
//counter clockwise formula
     public static rotateRect(rect: Rect,degres:number): Rect{
        let center=new Point(rect.leftTop.X+rect.width/2,rect.leftTop.Y+rect.height/2);
        let pointLeftTop = this.rotatePoint(rect.leftTop,degres,center);
        let pointLeftBottom = this.rotatePoint(rect.leftBottom,degres,center);
        let pointRightTop = this.rotatePoint(rect.rightTop,degres,center);
        let pointRightBottom = this.rotatePoint(rect.rightBottom,degres,center);
    
        let minx=Math.min(pointLeftTop.X,pointLeftBottom.X,pointRightTop.X,pointRightBottom.X);
        let maxx=Math.min(pointLeftTop.X,pointLeftBottom.X,pointRightTop.X,pointRightBottom.X);
        let miny=Math.min(pointLeftTop.Y,pointLeftBottom.Y,pointRightTop.Y,pointRightBottom.Y);
        let maxy=Math.min(pointLeftTop.Y,pointLeftBottom.Y,pointRightTop.Y,pointRightBottom.Y);
        let width=Math.abs(maxx-minx);
        let height=Math.abs(maxy-miny);
        return new Rect(minx,miny,width,height);
    }
    public static rotateRect2D(rect: Rect2D,degres:number): Rect2D{

        let minx=Math.min(rect.leftTop.X,rect.leftBottom.X,rect.rightTop.X,rect.rightBottom.X);
        let maxx=Math.max(rect.leftTop.X,rect.leftBottom.X,rect.rightTop.X,rect.rightBottom.X);
        let miny=Math.min(rect.leftTop.Y,rect.leftBottom.Y,rect.rightTop.Y,rect.rightBottom.Y);
        let maxy=Math.min(rect.leftTop.Y,rect.leftBottom.Y,rect.rightTop.Y,rect.rightBottom.Y);
        let width=Math.abs(maxx-minx);
        let height=Math.abs(maxy-miny);
        let center=new Point(minx+width/2,miny+height/2);
        let pointLeftTop = this.rotatePoint(rect.leftTop,degres,center);
        let pointLeftBottom = this.rotatePoint(rect.leftBottom,degres,center);
        let pointRightTop = this.rotatePoint(rect.rightTop,degres,center);
        let pointRightBottom = this.rotatePoint(rect.rightBottom,degres,center);
    
        
        return new Rect2D(pointLeftTop,pointLeftBottom,pointRightTop,pointRightBottom);
    }

    public static cos(degres:number): number{
        return Math.cos(degres/180*Math.PI);
    }

    public static sin(degres:number): number{
        return Math.sin(degres/180*Math.PI);
    }
    public static scaleRect(rect:Rect,scale: number): Rect{
        return new Rect(rect.x*scale,rect.y*scale,rect.width*scale,rect.height*scale);
    }

    public static intersectRect(r1:Rect,r2:Rect):Rect{

         let xmin = Math.max(r1.x, r2.x);
         let xmax1 = r1.x + r1.width;
         let xmax2 = r2.x + r2.width;
         let xmax = Math.min(xmax1, xmax2);
        if (xmax > xmin) {
          let ymin = Math.max(r1.y, r2.y);
         let  ymax1 = r1.y + r1.height;
        let ymax2 = r2.y + r2.height;
         let ymax = Math.min(ymax1, ymax2);
        if (ymax > ymin) {
            let x = xmin;
            let y = ymin;
            let width = xmax - xmin;
            let height = ymax - ymin;
            return new Rect(x,y,width,height);
        }
    }
    return undefined;
    }

    public static isIntersect(point:Point,rect: Rect): boolean{
        if(point.X>=rect.leftTop.X)
            if(point.X<=rect.rightTop.X)
                if(point.Y>=rect.leftTop.Y)
                    if(point.Y<=rect.leftBottom.Y)
                        return true;
        return false;


    }
}