
import { Callback } from '../../lib/callback';
import { Image  } from '../../lib/image';
import { Graphics } from '../../lib/graphics';
import { SurfaceCanvas } from '../../lib/surface'
export abstract class Layer extends SurfaceCanvas {
    private _name:string;

    constructor(name?: string) {
      super();
      if(name)
      this._name = name;
      else this._name = 'layer';

    }
    public get name(): string {
      return this._name;
    }
    public  abstract render(grp: Graphics): void;


    public abstract dispose();

}
