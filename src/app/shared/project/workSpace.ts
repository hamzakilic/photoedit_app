import { Layer } from './layer';

export class WorkSpace {
    private name:string
    private layers: Layer[];
    constructor(name?: string) {
      if(name)
      this.name = name;
      else this.name="image";
      this.layers = [];


    }

    public get Name(): string {
      return this.name;
    }

    public Dispose(): void{

    }
}
