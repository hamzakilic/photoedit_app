import { debuging} from '../../shared/debuging'
import { Callback } from '../../lib/callback';
import { HImage } from '../../lib/image';
import { Graphics } from '../../lib/graphics';
import { SurfaceCanvas } from '../../lib/surface'
import { Rect } from '../../lib/draw/rect';
import { Point } from '../../lib/draw/point';
import { RotationHelper, RotationMove } from '../../lib/rotationHelper';

export abstract class Layer extends SurfaceCanvas {
  private _name: string;
  public isHidden: boolean;
  public isSelected: boolean;
  public canRotate: boolean;
  protected _mouseDownPoint: MouseDownPoint;
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
    //debuging.log(this.name + " mousedown");
    this.isSelected = true;
    this.isMouseDown = true;
    
  }

  
  public mouseDownSelectedPoint(event: MouseEvent, corner: number) {
    

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
      case 9: this._mouseDownPoint.isRotate = true; break;
      default:break;

    }
    event.preventDefault();
  }
  public mouseMove(event: MouseEvent) {

    
    if (this._mouseDownPoint.isLeft && this.isMouseDown) {
      let move = RotationHelper.calculateRotationMoveLeft(event,this);
      this.calculateBy(move.width ,move.height,move.left,move.top,move.maskLeft,move.maskTop, new Callback(() => this.render()));
    } else   
    if (this._mouseDownPoint.isTop && this.isMouseDown) {
      let move = RotationHelper.calculateRotationMoveTop(event,this);
      this.calculateBy(move.width ,move.height,move.left,move.top,move.maskLeft,move.maskTop, new Callback(() => this.render()));
    } else
    
    if (this._mouseDownPoint.isRight && this.isMouseDown) {
      let move = RotationHelper.calculateRotationMoveRight(event,this);
      this.calculateBy(move.width ,move.height,move.left,move.top,move.maskLeft,move.maskTop, new Callback(() => this.render()));
    } else
    if (this._mouseDownPoint.isBottom && this.isMouseDown) {
     let move = RotationHelper.calculateRotationMoveBottom(event,this);
      this.calculateBy(move.width ,move.height,move.left,move.top,move.maskLeft,move.maskTop, new Callback(() => this.render()));
    } else
    if (this.isSelected && this.isMouseDown) {
          
        
        this.marginLeft += event.movementX/this.scale;
        this.marginTop += event.movementY/this.scale;
        

      }
      event.preventDefault();

  }

  

  public mouseUp(event: any) {

    //console.log(this.name + " mouseup");
    this._mouseDownPoint.allFalse();
    this.isMouseDown = false;

    event.preventDefault();
  }

  public abstract render(): void;

  public abstract dispose();

  


   

}

/**mouse down point holder for resizing, rotating */
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
