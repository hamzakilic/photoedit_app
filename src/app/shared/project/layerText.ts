import { Layer } from './layer';
import { Graphics } from '../../lib/graphics';

import { HImage  } from '../../lib/image';
import { Rect} from '../../lib/draw/rect';

export class LayerText extends Layer{

  private _text: string;
  private _fontName:string;
  private _fontSize:number;
  constructor(text,fontName:string="Arial",fontSize:number=10,name?: string) {
    super(name);

    this.sourceMask=new Rect(0,0,300,50);
    this.width = 300;
    this.height = 50;
    this.canRotate = true;
         
    this._text=text;
    this._fontName=fontName;
    this._fontSize=fontSize;
  }
  public render(): void{
      this.graphics.save();
      
      this.graphics.drawString(this.text,this._fontName,this._fontSize);
      this.graphics.restore();
  
    }

    public setText(value: string){
      this._text=value;
      this.resizedAgain =false;
    }

    public get text(): string{
      return this._text;
    }

  public dispose(){

  }
}
