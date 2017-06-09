import { Layer } from './layer';
import { LayerEmpty } from './layerEmpty';
import { LayerBackground } from './layerBackground';
import { Graphics } from '../../lib/graphics';
import { Callback  } from '../../lib/callback';
import { HEventEmitter } from '../../lib/eventEmitter'
import { HImage } from '../../lib/image';
import { Utility } from '../../lib/utility';

export class Workspace extends HEventEmitter  {
    private _name:string
    private _layers: Layer[];
    private _width: number;
    private _height: number;


    public isRemoveable:boolean;
    public isActive: boolean;


    public readonly margin = 0;

    public backgroundLayer: Layer;
    public foregroundLayer: Layer;

    public uuid:string;

    private nativeElement: any;

    public clippath: string;

    constructor(width:number,height:number,name?: string) {
      super();
      this.uuid = Utility.uuid();
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
        this.backgroundLayer.marginLeft =this.margin;
        this.backgroundLayer.marginTop = this.margin;
        this.backgroundLayer.marginRight = this.margin;
        this.backgroundLayer.marginBottom = this.margin;

        this.backgroundLayer.zIndex = 0;

        /*this.foregroundLayer = new LayerEmpty('foregroundlayer');
        this.foregroundLayer.width= this.width+2*this.offsetLeft;
        this.foregroundLayer.height =this.height+2* this.offsetTop;
        this.foregroundLayer.stwidth = this.foregroundLayer.width;
        this.foregroundLayer.stheight = this.foregroundLayer.height;
        this.foregroundLayer.left = 0;
        this.foregroundLayer.top = 0;
        this.foregroundLayer.zIndex = 1000;*/


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
        ly.marginLeft = this.margin;
        ly.marginRight = this.margin;
        ly.marginTop = this.margin;
        ly.marginBottom = this.margin;

        this._layers.push(ly);
      }
    }

public removeLayer(ly: Layer){
        if(ly){
        let index= this._layers.findIndex((item)=>{
      return item === ly;
    });

    if(index>-1){
      let layer=this._layers[index];
      this._layers.splice(index,1);
       layer.dispose();
    }
      }
    }

    public clearLayers(){
      this._layers = [];
    }

    public render(){

      this.backgroundLayer.render();
      this._layers.forEach(
        (item)=> {
          if(!item.isHidden)
          item.render();
        }
      )

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

    public mouseMove(event: MouseEvent){

     /* if(!this.nativeElement)
       this.nativeElement = document.getElementById(this.uuid);
      var rect = this.nativeElement.getBoundingClientRect();
      this.mouseX = (event.pageX-rect.left) + window.scrollX;
      this.mouseY = (event.pageY-rect.top) + window.scrollY;*/

      //console.log(event.clientX+":"+event.clientY+"/"+event.movementX+":"+event.movementY+"/"+event.offsetX+":"+event.offsetY+"/"+event.pageX+":"+event.pageY+"/"+event.screenX+":"+event.screenY);
      //console.log(this.mouseX+":"+this.mouseY);
        // console.log('workspace mouse move:'+event.clientX);
        this._layers.forEach((item)=>{
          if(item.isSelected)
          item.mouseMove(event);
        });

    }

    public mouseDown(event: MouseEvent,layer: Layer){

      console.log('workspace mouse down:'+event.clientX);
      this.makeLayersNotSelected(layer);
      layer.mouseDown(event);
    }
    public mouseUp(event: any){

      console.log('workspace mouse up:'+event.clientX);
      this._layers.forEach((item)=>{if(item.isSelected)item.mouseUp(event);});
    }

    private makeLayersNotSelected(layer: Layer){
      this._layers.forEach((item)=>{
        if(layer && layer!=item && !layer.isHidden)
        item.isSelected=false;
      });

    }
    public makeLayerSelected(layer: Layer){

      this.makeLayersNotSelected(layer);
      if(layer && !layer.isHidden){
         layer.isSelected = true;

      }

    }


    public zoomIn(){
      this.backgroundLayer.scalePlus();

      this._layers.forEach((item)=>item.scalePlus());

    }

    public zoomOut(){
      this.backgroundLayer.scaleMinus();

      this._layers.forEach((item)=>item.scaleMinus());
    }

    public selectWorking(working: number){
      console.log('selectWorking');
      switch (working){
      case Workspace.WorkModeDefault:
        this.cssClasses="mouseDefault";
        break;
         case Workspace.WorkModeSelection:
        this.cssClasses="mouseCross";break;
         case Workspace.WorkModeHand:
        this.cssClasses="mouseHand";break;
        default:
        this.cssClasses="mouseDefault";
      }

    }

    public cssClasses: string;

    public static readonly EVENTRESIZED="resized";

    public static readonly WorkModeDefault=1;
    public static readonly WorkModeHand = 2;
    public static readonly WorkModeSelection = 3;
    public static readonly WorkModeText = 3;
    public static readonly WorkModeDraw = 4;


}







