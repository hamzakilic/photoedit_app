import { Helper } from './lib/helper';
import { Layer } from './layer';
import { LayerSelect } from './layerSelect';
import { Graphics } from '../../lib/graphics';
import { Callback } from '../../lib/callback';
import { HImage } from '../../lib/image';
import { Rect } from '../../lib/draw/rect';

import { Point } from '../../lib/draw/point';
import { RotationHelper, RotationMove } from './lib/rotationHelper';


export class LayerCropRectangle extends Layer {
  isFinishedContructing: boolean
  animation: any;
  protected strokeStyle:any = "#FFF";
  constructor(width: number, height: number, left: number, top: number) {
    super("crop layer");

    this.keepRatio = false;
    

    this.width = width;
    this.height = height;
    this.marginLeft = left;
    this.marginTop = top;
    this.isSelected = true;
    

    this.canRotate = false;
    this.isFinishedContructing = false;
    Helper.createStrokeStyle(this.graphics, (bitmap) => {
      let gradient = this.graphics.createPattern(bitmap, "");
      this.strokeStyle = gradient;
    });  


  }




  public get classes(): any {
    return { clayerEmpty: true };
  }
  public mouseDown(event: MouseEvent, scroll: Point) {

    super.mouseDown(event, scroll);


  }
  public mouseMove(event: MouseEvent, scroll: Point) {

    if (this.isFinishedContructing) {

      super.mouseMove(event, scroll);
    } else
      if (this.isSelected && this.isMouseDown) {
        //burası eksi değer için configure edilecek       
        this.calculateBy(event.movementX / this.scale, event.movementY / this.scale, 0, 0, 0, 0,Callback.from(() => {
          
           
          this.render()
        }));
      }



  }

  public mouseDownSelectedPoint(event: MouseEvent, corner: number) {
    super.mouseDownSelectedPoint(event, corner);
    this.stopAnimation();
  }




  public mouseUp(event: MouseEvent, scroll: Point) {

    super.mouseUp(event, scroll);
    this.isFinishedContructing = true;
    this.startAnimation();
  }

  protected startAnimation() {
    if (!this.animation)
      this.animation = window.requestAnimationFrame(() => this.renderAnimation());
  }
  protected stopAnimation() {
    if (this.animation)
      window.cancelAnimationFrame(this.animation);
    this.animation = undefined;
  }




  public render(): void {

    this.graphics.save();
    let rect = new Rect(0, 0, this.width, this.height);
    this.graphics.clearRect(rect);
    this.graphics.lineWidth(3);
    this.graphics.fillRect(rect, this.fillStyle);
    this.graphics.drawRect(rect, this.strokeStyle);

    this.graphics.restore();


  }
  protected frameCounter = 0;
  
  public fillStyle = "rgba(" + 10 + "," + 10 + "," + 50 + "," + (100 / 255) + ")";
  protected renderAnimation(): void {

    if (this.graphics) {

      this.graphics.save();
      let rect = new Rect(0, 0, this.width, this.height);
      this.graphics.clearRect(rect);

      this.graphics.beginPath();
      let splitSize = 5;
      let totalParts = Math.ceil(this.width / splitSize) * 2 + Math.ceil(this.height / splitSize) * 2;
      let lh = 4;//linewidth

      this.frameCounter++;
      let dividen = this.frameCounter % totalParts;
      for (let x = 0; x < totalParts; x += 1) {

        if ((x + dividen) % 2 == 0) {
          if (x * splitSize < this.width)
            this.graphics.drawLine(x * splitSize, 0, x * splitSize + splitSize, 0, lh, this.strokeStyle);
          else
            if (x * splitSize < this.width + this.height)
              this.graphics.drawLine(this.width, x * splitSize - this.width, this.width, x * splitSize + splitSize - this.width, lh, this.strokeStyle);
            else
              if (x * splitSize < this.width + this.height + this.width)
                this.graphics.drawLine(this.width + this.height + this.width - x * splitSize, this.height, this.width + this.height + this.width - x * splitSize + splitSize, this.height, lh, this.strokeStyle);
              else
                this.graphics.drawLine(0, this.width + this.height + this.width + this.height - x * splitSize, 0, this.width + this.height + this.width + this.height - x * splitSize + splitSize, lh, this.strokeStyle);


        }


      }
      this.graphics.restore();
    }


    this.scheduleAnimation();

  }

  protected scheduleAnimation() {
    setTimeout(() => {
      if (this.animation)
        this.animation = window.requestAnimationFrame(() => this.renderAnimation());
    }, 1000 / 3);
  }


  public dispose() {
    this.stopAnimation();

  }

 

  public selectedCss() {
    let classes = {
      divSelectedLayer: false,
      divCropLayer: true,
    };
    return classes;
  }


}




