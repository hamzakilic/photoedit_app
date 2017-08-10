import { Layer } from './layer';
import { Graphics } from '../../lib/graphics';
import { Callback } from '../../lib/callback';
import { HImage  } from '../../lib/image';
import { Rect} from '../../lib/draw/rect';
import { Text } from "../../entities/text";

export class LayerText extends Layer{

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
      
      this.graphics.drawString(this._text.data,this._text.color,this._text.fontFamily,this._text.fontSize,this._text.isBold,this._text.isItalic);
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


  public dispose(){

  }
}
