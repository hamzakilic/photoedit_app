import { Layer } from './layer';
import { LayerEmpty } from './layerEmpty';
import { LayerBackground } from './layerBackground';
import { Graphics } from '../../lib/graphics';
import { Callback  } from '../../lib/callback';
import { HEventEmitter } from '../../lib/eventEmitter'
import { HImage } from '../../lib/image';


export class Workspace extends HEventEmitter  {
    private _name:string
    private _layers: Layer[];
    private _width: number;
    private _height: number;


    public isRemoveable:boolean;
    public isActive: boolean;

    public readonly offsetLeft = 50;
    public readonly offsetTop = 50;
    public backgroundLayer: Layer;
    public foregroundLayer: Layer;

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

        this.backgroundLayer = new LayerBackground('backgroundlayer');
        this.backgroundLayer.width= this.width;
        this.backgroundLayer.height =this.height;
        this.backgroundLayer.stwidth = this.width;
        this.backgroundLayer.stheight = this.height;
        this.backgroundLayer.left = this.offsetLeft;
        this.backgroundLayer.top = this.offsetTop;
        this.backgroundLayer.zIndex = 0;

        this.foregroundLayer = new LayerEmpty('foregroundlayer');
        this.foregroundLayer.width= this.width+2*this.offsetLeft;
        this.foregroundLayer.height =this.height+2* this.offsetTop;
        this.foregroundLayer.stwidth = this.foregroundLayer.width;
        this.foregroundLayer.stheight = this.foregroundLayer.height;
        this.foregroundLayer.left = 0;
        this.foregroundLayer.top = 0;
        this.foregroundLayer.zIndex = 1000;


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
        ly.left = this.offsetLeft;
        ly.top = this.offsetTop;

        this._layers.push(ly);
      }
    }
    public clearLayers(){
      this._layers = [];
    }

    public render(){
      console.log('rendering workspace');
      this.backgroundLayer.render();
      this._layers.forEach((item)=>item.render());

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

    public mouseWheelUpFunc(){
      console.log('wheelup');
    }

    public mouseWheelDownFunc(){
      console.log('wheeldown');
    }


    public zoomIn(){
      this.backgroundLayer.scalePlus();
      this.foregroundLayer.scalePlus();
      this._layers.forEach((item)=>item.scalePlus());

    }

    public zoomOut(){
      this.backgroundLayer.scaleMinus();
      this.foregroundLayer.scaleMinus();
      this._layers.forEach((item)=>item.scaleMinus());
    }

    public static readonly EVENTRESIZED="resized";
}



