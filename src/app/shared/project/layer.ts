
import { callback as iskilip_callback } from 'iskilip/core/callback';
import { image as iskilip_image } from 'iskilip/img/image';
import { graphics } from '../../lib/graphics';

export  class layer {
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
    public  render(grp: graphics){

    }
}
