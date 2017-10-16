
import { Calc } from './../../lib/calc';

import { Rect } from './../../lib/draw/rect';
import { Graphics } from './../../lib/graphics';
import { Polygon } from '../../lib/draw/polygon';
import { Layer } from './layer';

import { Callback } from '../../lib/callback';
import { HImage } from '../../lib/image';


import { Point } from '../../lib/draw/point';
import { RotationHelper, RotationMove } from './lib/rotationHelper';
import { Helper } from './lib/helper';





abstract class Shape {

  protected strokeStyle: any = "#FFF";
  protected fillStyle = "rgba(" + 10 + "," + 10 + "," + 50 + "," + (100 / 255) + ")";

  abstract render(graphics: Graphics);
  abstract mouseDown(point: Point): boolean;
  abstract mouseMove(point: Point): boolean;
  abstract mouseUp(point: Point);
  abstract toPolygon(): Polygon;
  abstract doubleClick(point: Point);

  /**
   *
   */
  constructor(graphics: Graphics) {
    Helper.createStrokeStyle(graphics, (bitmap) => {
      let gradient = graphics.createPattern(bitmap, "");
      this.strokeStyle = gradient;
    });

  }





}
class ShapeRect extends Shape {
  private _startPoint: Point;
  private _endPoint: Point;
  private _isConstructing = true;
  constructor(point: Point, graphics: Graphics) {
    super(graphics);
    this._startPoint = point;
    this._endPoint = point;

  }
  render(graphics: Graphics) {

    graphics.lineWidth(2);
    let sxmin = Math.min(this._startPoint.X, this._endPoint.X);
    let symin = Math.min(this._startPoint.Y, this._endPoint.Y);
    let exmax = Math.max(this._startPoint.X, this._endPoint.X);
    let eymax = Math.max(this._startPoint.Y, this._endPoint.Y);

    let rect = new Rect(sxmin, symin, exmax - sxmin, eymax - symin);
    graphics.fillRect(rect, this.fillStyle);
    graphics.drawRect(rect, this.strokeStyle);
    // graphics.lineWidth(1);
    // graphics.drawRect(new Rect(rect.x+1,rect.y+1,rect.width-2,rect.height-2), "#000");
  }

  mouseMove(point: Point): boolean {
    if (point)
      if (this._isConstructing) {
        this._endPoint = point;

        return true;
      }
    return false;
  }

  mouseUp(point: Point): boolean {
    this._isConstructing = false;
    return true;
  }
  mouseDown(point: Point): boolean {
    return true;
  }
  doubleClick(point: Point): boolean {
    return false;
  }
  toPolygon(): Polygon {
    let sxmin = Math.min(this._startPoint.X, this._endPoint.X);
    let symin = Math.min(this._startPoint.Y, this._endPoint.Y);
    let exmax = Math.max(this._startPoint.X, this._endPoint.X);
    let eymax = Math.max(this._startPoint.Y, this._endPoint.Y);

    let rect = new Rect(sxmin, symin, exmax - sxmin, eymax - symin);
    return Helper.rectToPolygon(rect);
  }
}

class ShapeEllipse extends Shape {
  private _isConstructing = true;

  private _startPoint: Point;
  private _endPoint: Point;
  constructor(point: Point, graphics: Graphics) {
    super(graphics);

    this._startPoint = point;
    this._endPoint = point;

  }
  render(graphics: Graphics) {

    let sxmin = Math.min(this._startPoint.X, this._endPoint.X);
    let symin = Math.min(this._startPoint.Y, this._endPoint.Y);
    let exmax = Math.max(this._startPoint.X, this._endPoint.X);
    let eymax = Math.max(this._startPoint.Y, this._endPoint.Y);
    let width = exmax - sxmin;
    let height = eymax - symin;

    let centerX = width / 2 + sxmin;
    let centerY = height / 2 + symin;

    graphics.beginPath();
    graphics.lineWidth(2);
    graphics.strokeStyle(this.strokeStyle);
    graphics.fillStyle(this.fillStyle);
    graphics.ellipse(centerX, centerY, width / 2, height / 2, 0, 0, 2 * Math.PI);

    graphics.fill();
    graphics.stroke();
  }

  mouseDown(point: Point): boolean {
    return true;
  }
  mouseMove(point: Point): boolean {
    if (point)
      if (this._isConstructing) {
        this._endPoint = point;

        return true;
      }
    return false;
  }

  mouseUp(point: Point): boolean {
    this._isConstructing = false;
    return true;
  }
  doubleClick(point: Point): boolean {
    return false;
  }
  toPolygon(): Polygon {
    let sxmin = Math.min(this._startPoint.X, this._endPoint.X);
    let symin = Math.min(this._startPoint.Y, this._endPoint.Y);
    let exmax = Math.max(this._startPoint.X, this._endPoint.X);
    let eymax = Math.max(this._startPoint.Y, this._endPoint.Y);
    let width = exmax - sxmin;
    let height = eymax - symin;

    let centerX = width / 2 + sxmin;
    let centerY = height / 2 + symin;
    let centerPoint = new Point(centerX, centerY);
    let startPoint = new Point(sxmin, symin);
    let points = [];

    for (let i = -180; i < 180; i += 1) {
      let point = new Point(centerX + width / 2 * Math.cos(i * Math.PI / 180.0),
        centerY + height / 2 * Math.sin(i * Math.PI / 180.0))
      points.push(point);
    }
    return new Polygon(points);
  }


}

class ShapeLasso extends Shape {
  protected _isConstructing = true;
  protected points: Array<Point>;

  constructor(point: Point, graphics: Graphics) {
    super(graphics);
    this.points = [];
    if (point)
      this.points.push(point);

  }
  render(graphics: Graphics) {

    if (this.points.length > 2) {
      graphics.beginPath();
      graphics.strokeStyle(this.strokeStyle);
      graphics.fillStyle(this.fillStyle);
      graphics.lineWidth(2);
      graphics.moveTo(this.points[0].X, this.points[0].Y);
      let i = 1;
      for (i = 1; i < this.points.length - 2; ++i) {

        var xc = (this.points[i].X + this.points[i + 1].X) / 2;
        var yc = (this.points[i].Y + this.points[i + 1].Y) / 2;
        graphics.quadraticCurveTo(this.points[i].X, this.points[i].Y, xc, yc);
      }

      graphics.quadraticCurveTo(this.points[i + 1].X, this.points[i + 1].Y, this.points[0].X, this.points[0].Y);//close curve
      graphics.closePath();
      graphics.stroke();
      graphics.fill();
    }
  }

  mouseDown(point: Point): boolean {
    return true;
  }
  mouseMove(point: Point): boolean {
    if (point)
      if (this._isConstructing) {

        this.calculateBetweenPoints(point).forEach(item => this.points.push(item));
        this.points.push(point);


        return true;
      }
    return false;
  }

  mouseUp(point: Point): boolean {
    this._isConstructing = false;
    if (this.points.length > 1)
      this.calculateBetweenPoints(this.points[0]).forEach(item => this.points.push(item));
    return true;
  }

  doubleClick(point: Point): boolean {
    return false;
  }

  toPolygon(): Polygon {
    let points = [];
    this.points.forEach(item => points.push(new Point(item.X, item.Y)));
    return new Polygon(points);
  }

  protected calculateBetweenPoints(curPoint: Point): Array<Point> {
    let pTemps = [];
    if (this.points.length >= 1) {

      let prevPoint = this.points[this.points.length - 1];
      while (true) {

        let d = Math.sqrt((curPoint.X - prevPoint.X) * (curPoint.X - prevPoint.X) + (curPoint.Y - prevPoint.Y) * (curPoint.Y - prevPoint.Y));
        if (d > 5) {
          let t = 5 / d;
          let temp = new Point((1 - t) * prevPoint.X + t * curPoint.X, (1 - t) * prevPoint.Y + t * curPoint.Y);
          pTemps.push(temp);
          prevPoint = temp;
        } else break;
      }

    }
    return pTemps;
  }
}

class ShapePolygon extends ShapeLasso {
  /**
   *
   */
  constructor(point: Point, graphics: Graphics) {
    super(point, graphics);
    //algorithma için bir tane fazladan ekledik
    //this.point[this.point.length-1]=point
    //mousemove için çalışsın diye
    this.points.push(point);

  }

  render(graphics: Graphics) {
    if (this.points.length > 1) {
      graphics.beginPath();

      /*  graphics.createLinearGradient(0,0,50,0);
      strokeStyle.addColorStop(0,'rgb(0,0,0)');
      strokeStyle.addColorStop(1,'rgb(255,255,255)'); */
      graphics.strokeStyle(this.strokeStyle);
      graphics.fillStyle(this.fillStyle);
      graphics.lineWidth(2);
      graphics.beginPath();
      graphics.moveTo(this.points[0].X, this.points[0].Y);
      let i = 1;
      for (i = 1; i < this.points.length; ++i) {
        graphics.drawLine2(this.points[i].X.extCeil(), this.points[i].Y.extCeil());

      }
      graphics.closePath();
      graphics.stroke();
      graphics.fill();
    }
  }


  mouseMove(point: Point): boolean {
    if (point)
      if (this._isConstructing) {

        this.points[this.points.length - 1] = point;


        return true;
      }
    return false;
  }

  mouseDown(point: Point): boolean {
    if (!this._isConstructing) {
      this._isConstructing = true;
      this.points = [];
      this.points.push(point);
      this.points.push(point);//add twice
      return true;
    }
    return false;
  }

  mouseUp(point: Point): boolean {

    if (this.points.length > 1) {
      this.points[this.points.length - 1] = point;
      this.points.push(point);
      return false;
    }
    return true;
  }
  doubleClick(point: Point) {
    if (this._isConstructing) {
      this._isConstructing = false;
      this.points[this.points.length - 1] = point;
      return true;
    }
    return false;
  }

  toPolygon(): Polygon {
    let points = [];
    this.points.forEach(item => points.push(new Point(item.X, item.Y)));
    return new Polygon(points);
  }

}


export class LayerSelect extends Layer {

  static readonly SubTypeRect = "rect";
  static readonly SubTypeEllipse = "ellipse";
  static readonly SubTypePolygon = "polygon";
  static readonly SubTypeLasso = "lasso";


  static readonly ClipSelf = "self";
  static readonly ClipUnion = "union";
  static readonly ClipIntersect = "intersect";
  static readonly ClipExclude = "exclude";
  static readonly ClipXor = "xor";


  private _polygons: Array<Polygon>;
  isFinishedContructing: boolean
  animation: any;
  private _shapeType: string;
  private _shape: Shape;
  private _clipMode: string;

  constructor(width: number, height: number, left: number, top: number) {
    super("select layer");

    this.keepRatio = false;
    this.scaleView = false;

    this.width = width;
    this.height = height;
    this.marginLeft = left;
    this.marginTop = top;
    this.isSelected = true;
    this.showSelected = false;
    this.canRotate = false;
    this.isFinishedContructing = false;
    this._polygons = [];
    this._clipMode = LayerSelect.ClipSelf;
    Helper.createStrokeStyle(this.graphics, (bitmap) => {
      this.strokeStyle = this.graphics.createPattern(bitmap, "repeat");
    });

  }
  public get polygons():Array<Polygon>{
    return this._polygons;
  }

  public set clipMode(type: string) {
    this._clipMode = type;
  }

  public get clipMode(): string {
    return this._clipMode;
  }
  public set shapeType(type: string) {
    this._shapeType = type;
  }

  public get classes(): any {
    return { clayerEmpty: true };
  }
  public mouseDown(event: MouseEvent,scroll:Point) {
    this.stopAnimation();
    super.mouseDown(event,scroll);
    switch (this._shapeType) {
      case LayerSelect.SubTypeRect:
        let point = this.normalizeMouseEvent(event,scroll);
        if (point) {
          this._shape = new ShapeRect(point, this.graphics);
        }
        break;
      case LayerSelect.SubTypeEllipse:
        point = this.normalizeMouseEvent(event,scroll);
        if (point) {
          this._shape = new ShapeEllipse(point, this.graphics);
        }
        break;
      case LayerSelect.SubTypeLasso:
        point = this.normalizeMouseEvent(event,scroll);
        if (point) {
          this._shape = new ShapeLasso(point, this.graphics);
        }
        break;
      case LayerSelect.SubTypePolygon:
        point = this.normalizeMouseEvent(event,scroll);
        if (point && !(this._shape instanceof ShapePolygon)) {
          this._shape = new ShapePolygon(point, this.graphics);
        }
        else this._shape.mouseDown(this.normalizeMouseEvent(event,scroll));
        break;

    }

  }
  public mouseMove(event: MouseEvent,scroll:Point) {
    if (this._shape) {
      if (this._shape.mouseMove(this.normalizeMouseEvent(event,scroll)))//if something changed
        this.render();//then render again
    }



  }



  public mouseUp(event: MouseEvent,scroll:Point) {
    
    super.mouseUp(event,scroll);
    if (this._shape)
      if (this._shape.mouseUp(this.normalizeMouseEvent(event,scroll))) {
        this.preparePolygon();
        this._shape = undefined;
        this.startAnimation();
      }

  }

  public doubleClick(event: any,scroll:Point) {
    this.stopAnimation();
    super.doubleClick(event,scroll);
    if (this._shape) {
      if (this._shape.doubleClick(this.normalizeMouseEvent(event,scroll))) {
        this.preparePolygon();
        this._shape = undefined;
        
        this.startAnimation();
      }
    }

  }

  private preparePolygon() {
    switch (this._clipMode) {
      case LayerSelect.ClipSelf:
        this._polygons = [];
        this._polygons.push(this._shape.toPolygon());
        break;
      case LayerSelect.ClipUnion:
        if (this._polygons.length >= 1) {
          let currentPolygon = this._polygons[0];
          let unionPolygon = currentPolygon.union(this._shape.toPolygon());
          this._polygons = [];
          this._polygons.push(unionPolygon);
        } else this._polygons.push(this._shape.toPolygon());

        break;
      case LayerSelect.ClipExclude:
        if (this._polygons.length >= 1) {
          let currentPolygon = this._polygons[0];
          let unionPolygon = currentPolygon.exclude(this._shape.toPolygon());
          this._polygons = [];
          this._polygons.push(unionPolygon);
        } else this._polygons.push(this._shape.toPolygon());

        break;
      case LayerSelect.ClipIntersect:
        if (this._polygons.length >= 1) {
          let currentPolygon = this._polygons[0];
          let unionPolygon = currentPolygon.intersect(this._shape.toPolygon());
          this._polygons = [];
          this._polygons.push(unionPolygon);
        } else this._polygons.push(this._shape.toPolygon());

        break;
      case LayerSelect.ClipXor:
        if (this._polygons.length >= 1) {
          let currentPolygon = this._polygons[0];
          let unionPolygon = currentPolygon.xor(this._shape.toPolygon());
          this._polygons = [];
          this._polygons.push(unionPolygon);
        } else this._polygons.push(this._shape.toPolygon());

        break;
      default:
        break;
    }
  }



  protected strokeStyle: any = "#FFF";
  public fillStyle = "rgba(" + 10 + "," + 10 + "," + 50 + "," + (100 / 255) + ")";

  renderPolygon(polygon: Polygon, animate: boolean) {

    let points = polygon.points;
    if (points.length > 0) {
      this.graphics.lineWidth(2);
      this.graphics.strokeStyle(this.strokeStyle);
      if (!animate) {
        this.graphics.beginPath();
        this.graphics.moveTo(points[0].X, points[0].Y);
        for (let i = 1; i < points.length; ++i) {
          this.graphics.drawLine2(points[i].X, points[i].Y);
        }
        this.graphics.closePath();
        this.graphics.stroke();
      }else{
        points= Helper.calculateBetweenPoints(points)
        let totalParts = points.length;
        
  
        
        let dividen = this.frameCounter % totalParts;
        let x = 1;
        for (x = 1; x < totalParts - 1; x += 1) {
          if ((x + dividen) % 2 == 0) { 
                    
          this.graphics.drawLine(points[x].X,points[x].Y,points[x+1].X,points[x+1].Y,2,this.strokeStyle);
        }
      }
      
        
        
        
        
      }
    }

  }

  public render(animate: boolean = false): void {

    this.graphics.save();
    let rect = new Rect(0, 0, this.width, this.height);
    this.graphics.clearRect(rect);
    this._polygons.forEach((item) => this.renderPolygon(item, animate));
    if (this._shape)
      this._shape.render(this.graphics);
    this.graphics.restore();
    if(animate){
      this.frameCounter++;
      this.scheduleAnimation();
    }


  }
  protected frameCounter = 0;


  protected scheduleAnimation() {
    setTimeout(() => {
      if (this.animation)
        this.animation = window.requestAnimationFrame(() => this.render(true));
    }, 1000 / 3);
  }


  public dispose() {
    this.stopAnimation();

  }


  protected startAnimation() {
    if (!this.animation){
      this.frameCounter=0;
      this.animation = window.requestAnimationFrame(() => this.render(true));
    }
  }
  protected stopAnimation() {
    if (this.animation)
      window.cancelAnimationFrame(this.animation);
    this.animation = undefined;
  }






  /*
  protected renderAnimation():void{
    
    if(this.graphics){
      
    this.graphics.save();
    let rect= new Rect(0,0,this.width,this.height);
    this.graphics.clearRect(rect);
    
    this.graphics.beginPath();
    let splitSize=5;
    let totalParts= Math.ceil(this.width/splitSize)*2+Math.ceil(this.height/splitSize)*2;
    let lh=4;//linewidth
    
    this.frameCounter++;
    let dividen=this.frameCounter%totalParts;
    for(let x=0;x<totalParts;x+=1){     
      
        if((x+dividen)%2==0){
        if(x*splitSize<this.width)          
           this.graphics.drawLine(x*splitSize,0,x*splitSize+splitSize,0,lh,this.strokeStyle);
        else
        if(x*splitSize<this.width+this.height)
          this.graphics.drawLine(this.width,x*splitSize-this.width,this.width,x*splitSize+splitSize-this.width,lh,this.strokeStyle);
        else
        if(x*splitSize<this.width+this.height+this.width)
          this.graphics.drawLine(this.width+this.height+this.width-x*splitSize,this.height,this.width+this.height+this.width-x*splitSize+splitSize,this.height,lh,this.strokeStyle);
        else
          this.graphics.drawLine(0,this.width+this.height+this.width+this.height-x*splitSize,0,this.width+this.height+this.width+this.height-x*splitSize+splitSize,lh,this.strokeStyle);
        
        
      }
      
      
    }
    this.graphics.restore();
  }
 
  
   this.scheduleAnimation();
 
  }
 
   */




}


