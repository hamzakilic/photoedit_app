import { Layer } from './layer';
import { LayerGraphics } from './layerGraphics';
import { Graphics } from '../../lib/graphics';
import { Callback } from '../../lib/callback';
import { HImage  } from '../../lib/image';
import { Rect} from '../../lib/draw/rect';
import { Text } from "../../entities/text";

export class LayerText extends LayerGraphics{

 private _text:Text;
 

  constructor(text:Text,name?: string) {
    super(name);

    this.sourceMask=new Rect(0,0,300,50);
    this.width = 300;
    this.height = 50;
    this.canRotate = true;
         
    this._text=text;
   
  }
  public render(): void{
   
      this.graphics.save();
       this.graphics.setGlobalAlpha(this.globalAlpha);
      this.graphics.clearRect(new Rect(0,0,this.width,this.height));
      if(this._backgroundColor)
        this.graphics.fillRect(new Rect(0,0,this.width,this.height),this._backgroundColor);
      this.graphics.drawString(this._text.data,this._text.color,this._text.isStroked, this._text.strokedColor,this._text.fontFamily,this._text.fontSize,this._text.isBold,this._text.isItalic,this._text.alignH,this._text.alignV);
      this.graphics.restore();
  
    }

    public setText(value: string){
      if(value || value==""){
        this._text.data=value;
        this.render();
      }
    }

    public get text(): string{
      return this._text.data;
    }

    public get fontFamily():string{
      return this._text.fontFamily;

    }
    public setFontFamily(val:string){
    
      this._text.fontFamily=val;
      this.render();
    }
    public get color():string{
      return this._text.color;
    }
    public setColor(val:string){
      this._text.color=val;
      this.render();
    }

    public get strokedColor():string{
      return this._text.strokedColor;
    }
    public setStrokedColor(val:string){
      this._text.strokedColor=val;
      this.render();
    }

     public get isStroked():boolean{
      return this._text.isStroked;
    }
    public setIsStroked(val:boolean){
      this._text.isStroked=val;
      this.render();
    }

    public get isBold():boolean{
      return this._text.isBold;
    }

     public setIsBold(val:boolean){
       this._text.isBold=val;
       this.render();
    }

     public get isItalic():boolean{
      return this._text.isItalic;
    }

     public setIsItalic(val:boolean){
       
       this._text.isItalic=val;
       this.render();
    }

    public get fontSize():number{
      return this._text.fontSize;
    }

     public setFontSize(val:number){
       this._text.fontSize=val;
       this.render();
    }

     public setTextAlignH(value: any){
      if(value || value==""){
        this._text.alignH=value;
        this.render();
      }
    }

    public get textAlignH(): string{
      return this._text.alignH;
    }
    public get textAlignV(): string{
      return this._text.alignV;
    }

     public setTextAlignV(value: any){
      if(value || value==""){
        this._text.alignV=value;
        this.render();
      }
    }


  public dispose(){

  }

 
}
