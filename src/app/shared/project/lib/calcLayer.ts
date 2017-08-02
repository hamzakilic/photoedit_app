import {Layer} from '../layer';
import {Point} from "../../../lib/draw/point";
import {Calc } from "../../../lib/calc";
import { Callback} from "../../../lib/callback";
export class CalcLayer{

    public static calculateTop(val: number, layer: Layer):Point {

    
    let pointX1 = new Point(layer.marginLeft, layer.marginTop);//left top
    let pointX2 = new Point(layer.marginLeft + layer.width, layer.marginTop);//right top
    let pointX3 = new Point(layer.marginLeft + layer.width, layer.marginTop + layer.height); //right bottom
    let pointX4 = new Point(layer.marginLeft, layer.marginTop + layer.height);//left bottom

    let center = new Point(layer.marginLeft + layer.width  / 2, layer.marginTop + layer.height  / 2)
    let pointX1Rotated = Calc.rotatePoint(pointX1, layer.rotateAngleDeg, center);//left top
    let pointX2Rotated = Calc.rotatePoint(pointX2, layer.rotateAngleDeg, center);//right top
    let pointX3Rotated = Calc.rotatePoint(pointX3, layer.rotateAngleDeg, center);//right bottom
    let pointX4Rotated = Calc.rotatePoint(pointX4, layer.rotateAngleDeg, center);//left bottom

    let points = [pointX1Rotated, pointX2Rotated, pointX3Rotated, pointX4Rotated];
    points.sort(this.comparePointsY);

    let point = new Point(points[0].X, val);
    
    let rotatedPoint = Calc.rotatePoint(point, -layer.rotateAngleDeg, new Point(center.X, center.Y + point.Y - points[0].Y));

    //left top point
    if (points[0].X == pointX1Rotated.X && points[0].Y == pointX1Rotated.Y) {
      return rotatedPoint;
     
    }
    //right top
    if (points[0].X == pointX2Rotated.X && points[0].Y == pointX2Rotated.Y) {
      return new Point(rotatedPoint.X-layer.width,rotatedPoint.Y);
      
    }
    //right bottom
    if (points[0].X == pointX3Rotated.X && points[0].Y == pointX3Rotated.Y) {
      return new Point(rotatedPoint.X-layer.width,rotatedPoint.Y-layer.height);
     
    }
     //left bottom
    if (points[0].X == pointX4Rotated.X && points[0].Y == pointX4Rotated.Y) {
      return new Point(rotatedPoint.X,rotatedPoint.Y-layer.height);
      
    }


  }
  private static comparePointsY(a: Point, b: Point): number {
    if (a.Y < b.Y)
      return -1;
    if (a.Y > b.Y)
      return 1;
    if (a.X < b.X)
      return -1;
    if (a.X > b.X)
      return 1;
    return 0;

  }

    private static comparePointsX(a: Point, b: Point): number {
       if (a.X < b.X)
      return -1;
    if (a.X > b.X)
      return 1;
    if (a.Y < b.Y)
      return -1;
    if (a.Y > b.Y)
      return 1;
   
    return 0;

  }



 public static calculateLeft(val: number, layer: Layer):Point {

    
    let pointX1 = new Point(layer.marginLeft, layer.marginTop);//left top
    let pointX2 = new Point(layer.marginLeft + layer.width, layer.marginTop);//right top
    let pointX3 = new Point(layer.marginLeft + layer.width, layer.marginTop + layer.height); //right bottom
    let pointX4 = new Point(layer.marginLeft, layer.marginTop + layer.height);//left bottom

    let center = new Point(layer.marginLeft + layer.width  / 2, layer.marginTop + layer.height  / 2)
    let pointX1Rotated = Calc.rotatePoint(pointX1, layer.rotateAngleDeg, center);//left top
    let pointX2Rotated = Calc.rotatePoint(pointX2, layer.rotateAngleDeg, center);//right top
    let pointX3Rotated = Calc.rotatePoint(pointX3, layer.rotateAngleDeg, center);//right bottom
    let pointX4Rotated = Calc.rotatePoint(pointX4, layer.rotateAngleDeg, center);//left bottom

    let points = [pointX1Rotated, pointX2Rotated, pointX3Rotated, pointX4Rotated];
    points.sort(this.comparePointsX);

    let point = new Point(val,points[0].Y);
    let newCenter=new Point(center.X+point.X - points[0].X, center.Y);
    let rotatedPoint = Calc.rotatePoint(point, -layer.rotateAngleDeg,newCenter);

    //left top point
    if (points[0].X == pointX1Rotated.X && points[0].Y == pointX1Rotated.Y) {
      return rotatedPoint;
     
    }
    //right top
    if (points[0].X == pointX2Rotated.X && points[0].Y == pointX2Rotated.Y) {
      return new Point(rotatedPoint.X-layer.width,rotatedPoint.Y);
      
    }
    //right bottom
    if (points[0].X == pointX3Rotated.X && points[0].Y == pointX3Rotated.Y) {
      return new Point(rotatedPoint.X-layer.width,rotatedPoint.Y-layer.height);
     
    }
     //left bottom
    if (points[0].X == pointX4Rotated.X && points[0].Y == pointX4Rotated.Y) {
      return new Point(rotatedPoint.X,rotatedPoint.Y-layer.height);
      
    }

  }
}