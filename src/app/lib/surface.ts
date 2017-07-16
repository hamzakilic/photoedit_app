
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
          
          this.sourceMask.width -=this.sourceMask.width*(this.width - width)/this.width;
          this.sourceMask.height -=this.sourceMask.height*(this.height - (width / ratio))/this.height;

        }

        this.width = width;
        this.height = this.width / ratio;



      } else if (heightIsChanging) {
        let ratio = this.height / this.width;

        if (!this.scaleView && this.sourceMask) {
          this.sourceMask.width -=this.sourceMask.width*(this.width - (height / ratio))/this.width;
          this.sourceMask.height -=this.sourceMask.height*( this.height - height)/this.height;
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

    
    this.resizedAgain = false;
    if (func)
      this.whenCreatedGraphicsAgain = func;
  }

  
  /**
   * @param  {number} width diffrence width
   * @param  {number} height diffrence height
   * @param  {number} left diffence margin left
   * @param  {number} top diffence to margin top
   * @param  {number} maskleft ignored
   * @param  {number} masktop ignored
   * @param  {Callback} func?
   * @returns void
   */
  public calculateBy(width: number, height: number, left: number, top: number,maskleft:number,masktop:number , func?: Callback): void {

    let bWidth=this.width;
    let bHeight=this.height;
    let bWidthMask=0;
    let bHeightMask=0;
    if(this.sourceMask){
      bWidthMask = this.sourceMask.width;
      bHeightMask = this.sourceMask.height;
    }
    if (this.keepRatio) {

      let ratio = this.width / this.height;
      if (width == 0)
        width = ((this.height + height ) * ratio - this.width);
      else if (height == 0)
        height = (((this.width + (width)) / ratio) - this.height) ;
      else {

        width = ((this.height + height ) * ratio - this.width) ;
      }



    }
    //must before changing this.widht and this.height
    if (!this.scaleView && this.sourceMask) {
     
      this.sourceMask.width += (width)*bWidthMask/bWidth;
      this.sourceMask.height += height*bHeightMask/bHeight;
      

    }
    this.width += width ;
    this.height += height ;



  
   
      this.marginLeft += left ;
     // if (!this.scaleView && this.sourceMask)
     //   this.sourceMask.x +=(maskleft)*bWidthMask/bWidth;


    
    
      this.marginTop += top ;
    //  if (!this.scaleView && this.sourceMask)
     //   this.sourceMask.y +=(masktop)*bHeightMask/bHeight;

    
    
  
    this.whenCreatedGraphicsAgain = func;
    this.resizedAgain = false;


  }

 

 public get rectRotated():Rect{
   let rect = new Rect(this.marginLeft,this.marginTop,this.width,this.height);   
   let rotatedRect= Calc.rotateRect(rect,this.rotateAngleDeg);
   return rotatedRect;
 }



  
  public rotateByDegrees(x: number) {

   this.rotateAngleDeg=x;
   

  }

  public get transform(){
  
    return "rotate("+this.rotateAngleDeg+"deg)";
    
  }
}
