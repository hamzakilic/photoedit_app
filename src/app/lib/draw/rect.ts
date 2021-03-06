import { Point } from './point';

export class Rect {
  public width: number;
  public height: number;
  public x: number;
  public y: number;

  constructor(x: number,y: number,width: number,height: number) {
      this.x = x;
      this.y = y;
      this.width = width;
      this.height  = height;

  }
  public clone():Rect{
    return new Rect(this.x,this.y,this.width,this.height);
  }


  public get leftTop():Point{
    return new Point(this.x,this.y);
  }
  public get leftBottom():Point{
    return new Point(this.x,this.y+this.height);
  }
  public get rightTop():Point{
    return new Point(this.x+this.width,this.y);
  }

  public get rightBottom():Point{
    return new Point(this.x+this.width,this.y+this.height);
  }

  public toString(){
    return `{x:${this.x},y:${this.y},w:${this.width},h:${this.height}}`;
  }
}
