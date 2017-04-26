import { Layer } from './layer';
import { Graphics } from '../../lib/graphics';
import { Callback  } from '../../lib/callback';
import { HEventEmitter } from '../../lib/eventEmitter'
import { Image } from '../../lib/image';


export class Workspace extends HEventEmitter  {
    private _name:string
    private _layers: Layer[];


    public isRemoveable:boolean;
    public isActive: boolean;
    public _width: number;
    public _height: number;
    constructor(width:number,height:number,name?: string) {
      super();
      if(name)
      this._name = name;
      else this._name="image";
      this._layers = [];

      this.isRemoveable=true;
      this.isActive = false;
      if(width <= 0)
      this._width = 100;
      else this._width = width;
      if(height <= 0)
      this._height = 100;
      else this._height = height;




    }

    public get width(): number{
      return this._width;
    }
    public get height():number{
      return this._height;
    }

    public get name(): string {
      return this._name;
    }
    public get layers(): Layer[]{
      return this._layers;
    }

    public dispose(): void{
        this._layers.forEach((item)=>item.dispose());
    }

    public addLayer(ly: Layer){
      if(ly){
        this._layers.push(ly);
      }
    }
    public clearLayers(){
      this._layers = [];
    }

    public render(grp: Graphics){

    }

    public resize(width: number,height:number,afterResized:Callback){


      if(width <= 0)
      this._width = 100;
      else this._width = width;
      if(height <= 0)
      this._height = 100;
      else this._height = height;

      this.callEvent(Workspace.EVENTRESIZED,afterResized);

    }



    public static readonly EVENTRESIZED="resized";
}


