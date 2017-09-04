import { Layer } from './layer';
import { LayerSelectRectangle } from './layerSelectRectangle';
import { Graphics } from '../../lib/graphics';
import { Callback } from '../../lib/callback';
import { HImage } from '../../lib/image';
import { Rect } from '../../lib/draw/rect';

import { Point } from '../../lib/draw/point';
import { RotationHelper, RotationMove } from './lib/rotationHelper';


export class LayerSelectFree extends LayerSelectRectangle {

   isFinishedContructing:boolean

  constructor(width: number, height: number,left: number, top: number) {
    super(width,height,left,top);
    
    
     this.isSelected= false;




  }

   public mouseMove(event: MouseEvent) {
    if(this.isFinishedContructing){
    }
    
      

  }

  public mouseUp(event: any) {

    
    super.mouseUp(event);
    
    
  }




  public render(): void {
      this.graphics.save();
      let rect= new Rect(0,0,this.width,this.height);
      this.graphics.clearRect(rect);
      this.graphics.fillRectRGBA(rect,10,10,50,100);
     
      this.graphics.restore();
  }
  public dispose() {

  }

 
}
