
import { Point } from './point';



export class Rect2D {
  
  public leftTop: Point;
  public leftBottom: Point;
  public rightTop:Point;
  public rightBottom:Point;

  constructor(leftTop: Point,leftBottom: Point, rightTop: Point, rightBottom:Point) {      
      

  }

  public  get width():number {
        return  Math.abs(this.leftTop.X-this.rightTop.X);

  }
  public  get height(): number{
        return Math.abs(this.leftTop.Y-this.leftBottom.Y);
  }


  
}