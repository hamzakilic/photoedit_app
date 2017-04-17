
export class layer {
    private _name:string;
    /**
     *
     */
    constructor(name?: string) {
      if(name)
      this._name = name;
      else this._name = 'layer';

    }
    public get Name(): string {
      return this._name;
    }
}
