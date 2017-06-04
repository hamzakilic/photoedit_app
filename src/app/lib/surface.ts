
import { Callback } from './callback';
import { Graphics } from './graphics';
export class Surface{

   public width = 0;
   public height = 0;;
   public stwidth = 0;
   public stheight = 0;
   public scale = 1;
   public marginLeft = 0;
   public marginTop = 0;
   public marginRight = 0;
   public marginBottom = 0;


   public zIndex = 0;


}

export class SurfaceCanvas extends Surface{
  public graphics:Graphics;
  public resizedAgain = false;
  public scalePlus():void{
      this.scale *= 1.1;
      if(this.scale>5)
        this.scale = 5;
      this.stwidth = this.scale* this.width;
      this.stheight = this.scale * this.height;

  }
  public scaleMinus():void{
      this.scale *= 0.9;
      if(this.scale<0.1)
        this.scale = 0.1;
      this.stwidth = this.scale* this.width;
      this.stheight = this.scale * this.height;

  }

  public whenCreatedGraphicsAgain: Callback;
  public setWidthHeight(width:number,height:number,func?: Callback): void {

      this.width = width;
      this.height = height;
      this.scale = 1;
      this.stwidth = this.width;
      this.stheight = this.height;
      this.resizedAgain = false;
      this.whenCreatedGraphicsAgain= func;
  }
}
