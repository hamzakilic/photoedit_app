import { Layer } from './layer';
import { LayerSelectRectangle } from './layerSelectRectangle';
import { Graphics } from '../../lib/graphics';
import { Callback } from '../../lib/callback';
import { HImage } from '../../lib/image';
import { Rect } from '../../lib/draw/rect';

import { Point } from '../../lib/draw/point';
import { RotationHelper, RotationMove } from './lib/rotationHelper';


export class LayerSelectEllipse extends LayerSelectRectangle {



  constructor(width: number, height: number, left: number, top: number) {
    super(width, height, left, top);





  }






  public render(): void {
    this.graphics.save();
    let rect = new Rect(0, 0, this.width, this.height);
    this.graphics.clearRect(rect);
    let centerX = this.width / 2;
    let centerY = this.height / 2;
    
   /* this.graphics.beginPath();
    
    this.graphics.moveTo(centerX, centerY - this.height/2); // A1
    
    this.graphics.bezierCurveTo(
      centerX + this.width/2, centerY - this.height/2, // C1
      centerX + this.width/2, centerY + this.height/2, // C2
      centerX, centerY + this.height/2); // A2
  
    this.graphics.bezierCurveTo(
      centerX - this.width/2, centerY + this.height/2, // C3
      centerX - this.width/2, centerY - this.height/2, // C4
      centerX, centerY - this.height/2); // A1
   
    
    
    this.graphics.fillStyle("rgba(" + 10 + "," + 10 + "," + 50 + "," + (100 / 255) + ")");

    
    this.graphics.fill();
    
    this.graphics.closePath();	*/
    this.graphics.beginPath();
    this.graphics.ellipse(centerX,centerY,this.width/2,this.height/2,0,0,2*Math.PI);
    this.graphics.fillStyle("rgba(" + 10 + "," + 10 + "," + 50 + "," + (100 / 255) + ")");
    
        
    this.graphics.fill();
        
    
    this.graphics.restore();
  }
  public dispose() {

  }

  public selectedCss() {
    let classes = {
      divSelectedLayer: false,
      divCropLayer: true,
    };
    return classes;
  }
}
