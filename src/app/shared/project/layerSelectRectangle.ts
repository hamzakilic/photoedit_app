import { Layer } from './layer';
import { Graphics } from '../../lib/graphics';
import { Callback } from '../../lib/callback';
import { HImage } from '../../lib/image';
import { Rect } from '../../lib/draw/rect';

import { Point } from '../../lib/draw/point';
import { RotationHelper, RotationMove } from '../../lib/rotationHelper';


export class LayerSelectRectangle extends Layer {

   isFinishedContructing:boolean

  constructor(width: number, height: number,left: number, top: number) {
    super("crop layer");
    
    this.keepRatio = false;
    this.scaleView = false;

     this.width = width;
     this.height = height;
     this.marginLeft = left;
     this.marginTop = top;
     this.isSelected= true;

     this.canRotate = false;
     this.isFinishedContructing= false;



  }

   public mouseMove(event: MouseEvent) {
    if(this.isFinishedContructing){
     super.mouseMove(event);
    }else
    if (this.isSelected && this.isMouseDown ) {          
        this.calculateBy(event.movementX,event.movementY,0,0,0,0,new Callback(()=>this.render()));
        /* this.width += event.movementX;
        this.height += event.movementY;
        this.resizedAgain=false;
        this.whenCreatedGraphicsAgain=new Callback(()=>this.render()); */

      }
    
      

  }

  public mouseUp(event: any) {

    //console.log(this.name + " mouseup");
    super.mouseUp(event);
    this.isFinishedContructing=true;
    
  }




  public render(): void {
      let rect= new Rect(0,0,this.width,this.height);
      this.graphics.clearRect(rect);
      this.graphics.fillRectRGBA(rect,10,10,50,100);
      /*this.graphics.fillRect(new Rect(0,0,10,10),"#FFFFFF");
      this.graphics.fillRect(new Rect(this.width-10,0,10,10),"#FFFFFF");
      this.graphics.fillRect(new Rect(this.width-10,this.height-10,10,10),"#FFFFFF");
      this.graphics.fillRect(new Rect(0,this.height-10,10,10),"#FFFFFF");*/
  }
  public dispose() {

  }

  public selectedCss() {
     let classes =  {
            divSelectedLayer: false,
            divCropLayer: true,
        };
        return classes;
   }
}
