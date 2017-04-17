import { layer } from './layer';

export class workspace {
    private _name:string
    private _layers: layer[];
    constructor(name?: string) {
      if(name)
      this._name = name;
      else this._name="image";
      this._layers = [];


    }

    public get name(): string {
      return this._name;
    }

    public dispose(): void{

    }
    public setBackgroundImage: (img)=>void;
}
