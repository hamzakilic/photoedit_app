
import { Callback } from './callback';
import { Graphics } from './graphics';
export class Surface{

   public width = 0;
   public height = 0;;

   public scale = 1;
   public marginLeft = 0;
   public marginTop = 0;
   public marginRight = 0;
   public marginBottom = 0;
   public rotateAngleDeg=0;
   public selectPointwh = 14;

   public zIndex = 0;


}

export class SurfaceCanvas extends Surface{
  public graphics:Graphics;
  public resizedAgain = false;
  public scalePlus():void{
      this.scale *= 1.1;
      if(this.scale>5)
        this.scale = 5;



  }
  public scaleMinus():void{
      this.scale *= 0.9;
      if(this.scale<0.1)
        this.scale = 0.1;


  }

  public whenCreatedGraphicsAgain: Callback;
  public setWidthHeight(width:number,height:number,func?: Callback): void {

      this.width = width;
      this.height = height;
      //this.scale = 1;

      this.resizedAgain = false;
      if(func)
      this.whenCreatedGraphicsAgain= func;
  }
  public resizeByAndSetMargin(width:number,height:number,setMarginLeft:boolean,setMarginTop:boolean, func?: Callback): void{

    this.width += width/this.scale;
    this.height += height/this.scale;

    this.resizedAgain = false;
    if(setMarginLeft)
    this.marginLeft -=width/this.scale;
    if(setMarginTop)
    this.marginTop -=height/this.scale;

    this.whenCreatedGraphicsAgain= func;

  }

  private widthBeforeRotate=0;
  private heightBeforeRotate=0;

  public rotate(x: number){
   // let tan = x/(this.width*this.scale/2/180);
    if(this.rotateAngleDeg==0)
      {
        this.widthBeforeRotate=this.width;
        this.heightBeforeRotate = this.height;
      }
    let tan = x;

    if(this.rotateAngleDeg+tan>180)
    this.rotateAngleDeg= 180;
    else
    if(this.rotateAngleDeg+tan<-180)
    this.rotateAngleDeg=-180;
    else
    this.rotateAngleDeg += tan;


    //if(tan>0){


      let newWidth=Math.abs(Math.cos(this.rotateAngleDeg*Math.PI/180))*this.widthBeforeRotate+Math.abs(Math.cos((90-this.rotateAngleDeg)*Math.PI/180))*this.heightBeforeRotate;
      this.width=newWidth;

      let newHeight=Math.abs(Math.cos(this.rotateAngleDeg*Math.PI/180))*this.heightBeforeRotate+Math.abs(Math.cos((90-this.rotateAngleDeg)*Math.PI/180))*this.widthBeforeRotate;

      this.height =newHeight;
   // }

    this.resizedAgain=false;
   // console.log("angle:"+this.rotateAngleDeg);
  }

  public rotateByDegrees(x: number){
   // let tan = x/(this.width*this.scale/2/180);
    if(this.rotateAngleDeg==0)
      {
        this.widthBeforeRotate=this.width;
        this.heightBeforeRotate = this.height;
      }
    this.rotateAngleDeg=x;

    if(this.rotateAngleDeg>180)
    this.rotateAngleDeg= 180;
    else
    if(this.rotateAngleDeg<-180)
    this.rotateAngleDeg=-180;






      let newWidth=Math.abs(Math.cos(this.rotateAngleDeg*Math.PI/180))*this.widthBeforeRotate+Math.abs(Math.cos((90-this.rotateAngleDeg)*Math.PI/180))*this.heightBeforeRotate;
      this.width=newWidth;

      let newHeight=Math.abs(Math.cos(this.rotateAngleDeg*Math.PI/180))*this.heightBeforeRotate+Math.abs(Math.cos((90-this.rotateAngleDeg)*Math.PI/180))*this.widthBeforeRotate;

      this.height =newHeight;


    this.resizedAgain=false;

  }
}
