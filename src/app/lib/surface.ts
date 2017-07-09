
import { Callback } from './callback';
import { Graphics } from './graphics';
import { Rect } from './draw/rect';
import { Point } from './draw/point'
import { Calc } from './calc';
export class Surface {

  public width = 0;
  public height = 0;;

  public scale = 1;
  public marginLeft = 0;
  public marginTop = 0;
  public marginRight = 0;
  public marginBottom = 0;
  public rotateAngleDeg: number = 0;
  public selectPointwh = 14;

  public zIndex = 0;
  public keepRatio: boolean;
  public scaleView: boolean;
  public sourceMask: Rect;


  /**
   *
   */
  constructor() {
    this.keepRatio = true;
    this.sourceMask = undefined;
    this.scaleView = true;

  }

}

export class SurfaceCanvas extends Surface {
  public graphics: Graphics;
  public resizedAgain = false;
  public scalePlus(): void {
    this.scale *= 1.1;
    if (this.scale > 3)
      this.scale = 3;



  }

  public scaleTo(val: number): void {

    if (val > 3)
      val = 3;
    if (val < 0.1)
      val = 0.1;
    this.scale = val;



  }

  public scaleMinus(): void {
    this.scale *= 0.9;
    if (this.scale < 0.1)
      this.scale = 0.1;


  }


  public setTop(value: number, func?: Callback) {
    if (!this.scaleView && this.sourceMask) {

      this.sourceMask.y -=this.sourceMask.height*(this.marginTop - value)/this.height;

    }
    this.marginTop = value;
    this.resizedAgain = false;
    this.whenCreatedGraphicsAgain = func;


  }
  public setLeft(value: number, func?: Callback) {

    if (!this.scaleView && this.sourceMask) {

      this.sourceMask.x -=this.sourceMask.width*(this.marginLeft - value)/this.width;

    }
    this.marginLeft = value;
    this.resizedAgain = false;
    this.whenCreatedGraphicsAgain = func;
  }
  public whenCreatedGraphicsAgain: Callback;
  public setWidthHeight(width: number, height: number, func?: Callback): void {

    if (this.keepRatio) {

      let widthIsChanging = false;
      if (width != this.width)
        widthIsChanging = true;
      let heightIsChanging = false;
      if (height != this.height)
        heightIsChanging = true;

      if (widthIsChanging) {
        let ratio = this.width / this.height;

        if (!this.scaleView && this.sourceMask) {
          this.sourceMask.width +=this.sourceMask.width*(this.width - width)/this.width;
          this.sourceMask.height +=this.sourceMask.height*(this.height - (width / ratio))/this.height;

        }

        this.width = width;
        this.height = this.width / ratio;



      } else if (heightIsChanging) {
        let ratio = this.height / this.width;

        if (!this.scaleView && this.sourceMask) {
          this.sourceMask.width +=this.sourceMask.width*(this.width - (height / ratio))/this.width;
          this.sourceMask.height +=this.sourceMask.height*( this.height - height)/this.height;
        }

        this.height = height;
        this.width = this.height / ratio;



      }


    } else {

      if (!this.scaleView && this.sourceMask) {
        this.sourceMask.width -=this.sourceMask.width*(this.width - width)/this.width;
        this.sourceMask.height -=this.sourceMask.height*(this.height - height)/this.height;
      }

      this.width = width;
      this.height = height;
    }

    this.prepareForRotate();
    this.resizedAgain = false;
    if (func)
      this.whenCreatedGraphicsAgain = func;
  }

  public resizeByAndSetMargin(width: number, height: number, setMarginLeft: boolean, setMarginTop: boolean, func?: Callback): void {


    if (this.keepRatio) {

      let ratio = this.width / this.height;
      if (width == 0)
        width = ((this.height + height / this.scale) * ratio - this.width) * this.scale;
      else if (height == 0)
        height = (((this.width + (width / this.scale)) / ratio) - this.height) * this.scale;
      else {

        width = ((this.height + height / this.scale) * ratio - this.width) * this.scale;
      }



    }
    if (!this.scaleView && this.sourceMask) {
     
      this.sourceMask.width += this.sourceMask.width*(width / this.scale)/this.width;
      this.sourceMask.height += (this.sourceMask.height*( height / this.scale)/this.height);  
      

    }
    this.width += width / this.scale;
    this.height += height / this.scale;



  
    if (setMarginLeft) {
      this.marginLeft -= width / this.scale;
      if (!this.scaleView && this.sourceMask)
        this.sourceMask.x -=this.sourceMask.width*(width / this.scale)/this.width;


    }
    if (setMarginTop) {
      this.marginTop -= height / this.scale;
      if (!this.scaleView && this.sourceMask)
        this.sourceMask.y -=this.sourceMask.height*(height / this.scale)/this.height;

    }
    this.prepareForRotate();
  this.resizedAgain = false;
    this.whenCreatedGraphicsAgain = func;


  }



  
  private widthBeforeRotate = 0;
  private heightBeforeRotate = 0;
  protected rotateAngleDegBefore= 0;
  
  public prepareForRotate(){
     this.widthBeforeRotate = this.width;
     this.heightBeforeRotate = this.height;
  //   this.rotateAngleDegBefore = this.rotateAngleDeg;
  }

  
  public rotateByDegrees(x: number) {

     
    /*let beforeAngle=this.rotateAngleDegBefore;
    this.rotateAngleDeg= x;
    console.log(beforeAngle+":"+this.rotateAngleDeg);
    if (this.rotateAngleDeg > 180)
      this.rotateAngleDeg = 180;
    else
      if (this.rotateAngleDeg < -180)
        this.rotateAngleDeg = -180;
   let angle=  this.rotateAngleDeg -beforeAngle;
   
   let tan =0;
   if(beforeAngle>=0)
    tan = Math.tan(beforeAngle/180*Math.PI);   
    else tan =1/ Math.tan(-beforeAngle/180*Math.PI);   
   let w1,w2,h1,h2;
   
   h2= (this.width*tan-this.height)/(tan*tan-1);
   h1= this.height -h2;
   w1 = tan * h2;
   w2 = this.width - w1;
   

   let pointLeftTop = new Point(-this.widthBeforeRotate/2+w1,-this.heightBeforeRotate/2);
   let pointLeftBottom = new Point(-this.widthBeforeRotate/2,this.heightBeforeRotate/2-h1);
   let pointRightTop = new Point(this.widthBeforeRotate/2,-this.heightBeforeRotate/2+h1);
   let pointRightBottom = new Point(this.widthBeforeRotate/2-w1,this.heightBeforeRotate/2);

   let pointX1= Calc.rotatePoint(pointLeftTop,angle,0,0);
   let pointX2= Calc.rotatePoint(pointLeftBottom,angle,0,0);
   let pointX3= Calc.rotatePoint(pointRightTop,angle,0,0);
   let pointX4= Calc.rotatePoint(pointRightBottom,angle,0,0);
   
   //burası test code
   let pointX11= Calc.rotatePoint(pointLeftTop,-beforeAngle,0,0);
   let pointX21= Calc.rotatePoint(pointLeftBottom,-beforeAngle,0,0);
   let pointX31= Calc.rotatePoint(pointRightTop,-beforeAngle,0,0);
   let pointX41= Calc.rotatePoint(pointRightBottom,-beforeAngle,0,0);
//test code bitti
   
   
   this.width = Math.abs(Math.max(pointX1.X,pointX2.X,pointX3.X,pointX4.X)-Math.min(pointX1.X,pointX2.X,pointX3.X,pointX4.X));
   this.height = Math.abs(Math.max(pointX1.Y,pointX2.Y,pointX3.Y,pointX4.Y)-Math.min(pointX1.Y,pointX2.Y,pointX3.Y,pointX4.Y));

   this.resizedAgain = false;*/
   this.rotateAngleDeg=x;
   

  }

  public get transform(){
  
    return "rotate("+this.rotateAngleDeg+"deg)";
    
  }
}
