
import { ImageProcessSimilarColors } from './../../lib/imageprocess/imageProcessSimilarColors';

import { HMath } from './../../lib/hMath';

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
  
  protected _selectedLayer:Layer;
  //todo: buradaki selectedlayer'a gerekyok
  constructor(graphics: Graphics,selectedLayer:Layer) {
    this._selectedLayer = selectedLayer;
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
  constructor(point: Point, graphics: Graphics,selectedLayer:Layer) {
    super(graphics,selectedLayer);
    this._startPoint = point;
    this._endPoint = point;

  }
  render(graphics: Graphics) {
   // console.log(this._selectedLayer.scale);
    let linewidth=this._selectedLayer.scale<1?1:1;
    graphics.lineWidth(linewidth);
    let sxmin = Math.min(this._startPoint.x, this._endPoint.x);
    let symin = Math.min(this._startPoint.y, this._endPoint.y);
    let exmax = Math.max(this._startPoint.x, this._endPoint.x);
    let eymax = Math.max(this._startPoint.y, this._endPoint.y);

    let translate=linewidth%2==1?0.5:0;
    let rect = new Rect(sxmin+translate, symin+translate, exmax - sxmin, eymax - symin);
    //console.log(sxmin,symin,exmax-sxmin,eymax-symin, rect.toString())
    graphics.fillRect(rect, this.fillStyle);
   

    //graphics.strokeStyle(this.strokeStyle);
    
    graphics.drawRect(rect,this.strokeStyle);
    
  
    //graphics.stroke();
    
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
    let sxmin = Math.min(this._startPoint.x, this._endPoint.x);
    let symin = Math.min(this._startPoint.y, this._endPoint.y);
    let exmax = Math.max(this._startPoint.x, this._endPoint.x);
    let eymax = Math.max(this._startPoint.y, this._endPoint.y);

    let rect = new Rect(sxmin, symin, exmax - sxmin, eymax - symin);
    return HMath.rectToPolygon(rect);
  }
}

class ShapeEllipse extends Shape {
  private _isConstructing = true;

  private _startPoint: Point;
  private _endPoint: Point;
  constructor(point: Point, graphics: Graphics,selectedLayer:Layer) {
    super(graphics,selectedLayer);

    this._startPoint = point;
    this._endPoint = point;

  }
  render(graphics: Graphics) {

    let sxmin = Math.min(this._startPoint.x, this._endPoint.x);
    let symin = Math.min(this._startPoint.y, this._endPoint.y);
    let exmax = Math.max(this._startPoint.x, this._endPoint.x);
    let eymax = Math.max(this._startPoint.y, this._endPoint.y);
    let width = exmax - sxmin;
    let height = eymax - symin;

    let centerX = width / 2 + sxmin;
    let centerY = height / 2 + symin;

    graphics.beginPath();
    let linewidth=this._selectedLayer.scale<1?1:1
    graphics.lineWidth(linewidth);
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
    let sxmin = Math.min(this._startPoint.x, this._endPoint.x);
    let symin = Math.min(this._startPoint.y, this._endPoint.y);
    let exmax = Math.max(this._startPoint.x, this._endPoint.x);
    let eymax = Math.max(this._startPoint.y, this._endPoint.y);
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

  constructor(point: Point, graphics: Graphics,selectedLayer:Layer) {
    super(graphics,selectedLayer);
    this.points = [];
    if (point)
      this.points.push(point);

  }
  render(graphics: Graphics) {

    if (this.points.length > 2) {
      graphics.beginPath();
      graphics.strokeStyle(this.strokeStyle);
      graphics.fillStyle(this.fillStyle);
      let linewidth=this._selectedLayer.scale<1?1:1
      graphics.lineWidth(linewidth);
      graphics.moveTo(this.points[0].x, this.points[0].y);
      let i = 1;
      for (i = 1; i < this.points.length - 2; ++i) {

        var xc = (this.points[i].x + this.points[i + 1].x) / 2;
        var yc = (this.points[i].y + this.points[i + 1].y) / 2;
        graphics.quadraticCurveTo(this.points[i].x, this.points[i].y, xc, yc);
      }

      graphics.quadraticCurveTo(this.points[i + 1].x, this.points[i + 1].y, this.points[0].x, this.points[0].y);//close curve
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
    this.points.forEach(item => points.push(new Point(item.x, item.y)));
    return new Polygon(points);
  }

  protected calculateBetweenPoints(curPoint: Point): Array<Point> {
    let pTemps = [];
    if (this.points.length >= 1) {

      let prevPoint = this.points[this.points.length - 1];
      while (true) {

        let d = Math.sqrt((curPoint.x - prevPoint.x) * (curPoint.x - prevPoint.x) + (curPoint.y - prevPoint.y) * (curPoint.y - prevPoint.y));
        if (d > 5) {
          let t = 5 / d;
          let temp = new Point((1 - t) * prevPoint.x + t * curPoint.x, (1 - t) * prevPoint.y + t * curPoint.y);
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
  constructor(point: Point, graphics: Graphics,selectedLayer:Layer) {
    super(point, graphics,selectedLayer);
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
      let linewidth=this._selectedLayer.scale<1?1:1
      graphics.lineWidth(linewidth);
      graphics.beginPath();
      graphics.moveTo(this.points[0].x, this.points[0].y);
      let i = 1;
      for (i = 1; i < this.points.length; ++i) {
        graphics.drawLine2(this.points[i].x.extCeil(), this.points[i].y.extCeil());

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
    this.points.forEach(item => points.push(new Point(item.x, item.y)));
    return new Polygon(points);
  }

}

/**
 * magic wand islemini bu sınıf ile yaptım
 * bu yüzden selectedlayer ihtiyacı doğru
 */
class ShapeMagicWand extends Shape{

  polygon:Polygon;
  
  constructor(point: Point, graphics: Graphics,selectedLayer:Layer) {
    super(graphics,selectedLayer);
    
    this.polygon=new Polygon();
    

  }

  render(graphics: Graphics) {
    if (this.polygon) {
      graphics.drawPolygon(this.polygon,true);      
    }
  }


  mouseMove(point: Point): boolean {
   
    return false;
  }

  mouseDown(point: Point): boolean {
      let pointTemp=new Point(point.x-this._selectedLayer.marginLeft,point.y-this._selectedLayer.marginTop);
      let center=new Point(this._selectedLayer.width/2,this._selectedLayer.height/2);
      let rPoint= HMath.rotatePoint(pointTemp,-this._selectedLayer.rotateAngleDeg,center);
      rPoint=new Point(rPoint.x.extFloor(),rPoint.y.extFloor());
      let color= this._selectedLayer.getPixel(rPoint.x,rPoint.y);
      
      let similarRegions=ImageProcessSimilarColors.process(this._selectedLayer,this._selectedLayer.getImage(),color,rPoint,4);
      if(similarRegions.length>0){
        let polygon=similarRegions[0];
         let rotatedPoints= polygon.points.map((p)=>{
          let rotatedP=HMath.rotatePoint(p,this._selectedLayer.rotateAngleDeg,center);
          rotatedP.x +=this._selectedLayer.marginLeft;
          rotatedP.y += this._selectedLayer.marginTop;
          return rotatedP;
        });
        //this.polygon=similarRegions[0].translate(this._selectedLayer.marginLeft,this._selectedLayer.marginTop).hull();
        this.polygon= new Polygon(rotatedPoints).hull();
      }else
      this.polygon=new Polygon();
      
      return true;
  }

  mouseUp(point: Point): boolean {
    
    return true;
  }
  doubleClick(point: Point) {
    
    return false;
  }

  toPolygon(): Polygon {
   
    //return this.polygon.simplify();
    return this.polygon;

  }

}


export class LayerSelect extends Layer {

  static readonly SubTypeRect = "rect";
  static readonly SubTypeEllipse = "ellipse";
  static readonly SubTypePolygon = "polygon";
  static readonly SubTypeLasso = "lasso";
  static readonly SubTypeMagicWand="magicwand";


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
  private _selectedWorkspaceLayer:Layer;

  constructor(width: number, height: number, left: number, top: number,selectedWorkspaceLayer:Layer) {
    super("select layer");
    this._blendMode="hard-light";
    this.keepRatio = false;    

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
    this._selectedWorkspaceLayer=selectedWorkspaceLayer;
     Helper.createStrokeStyle(this.graphics, (bitmap) => {
      this.strokeStyle = this.graphics.createPattern(bitmap, "repeat");
    }); 
    

  }

  public clone():LayerSelect{
    var instance=super.clone() as LayerSelect;
    instance.shapeType=this.shapeType;
    instance.clipMode=this.clipMode;
    instance.strokeStyle=this.strokeStyle;  
    this.polygons.forEach((item)=>{
      instance.polygons.push(item.clone())
    });
      
    return instance;
  }

  public createInstanceForClone(){
    let temp=new LayerSelect(this.width,this.height,this.marginLeft,this.marginTop,this._selectedWorkspaceLayer);
    return temp;
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
  public get shapeType() {
    return this._shapeType;
  }
  private _clayerEmpty={clayerEmpty:true};
  public get classes(): any {
    return this._clayerEmpty;
  }
  public mouseDown(event: MouseEvent,scroll:Point) {
    this.stopAnimation();
    super.mouseDown(event,scroll);
    switch (this._shapeType) {
      case LayerSelect.SubTypeRect:
        let point = this.normalizeMouseEvent(event,scroll);
        if (point) {
          this._shape = new ShapeRect(point, this.graphics,this._selectedWorkspaceLayer);
        }
        break;
      case LayerSelect.SubTypeEllipse:
        point = this.normalizeMouseEvent(event,scroll);
        if (point) {
          this._shape = new ShapeEllipse(point, this.graphics,this._selectedWorkspaceLayer);
        }
        break;
      case LayerSelect.SubTypeLasso:
        point = this.normalizeMouseEvent(event,scroll);
        if (point) {
          this._shape = new ShapeLasso(point, this.graphics,this._selectedWorkspaceLayer);
        }
        break;
      case LayerSelect.SubTypePolygon:
        point = this.normalizeMouseEvent(event,scroll);
        if (point && !(this._shape instanceof ShapePolygon)) {
          this._shape = new ShapePolygon(point, this.graphics,this._selectedWorkspaceLayer);
        }
        else this._shape.mouseDown(this.normalizeMouseEvent(event,scroll));
        break;
        case LayerSelect.SubTypeMagicWand:
        point = this.normalizeMouseEvent(event,scroll);
        if (point /* && !(this._shape instanceof ShapeMagicWand) */) {
          this._shape = new ShapeMagicWand(point, this.graphics,this._selectedWorkspaceLayer);
        }
        this._shape.mouseDown(this.normalizeMouseEvent(event,scroll));
        
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
      let linewidth=this._selectedWorkspaceLayer.scale<1 ? 1: 1;
      this.graphics.lineWidth(linewidth);
      
      this.graphics.strokeStyle(this.strokeStyle);
      if (!animate) {
        this.graphics.beginPath();
        let translate=linewidth%2==1?0.5:0;
        this.graphics.moveTo(points[0].x+translate, points[0].y+translate);
        for (let i = 1; i < points.length; ++i) {
          this.graphics.drawLine2(points[i].x+translate, points[i].y+translate);
        }
        this.graphics.closePath();
        this.graphics.stroke();
      }else{
        points= HMath.calculateBetweenPoints(points)
        let totalParts = points.length;
        
  
        
        let dividen = this.frameCounter % totalParts;
        let x = 1;
        for (x = 1; x < totalParts - 1; x += 1) {
          if ((x + dividen) % 2 == 0) { 
                    
          this.graphics.drawLine(points[x].x,points[x].y,points[x+1].x,points[x+1].y,1,this.strokeStyle);
        }
      }
      
        
        
        
        
      }
    }

  }

  public render(animate: boolean = false): void {
    
    //console.log('rendering layer select');
  
    let rect = new Rect(0, 0, this.width, this.height);
   
    this.graphics.clearRect(rect);
    
    this.graphics.beginPath();
   
    this._polygons.forEach((item) => this.renderPolygon(item, animate));
    if (this._shape)
      this._shape.render(this.graphics);
    
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
      /*  if (!this.animation){
      this.frameCounter=0;
      this.animation = window.requestAnimationFrame(() => this.render(true));
    }    */
    this.render();
    
    
  }
  protected stopAnimation() {
    if (this.animation)
      window.cancelAnimationFrame(this.animation);
    this.animation = undefined;
  }


}


