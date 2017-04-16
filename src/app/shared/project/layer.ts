
export class Layer {
    private name:string;
    /**
     *
     */
    constructor(name?: string) {
      if(name)
      this.name = name;
      else this.name = 'layer';

    }
    public get Name(): string {
      return this.name;
    }
}
