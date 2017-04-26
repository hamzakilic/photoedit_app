
import { Callback } from '../../lib/callback';
import { Image  } from '../../lib/image';
import { Graphics } from '../../lib/graphics';

export abstract class Layer {
    private _name:string;
    /**
     *
     */
    constructor(name?: string) {
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
