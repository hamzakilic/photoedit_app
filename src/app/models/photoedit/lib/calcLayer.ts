import {Layer} from '../layer';
import {Point} from "../../../lib/draw/point";
import {HMath } from "../../../lib/hMath";
import { Callback} from "../../../lib/callback";
export class CalcLayer{

    public static calculateTop(val: number, layer: Layer):Point {

    
    let pointX1 = new Point(layer.marginLeft, layer.marginTop);//left top
    let pointX2 = new Point(layer.marginLeft + layer.width, layer.marginTop);//right top
    let pointX3 = new Point(layer.marginLeft + layer.width, layer.marginTop + layer.height); //right bottom
    let pointX4 = new Point(layer.marginLeft, layer.marginTop + layer.height);//left bottom

    let center = new Point(layer.marginLeft + layer.width  / 2, layer.marginTop + layer.height  / 2)
    let pointX1Rotated = HMath.rotatePoint(pointX1, layer.rotateAngleDeg, center);//left top
    let pointX2Rotated = HMath.rotatePoint(pointX2, layer.rotateAngleDeg, center);//right top
    let pointX3Rotated = HMath.rotatePoint(pointX3, layer.rotateAngleDeg, center);//right bottom
    let pointX4Rotated = HMath.rotatePoint(pointX4, layer.rotateAngleDeg, center);//left bottom

    let points = [pointX1Rotated, pointX2Rotated, pointX3Rotated, pointX4Rotated];
    points.sort(this.comparePointsY);

    let point = new Point(points[0].x, val);
    
    let rotatedPoint = HMath.rotatePoint(point, -layer.rotateAngleDeg, new Point(center.x, center.y + point.y - points[0].y));

    //left top point
    if (points[0].x == pointX1Rotated.x && points[0].y == pointX1Rotated.y) {
      return rotatedPoint;
     
    }
    //right top
    if (points[0].x == pointX2Rotated.x && points[0].y == pointX2Rotated.y) {
      return new Point(rotatedPoint.x-layer.width,rotatedPoint.y);
      
    }
    //right bottom
    if (points[0].x == pointX3Rotated.x && points[0].y == pointX3Rotated.y) {
      return new Point(rotatedPoint.x-layer.width,rotatedPoint.y-layer.height);
     
    }
     //left bottom
    if (points[0].x == pointX4Rotated.x && points[0].y == pointX4Rotated.y) {
      return new Point(rotatedPoint.x,rotatedPoint.y-layer.height);
      
    }


  }
  private static comparePointsY(a: Point, b: Point): number {
    if (a.y < b.y)
      return -1;
    if (a.y > b.y)
      return 1;
    if (a.x < b.x)
      return -1;
    if (a.x > b.x)
      return 1;
    return 0;

  }

    private static comparePointsX(a: Point, b: Point): number {
       if (a.x < b.x)
      return -1;
    if (a.x > b.x)
      return 1;
    if (a.y < b.y)
      return -1;
    if (a.y > b.y)
      return 1;
   
    return 0;

  }



 public static calculateLeft(val: number, layer: Layer):Point {

    
    let pointX1 = new Point(layer.marginLeft, layer.marginTop);//left top
    let pointX2 = new Point(layer.marginLeft + layer.width, layer.marginTop);//right top
    let pointX3 = new Point(layer.marginLeft + layer.width, layer.marginTop + layer.height); //right bottom
    let pointX4 = new Point(layer.marginLeft, layer.marginTop + layer.height);//left bottom

    let center = new Point(layer.marginLeft + layer.width  / 2, layer.marginTop + layer.height  / 2)
    let pointX1Rotated = HMath.rotatePoint(pointX1, layer.rotateAngleDeg, center);//left top
    let pointX2Rotated = HMath.rotatePoint(pointX2, layer.rotateAngleDeg, center);//right top
    let pointX3Rotated = HMath.rotatePoint(pointX3, layer.rotateAngleDeg, center);//right bottom
    let pointX4Rotated = HMath.rotatePoint(pointX4, layer.rotateAngleDeg, center);//left bottom

    let points = [pointX1Rotated, pointX2Rotated, pointX3Rotated, pointX4Rotated];
    points.sort(this.comparePointsX);

    let point = new Point(val,points[0].y);
    let newCenter=new Point(center.x+point.x - points[0].x, center.y);
    let rotatedPoint = HMath.rotatePoint(point, -layer.rotateAngleDeg,newCenter);

    //left top point
    if (points[0].x == pointX1Rotated.x && points[0].y == pointX1Rotated.y) {
      return rotatedPoint;
     
    }
    //right top
    if (points[0].x == pointX2Rotated.x && points[0].y == pointX2Rotated.y) {
      return new Point(rotatedPoint.x-layer.width,rotatedPoint.y);
      
    }
    //right bottom
    if (points[0].x == pointX3Rotated.x && points[0].y == pointX3Rotated.y) {
      return new Point(rotatedPoint.x-layer.width,rotatedPoint.y-layer.height);
     
    }
     //left bottom
    if (points[0].x == pointX4Rotated.x && points[0].y == pointX4Rotated.y) {
      return new Point(rotatedPoint.x,rotatedPoint.y-layer.height);
      
    }

  }
}