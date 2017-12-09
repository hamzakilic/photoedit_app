
import { Point } from './point';



export class Rect2D {
  
  public leftTop: Point;
  public leftBottom: Point;
  public rightTop:Point;
  public rightBottom:Point;

  constructor(leftTop: Point,leftBottom: Point, rightTop: Point, rightBottom:Point) {      
      this.leftTop=leftTop;
      this.leftBottom=leftBottom;
      this.rightTop=rightTop;
      this.rightBottom=rightBottom;

  }

  /* public  get width():number {
        return  Math.abs(this.leftTop.x-this.rightTop.x);

  }
  public  get height(): number{
        return Math.abs(this.leftTop.y-this.leftBottom.y);
  } */


  
}