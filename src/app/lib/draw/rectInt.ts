import { Point } from './point';

export class RectInt {
  private _width: number;
  private _height: number;
  private _x: number;
  private _y: number;

  constructor(x: number,y: number,width: number,height: number) {
      this._x = x.extToInt32();
      this._y = y.extToInt32();
      this._width = width.extToInt32();
      this._height  = height.extToInt32();

  }
  public get x(){return this._x;}
  public set x(val:number){this.x=val.extToInt32()};
  public get y(){return this._y;};
  public set y(val:number){this._y=val.extToInt32()};
  public get width(){return this._width};
  public set width(val:number){this._width=val.extToInt32()};
  public get height(){return this._height};
  public set height(val:number){this._height=val.extToInt32()};

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
