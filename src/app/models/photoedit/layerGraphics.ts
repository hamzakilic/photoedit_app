import { IBackgroundColor, IForegroundColor } from './iColor';


import { Layer } from './layer';
import { Graphics } from '../../lib/graphics';

import { HImage } from '../../lib/image';

export class LayerGraphics extends Layer implements IBackgroundColor,IForegroundColor {

  protected _backgroundPattern:any;
  protected _foregroundPattern:any;

  constructor(name?: string, width?: number, height?: number) {
    super(name);

    if (width)
      this.width = width;

    if (height)
      this.height = height;
    this.canRotate = false;


  }
  public clone(){
    
    var instance= super.clone() as LayerGraphics;
    instance._backgroundPattern=this._backgroundPattern;
    instance._foregroundPattern=this._foregroundPattern;
    return instance;
  }
  public createInstanceForClone():LayerGraphics{
    return new LayerGraphics(this.name,this.width,this.height);
  }

  public get backgroundPattern(): string {
    return this._backgroundPattern;
  }

  public set backgroundPattern(val: string) {
    this._backgroundPattern = val;
    this.render();
  }

  public get foregroundPattern(): string {
    return this._foregroundPattern;
  }

  public set foregroundPattern(val: string) {
    this._foregroundPattern = val;
    this.render();
  }


  public render(): void {

  }
  public dispose() {
    

  }

  
}
