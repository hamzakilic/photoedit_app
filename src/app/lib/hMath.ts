import { Polygon } from './draw/polygon';

import { Point } from './draw/point';
import { Rect } from './draw/rect';
import { Rect2D } from './draw/rect2D';

export class HMath {

    /**
     * counter clockwise rotates a point around another pointer
     * @param point source point
     * @param degres degress as degree
     * @param pointAround around point
     * @return new rotated point
     */
    public static rotatePoint(point: Point, degres: number, pointAround: Point): Point {
        let X = (point.x - pointAround.x) * Math.cos(degres / 180 * Math.PI) - (point.y - pointAround.y) * Math.sin(degres / 180 * Math.PI) + pointAround.x;

        let Y = (point.x - pointAround.x) * Math.sin(degres / 180 * Math.PI) + (point.y - pointAround.y) * Math.cos(degres / 180 * Math.PI) + pointAround.y;

        return new Point(X, Y);
    }




    /**
     * counter clockwise rotates a rectagle around its center
     * @param rect 
     * @param degres 
     * @return new rotated rect
     */
    public static rotateRect(rect: Rect, degres: number): Rect {
        let center = new Point(rect.leftTop.x + rect.width / 2, rect.leftTop.y + rect.height / 2);
        let pointLeftTop = this.rotatePoint(rect.leftTop, degres, center);
        let pointLeftBottom = this.rotatePoint(rect.leftBottom, degres, center);
        let pointRightTop = this.rotatePoint(rect.rightTop, degres, center);
        let pointRightBottom = this.rotatePoint(rect.rightBottom, degres, center);

        let minx = Math.min(pointLeftTop.x, pointLeftBottom.x, pointRightTop.x, pointRightBottom.x);
        let maxx = Math.max(pointLeftTop.x, pointLeftBottom.x, pointRightTop.x, pointRightBottom.x);
        let miny = Math.min(pointLeftTop.y, pointLeftBottom.y, pointRightTop.y, pointRightBottom.y);
        let maxy = Math.max(pointLeftTop.y, pointLeftBottom.y, pointRightTop.y, pointRightBottom.y);
        let width = Math.abs(maxx - minx);
        let height = Math.abs(maxy - miny);
        return new Rect(minx, miny, width, height);
    }

    /**
     * rotates a @see Rect2D 
     * @param rect 
     * @param degres 
     * @return new rotated Rect2D
     */
    public static rotateRect2D(rect: Rect2D, degres: number): Rect2D {

        let minx = Math.min(rect.leftTop.x, rect.leftBottom.x, rect.rightTop.x, rect.rightBottom.x);
        let maxx = Math.max(rect.leftTop.x, rect.leftBottom.x, rect.rightTop.x, rect.rightBottom.x);
        let miny = Math.min(rect.leftTop.y, rect.leftBottom.y, rect.rightTop.y, rect.rightBottom.y);
        let maxy = Math.max(rect.leftTop.y, rect.leftBottom.y, rect.rightTop.y, rect.rightBottom.y);
        let width = Math.abs(maxx - minx);
        let height = Math.abs(maxy - miny);
        let center = new Point(minx + width / 2, miny + height / 2);
        let pointLeftTop = this.rotatePoint(rect.leftTop, degres, center);
        let pointLeftBottom = this.rotatePoint(rect.leftBottom, degres, center);
        let pointRightTop = this.rotatePoint(rect.rightTop, degres, center);
        let pointRightBottom = this.rotatePoint(rect.rightBottom, degres, center);


        return new Rect2D(pointLeftTop, pointLeftBottom, pointRightTop, pointRightBottom);
    }

    

    /**
     * cos value of a degrees
     * @param degres 
     */
    public static cos(degres: number): number {
        return Math.cos(degres / 180 * Math.PI);
    }

    /**
     * sin value of a degree
     * @param degres 
     */
    public static sin(degres: number): number {
        return Math.sin(degres / 180 * Math.PI);
    }

    /**
     * scales a rectangle @see Rect
     * @param rect 
     * @param scale 
     * @return new scaled rect
     */
    public static scaleRect(rect: Rect, scale: number): Rect {
        return new Rect(rect.x * scale, rect.y * scale, rect.width * scale, rect.height * scale);
    }

    /**
     * calculates intersection between two @see Rect
     * @param r1 
     * @param r2 
     * @return intersection rect or undefined
     */
    public static intersectRect(r1: Rect, r2: Rect): Rect {

        let xmin = Math.max(r1.x, r2.x);
        let xmax1 = r1.x + r1.width;
        let xmax2 = r2.x + r2.width;
        let xmax = Math.min(xmax1, xmax2);
        if (xmax > xmin) {
            let ymin = Math.max(r1.y, r2.y);
            let ymax1 = r1.y + r1.height;
            let ymax2 = r2.y + r2.height;
            let ymax = Math.min(ymax1, ymax2);
            if (ymax > ymin) {
                let x = xmin;
                let y = ymin;
                let width = xmax - xmin;
                let height = ymax - ymin;
                return new Rect(x, y, width, height);
            }
        }
        return undefined;
    }

    /**
     * calculates if @see Point is in @see Rect
     * @param point 
     * @param rect 
     * @return if intersects true else false
     */
    public static isIntersect(point: Point, rect: Rect): boolean {
        if (point.x >= rect.leftTop.x)
            if (point.x <= rect.rightTop.x)
                if (point.y >= rect.leftTop.y)
                    if (point.y <= rect.leftBottom.y)
                        return true;
        return false;


    }

    public static translatePoint(point:Point,x:number,y:number):Point{
        return new Point(point.x+x,point.y+y);
    }

    public static pointDif(point1: Point, point2: Point): number {
        return Math.sqrt((point1.x - point2.x) * (point1.x - point2.x) + (point1.y - point2.y) * (point1.y - point2.y));
      }
      public static roundPoint(point: Point): Point {
        return new Point(point.x.extRound(), point.y.extRound());
      }
      public static floorPoint(point: Point): Point {
    
        return new Point(point.x.extFloor(), point.y.extFloor());
      }
      public static intPoint(point:Point):Point{
        return new Point(point.x|0,point.y|0);
      }
    
      public static ceilPoint(point: Point): Point {
        return new Point(point.x.extCeil(), point.y.extCeil());
      }
    
      public static calculatePointsBetween(start:Point,end:Point,dif:number=5):Array<Point>{
        // console.log("********");
        // console.log(start,end,dif);
         let temps:Array<Point>=[];
         let prev=start;
         let cur=end;
         while(true){
           let d =this.pointDif(prev,cur);
           if(d>dif){
            let t = dif / d;
            let temp = new Point((1 - t) * prev.x + t * cur.x, (1 - t) * prev.y + t * cur.y);
            prev=temp;
            temps.push(temp);
           }else break;
         }
        // console.log(temps);
         return  temps;
    
      }
      public static calculateBetweenPoints(points: Array<Point>, dif: number = 5, close: boolean = true,round:boolean=false): Array<Point> {
        if(round)
        points.forEach(element => {
          element = this.roundPoint(element);
        });
        let pTemps: Array<Point> = [];
        if (points.length >= 1) {
          let prevPoint = points[0];
          pTemps.push(prevPoint);
          for (let i = 1; i < points.length; ++i) {
            let curPoint = points[i];
            if (curPoint.x == pTemps[pTemps.length - 1].x && curPoint.y == pTemps[pTemps.length - 1].y)
              continue;
            while (true) {
    
              let d = this.pointDif(curPoint, prevPoint);
              if (d > dif) {
                let t = dif / d;
                let temp = new Point((1 - t) * prevPoint.x + t * curPoint.x, (1 - t) * prevPoint.y + t * curPoint.y);
                if(round)temp=this.roundPoint(temp);            
                if(temp.x!=prevPoint.x || temp.y!=prevPoint.y)
                pTemps.push(temp);
                else 
                break;
                prevPoint = temp;
              } else {
                break;
              }
    
            }
            
          }
    
          if (close) {
            prevPoint = points[points.length - 1];
            let curPoint = points[0];
            if(prevPoint.x!=curPoint.x || prevPoint.y!=curPoint.y){
              pTemps.push(prevPoint);
              while (true) {
    
                let d = this.pointDif(curPoint, prevPoint);
                if (d > dif) {
                  let t = dif / d;
                  let temp = new Point((1 - t) * prevPoint.x + t * curPoint.x, (1 - t) * prevPoint.y + t * curPoint.y);
                  if(round)temp=this.roundPoint(temp);
                  if(temp.x!=prevPoint.x || temp.y!=prevPoint.y)
                  pTemps.push(temp);
                  else 
                  break;
                  prevPoint = temp;
    
                } else break;
    
              
            }
          }
           pTemps.push(curPoint) ;
          }
    
        }
        
        return pTemps;
      }
    
      public static circleToPolygon(centerPoint: Point, radius: number): Polygon {
    
    
    
        let points = [];
    
        for (let i = -180; i < 180; i += 1) {
          let point = new Point(centerPoint.x + radius * Math.cos(i * Math.PI / 180.0),
            centerPoint.y + radius * Math.sin(i * Math.PI / 180.0))
          points.push(point);
        }
        return new Polygon(points);
      }
    
      public static rectToPolygon(rect: Rect): Polygon {
        let points=[];
        points.push(new Point(rect.x,rect.y));
        points.push(new Point(rect.x,rect.y+rect.height));
        points.push(new Point(rect.x+rect.width,rect.y+rect.height));
        points.push(new Point(rect.x+rect.width,rect.y));
        return new Polygon(points);
      }

      public static rect2DToPolygon(rect:Rect2D):Polygon{
        let points=[];
        points.push(rect.leftTop);
        points.push(rect.leftBottom);
        points.push(rect.rightBottom);
        points.push(rect.rightTop);
        return new Polygon(points);
      }
}