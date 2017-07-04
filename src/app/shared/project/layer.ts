
import { Callback } from '../../lib/callback';
import { HImage } from '../../lib/image';
import { Graphics } from '../../lib/graphics';
import { SurfaceCanvas } from '../../lib/surface'
import { Rect } from '../../lib/draw/rect';

export abstract class Layer extends SurfaceCanvas {
  private _name: string;
  public isHidden: boolean;
  public isSelected: boolean;
  public canRotate: boolean;
  private _mouseDownPoint: MouseDownPoint;
  public isMouseDown: boolean;
  
  constructor(name?: string) {
    super();
    this.sourceMask = undefined;
    
    if (name)
      this._name = name;
    else this._name = 'layer';
    this.isHidden = false;
    this._mouseDownPoint = new MouseDownPoint();

  }
  public get name(): string {
    return this._name;
  }


  public mouseDown(event: MouseEvent) {
    console.log(this.name + " mousedown");
    this.isSelected = true;
    this.isMouseDown = true;

  }

  
  public mouseDownSelectedPoint(event: MouseEvent, corner: number) {
    console.log("mouseDownSelectedPoint");

    this._mouseDownPoint.allFalse();
    this.isMouseDown = true;
  //  this.isSelected = true;
    switch (corner) {
      //starts from left and rotates clock wise
      case 1: this._mouseDownPoint.isLeft = true; break;
      case 2: this._mouseDownPoint.isTopLeft = true; break;
      case 3: this._mouseDownPoint.isTop = true; break;
      case 4: this._mouseDownPoint.isTopRight = true; break;
      case 5: this._mouseDownPoint.isRight = true; break;
      case 6: this._mouseDownPoint.isBottomRight = true; break;
      case 7: this._mouseDownPoint.isBottom = true; break;
      case 8: this._mouseDownPoint.isBottomLeft = true; break;
      case 9: this._mouseDownPoint.isRotate = true;break;
      default:break;

    }
    event.preventDefault();
  }
  public mouseMove(event: MouseEvent) {

   // console.log(this.name+" moving:"+event.clientX);
    if (this._mouseDownPoint.isLeft && this.isMouseDown) {
      this.resizeByAndSetMargin(-event.movementX, 0,true,false, new Callback(() => this.render()));
    } else
    if (this._mouseDownPoint.isTopLeft && this.isMouseDown) {
      this.resizeByAndSetMargin(-event.movementX, -event.movementY,true,true, new Callback(() => this.render()));
    } else
    if (this._mouseDownPoint.isTop && this.isMouseDown) {
      this.resizeByAndSetMargin(0, -event.movementY,false,true, new Callback(() => this.render()));
    } else
    if (this._mouseDownPoint.isTopRight && this.isMouseDown) {
      this.resizeByAndSetMargin(event.movementX, -event.movementY,false,true, new Callback(() => this.render()));
    } else
    if (this._mouseDownPoint.isRight && this.isMouseDown) {
      this.resizeByAndSetMargin(event.movementX, 0,false,false, new Callback(() => this.render()));
    } else
    if (this._mouseDownPoint.isBottomRight && this.isMouseDown) {
      this.resizeByAndSetMargin(event.movementX, event.movementY,false,false, new Callback(() => this.render()));
    } else
    if (this._mouseDownPoint.isBottom && this.isMouseDown) {
      this.resizeByAndSetMargin(0, event.movementY,false,false, new Callback(() => this.render()));
    } else
    if (this._mouseDownPoint.isBottomLeft && this.isMouseDown) {
      this.resizeByAndSetMargin(-event.movementX, event.movementY,true,false, new Callback(() => this.render()));
    } else
     if (this._mouseDownPoint.isRotate && this.isMouseDown) {
        this.rotate(event.movementX);
      


    } else
      if (this.isSelected && this.isMouseDown) {
          
        
        this.marginLeft += event.movementX;
        this.marginTop += event.movementY;
        

      }
      event.preventDefault();

  }

  public mouseUp(event: any) {

    console.log(this.name + " mouseup");
    this._mouseDownPoint.allFalse();
    this.isMouseDown = false;

    event.preventDefault();
  }

  public abstract render(): void;





  public abstract dispose();


   public selectedCss() {
     let classes =  {
            divSelectedLayer: true,
            divCropLayer: false,
        };
        return classes;
   }

}

///mouse down point holder for resizing, rotating
class MouseDownPoint {
  public isLeft: boolean;
  public isTopLeft: boolean;
  public isTop: boolean;
  public isTopRight: boolean;
  public isRight: boolean;
  public isBottomRight: boolean;
  public isBottom: boolean;
  public isBottomLeft: boolean;
  public isRotate: boolean;
  constructor() {
    this.allFalse();
  }

  public allFalse(): void {

    this.isLeft = false;
    this.isTopLeft = false;
    this.isBottom = false;
    this.isBottomLeft = false;
    this.isBottomRight = false;
    this.isRight = false;
    this.isTop = false;
    this.isTopRight = false;
    this.isRotate = false;
  }
}
