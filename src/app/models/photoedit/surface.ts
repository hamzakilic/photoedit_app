
import { IClone } from './iclone';

import { Color } from './../../lib/draw/color';
import { Callback } from '../../lib/callback';
import { Graphics } from '../../lib/graphics';
import { Rect } from '../../lib/draw/rect';
import { Rect2D } from '../../lib/draw/rect2D';
import { Point } from '../../lib/draw/point'
import { HMath } from '../../lib/hMath';
import { HImage } from '../../lib/image';


export class Surface implements IClone {

  public width = 0;
  public height = 0;;

  public scale = 1;
  public marginLeft = 0;
  public marginTop = 0;
  
  public rotateAngleDeg: number = 0;
  public selectPointwh = 14;

  public zIndex = 0;
  public keepRatio: boolean=true;  
  public globalAlpha:number=1.0;


  /**
   *
   */
  constructor() {
    
  }
  
  public clone():Surface{
    var instance=this.createInstanceForClone();
    instance.globalAlpha=this.globalAlpha;
    instance.height=this.height;
    instance.keepRatio=this.keepRatio;
    
    instance.marginLeft=this.marginLeft;    
    instance.marginTop=this.marginTop;
    instance.rotateAngleDeg=this.rotateAngleDeg;
    instance.scale=this.scale;
    
    instance.selectPointwh=this.selectPointwh;
    
    instance.width=this.width;
    instance.zIndex=this.zIndex;
    return instance;

  }
  protected createInstanceForClone():Surface{
    return new Surface();
  }
  

}

export class SurfaceCanvas extends Surface {
  public htmlElement:any;
  public graphics: Graphics;
  public resizedAgain = false;
  public createAgain=false;
  readonly maxScale=20;
  readonly minScale=0.3;
  public scalePlus(): void {
    this.scale += 1;
    if (this.scale > this.maxScale)
      this.scale = this.maxScale;
  }

  public scaleTo(val: number): void {

    if (val > this.maxScale)
      val = this.maxScale;
    if (val < this.minScale)
      val = this.minScale;
    this.scale = val;
    


  }

  public scaleMinus(): void {
    this.scale -= 0.1;
    if (this.scale < this.minScale)
      this.scale = this.minScale;
  }


  public setTop(value: number, func?: Callback) {
    
    this.marginTop = value;
    this.resizedAgain = false;
    this.whenCreatedGraphicsAgain = func;

  }
  public setLeft(value: number, func?: Callback) {

    
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

        this.width = width;
        this.height = this.width / ratio;



      } else if (heightIsChanging) {
        let ratio = this.height / this.width;


        this.height = height;
        this.width = this.height / ratio;



      }


    } else {


      this.width = width;
      this.height = height;
    }

    
    this.resizedAgain = false;
    if (func)
      this.whenCreatedGraphicsAgain = func;
    //console.log(this.width,this.height,this.marginLeft,this.marginTop);
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
    

    if(this.width+width<0 || this.height+height<0)
        return;
    this.width += width ;
    this.height += height ;

    this.marginLeft += left ;
    
    this.marginTop += top ;

    this.whenCreatedGraphicsAgain = func;
    this.resizedAgain = false;


  }

 
 /**
  * when a layer rotated with some angle,calculates the bigger rectangle 
  * @returns Rect
  */
 public get rectRotated():Rect{
   let rect = new Rect(this.marginLeft,this.marginTop,this.width,this.height);   
   let rotatedRect= HMath.rotateRect(rect,this.rotateAngleDeg);
  
   return rotatedRect;
   
 }

   /**
  * when a layer rotated with some angle,calculates 2D rectangle
  * @returns Rect
  */
 public get rectRotated2D():Rect2D{
   
   let rect = new Rect2D(new Point(this.marginLeft,this.marginTop),new Point(this.marginLeft,this.marginTop+this.height),new Point(this.marginLeft+this.width,this.marginTop),new Point(this.marginLeft+this.width,this.marginTop+this.height));
   let rotatedRect= HMath.rotateRect2D(rect,this.rotateAngleDeg);
   return rotatedRect;
 } 

  /**
  * calculates rectangle with out rotate
  * @returns Rect
  */
 public get rect():Rect{
   let rect = new Rect(this.marginLeft,this.marginTop,this.width,this.height);
   return rect;
 }

 /**
  * allways creates a deep copy HImage
  * @returns HImage
  */
 public  getImage():HImage {
   return this.graphics.getImage();
 }

 public getPixel(x:number,y:number):Color{
   return this.graphics.getPixel(x,y);
 }

 public setPixel(x:number,y:number,color:Color){
   this.graphics.setPixel(x,y,color);
}




  
  public rotateByDegrees(x: number) {

   this.rotateAngleDeg=x;
   

  }

  public get transform():string{
  
    return "rotate("+this.rotateAngleDeg+"deg)";
    
  }
  public set transform(val:string){
    
      this.rotateAngleDeg= Number.parseInt(val);
      
    }
}
