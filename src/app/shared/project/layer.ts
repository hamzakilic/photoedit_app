
import { Callback } from '../../lib/callback';
import { HImage } from '../../lib/image';
import { Graphics } from '../../lib/graphics';
import { SurfaceCanvas } from '../../lib/surface'


export abstract class Layer extends SurfaceCanvas {
  private _name: string;
  public isHidden: boolean;
  public isSelected: boolean;

  private _mouseDownPoint: MouseDownPoint;
  public isMouseDown: boolean;
  constructor(name?: string) {
    super();
    if (name)
      this._name = name;
    else this._name = 'layer';
    this.isHidden = false;
    this._mouseDownPoint = new MouseDownPoint();

  }
  public get name(): string {
    return this._name;
  }


  public mouseDown(event: any) {
    console.log(this.name + " mousedown");
    this.isSelected = true;
    this.isMouseDown = true;
  }
  public mouseDownSelectedPoint(event: any, corner: number) {
    this._mouseDownPoint.allFalse();
    this.isMouseDown = true;
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

    }
  }
  public mouseMove(event: MouseEvent) {
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
      if (this.isSelected && this.isMouseDown) {
        this.marginLeft += event.movementX;
        this.marginTop += event.movementY;

      }

  }

  public mouseUp(event: any) {
    console.log(this.name + " mouseup");
    this.isMouseDown = false;
    this._mouseDownPoint.allFalse();
  }
  /*public mouseLeave(event: any) {
    console.log(this.name + " mouseleave");
    this.isMouseDown = false;

  }*/
  public abstract render(): void;


  public abstract dispose();


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
  }
}
