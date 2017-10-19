import { element } from 'protractor';
import { Rect } from './../../../lib/draw/rect';
import { Polygon } from './../../../lib/draw/polygon';
import { Point } from './../../../lib/draw/point';
import { Graphics } from './../../../lib/graphics';
export class Helper {

  static createStrokeStyle(graphics: Graphics, then: any) {

    let a = [255, 255, 255, 255]
    let b = [0, 0, 0, 255];
    let array = [];
    for (let i = 0; i < 6; ++i) {
      a.forEach(item => array.push(item));
      a.forEach(item => array.push(item));
      a.forEach(item => array.push(item));
      a.forEach(item => array.push(item));
      a.forEach(item => array.push(item));
      a.forEach(item => array.push(item));

      b.forEach(item => array.push(item));
      b.forEach(item => array.push(item));
      b.forEach(item => array.push(item));
      b.forEach(item => array.push(item));
      b.forEach(item => array.push(item));
      b.forEach(item => array.push(item));
    }
    for (let i = 0; i < 6; ++i) {
      b.forEach(item => array.push(item));
      b.forEach(item => array.push(item));
      b.forEach(item => array.push(item));
      b.forEach(item => array.push(item));
      b.forEach(item => array.push(item));
      b.forEach(item => array.push(item));

      a.forEach(item => array.push(item));
      a.forEach(item => array.push(item));
      a.forEach(item => array.push(item));
      a.forEach(item => array.push(item));
      a.forEach(item => array.push(item));
      a.forEach(item => array.push(item));
    }


    let data = new Uint8ClampedArray(array);

    let imageData = new ImageData(data, 12, 12);

    createImageBitmap(imageData).then((bitmap) => {

      then(bitmap);


    }).catch((ex) => {
      //TODO: exception durumu handle edilmeli
    });


  }
  public static distinctPoints(points:Array<Point>){
    let i=0;
    while(i<points.length-1){
      if(points[i].X==points[i+1].X && points[i].Y == points[i+1].Y)
      points.splice(i,1);
      else i++;
    }
  }

  public static pointDif(point1: Point, point2: Point): number {
    return Math.sqrt((point1.X - point2.X) * (point1.X - point2.X) + (point1.Y - point2.Y) * (point1.Y - point2.Y));
  }
  public static roundPoint(point: Point): Point {
    return new Point(point.X.extRound(), point.Y.extRound());
  }
  public static floorPoint(point: Point): Point {

    return new Point(point.X.extFloor(), point.Y.extFloor());
  }
  public static intPoint(point:Point):Point{
    return new Point(point.X|0,point.Y|0);
  }

  public static ceilPoint(point: Point): Point {
    return new Point(point.X.extCeil(), point.Y.extCeil());
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
        let temp = new Point((1 - t) * prev.X + t * cur.X, (1 - t) * prev.Y + t * cur.Y);
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
        if (curPoint.X == pTemps[pTemps.length - 1].X && curPoint.Y == pTemps[pTemps.length - 1].Y)
          continue;
        while (true) {

          let d = this.pointDif(curPoint, prevPoint);
          if (d > dif) {
            let t = dif / d;
            let temp = new Point((1 - t) * prevPoint.X + t * curPoint.X, (1 - t) * prevPoint.Y + t * curPoint.Y);
            if(round)temp=this.roundPoint(temp);            
            if(temp.X!=prevPoint.X || temp.Y!=prevPoint.Y)
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
        if(prevPoint.X!=curPoint.X || prevPoint.Y!=curPoint.Y){
          pTemps.push(prevPoint);
          while (true) {

            let d = this.pointDif(curPoint, prevPoint);
            if (d > dif) {
              let t = dif / d;
              let temp = new Point((1 - t) * prevPoint.X + t * curPoint.X, (1 - t) * prevPoint.Y + t * curPoint.Y);
              if(round)temp=this.roundPoint(temp);
              if(temp.X!=prevPoint.X || temp.Y!=prevPoint.Y)
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
      let point = new Point(centerPoint.X + radius * Math.cos(i * Math.PI / 180.0),
        centerPoint.Y + radius * Math.sin(i * Math.PI / 180.0))
      points.push(point);
    }
    return new Polygon(points);
  }

  public static rectToPolygon(rect: Rect): Polygon {
    let points = [new Point(rect.x, rect.y),
    new Point(rect.x, rect.y + rect.height),
    new Point(rect.x + rect.width, rect.y + rect.height),
    new Point(rect.x + rect.width, rect.y)];
    return new Polygon(points);
  }


}