import { layer } from './layer';
import { graphics } from '../../lib/graphics';
import { callback as iskilip_callback } from 'iskilip/core/callback';
import { image as iskilip_image } from 'iskilip/img/image';


export class workspace  {
    private _name:string
    private _layers: layer[];
    private _width: number;
    private _height: number;
    constructor(width:number,height:number,name?: string) {
      if(name)
      this._name = name;
      else this._name="image";
      this._layers = [];
      this._width=width;
      this._height=height;
      if(this._width == 0)
      this._width=100;
      if(this._height == 0)
      this._height = 100;

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
    public get layers(): layer[]{
      return this._layers;
    }

    public dispose(): void{

    }

    public addLayer(ly: layer){
      if(ly){
        this._layers.push(ly);
      }
    }

    public render(grp: graphics){
      this._layers.forEach((ly)=>{
        ly.render(grp);
      });
    }


}
