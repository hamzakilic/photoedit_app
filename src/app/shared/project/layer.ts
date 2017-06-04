
import { Callback } from '../../lib/callback';
import { HImage  } from '../../lib/image';
import { Graphics } from '../../lib/graphics';
import { SurfaceCanvas } from '../../lib/surface'

export abstract class Layer extends SurfaceCanvas {
    private _name:string;
    public isHidden: boolean;
    public isSelected:boolean;
    private _isMouseDown:boolean;
    constructor(name?: string) {
      super();
      if(name)
      this._name = name;
      else this._name = 'layer';
      this.isHidden = false;

    }
    public get name(): string {
      return this._name;
    }


    public mouseDown(event: any){
      this.isSelected = true;
      this._isMouseDown = true;
    }
    public mouseMove(event: MouseEvent){
      if(this.isSelected && this._isMouseDown)
        {
          this.marginLeft+=event.movementX;
          this.marginTop+=event.movementY;

        }
    }

    public mouseUp(event:any){
      this._isMouseDown=false;

    }
    public mouseLeave(event:any){
      this._isMouseDown = false;
    }
    public  abstract render(): void;


    public abstract dispose();



}
