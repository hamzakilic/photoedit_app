import { Layer } from './layer';
import { Graphics } from '../../lib/graphics';

import { HImage } from '../../lib/image';

export class LayerGraphics extends Layer {

 protected _backgroundColor:string;

  constructor(name?: string, width?: number, height?: number) {
    super(name);

    if (width)
      this.width = width;

    if (height)
      this.height = height;
    this.canRotate = false;


  }
public get backgroundColor():string{
    return this._backgroundColor;
}

public set backgroundColor(val:string){
    this._backgroundColor=val;
    this.render();
}
  public render(): void {
    
  }
  public dispose() {

  }
}
