

import { Layer } from './layer';
import { Graphics } from '../../lib/graphics';

import { HImage } from '../../lib/image';
import { Rect } from '../../lib/draw/rect'

export class LayerBackground extends Layer {

  private pattern: any;
  private patterns:Array<any>;
  private patternsIndex:number;
  
  constructor(name?: string) {
    super(name);
    this.canRotate = false;
    this.patternsIndex=-1;
    this.patterns=[];
    this.patterns.push([255,255,255,255,180,180,180,255]);
    this.patterns.push([0,0,0,255,100,100,100,255]);
    this.patterns.push([0,255,255,255,255,51,204,255]);
    this.patterns.push([0,102,0,255,255,153,0,255]);
    this.patterns.push([255,255,204,255,50,50,150,255]);
    this.patterns.push([150,50,0,255,100,150,150,255]);
    this.patterns.push([200,150,255,255,0,100,0,255]);

  }
  public createInstanceForClone(){
    return new LayerBackground(this.name);    
  }
  private lastScaleValue = 0;
  private createPattern(graphics: Graphics,recalculate:boolean=false): boolean {
    this.patternsIndex++;
    if(this.patternsIndex>=this.patterns.length)
      this.patternsIndex=0;
    let p=this.patterns[this.patternsIndex];
    let a = [p[0], p[1], p[2], p[3]]
    let b = [p[4],p[5],p[6],p[7]];

    let array = [];

    if (this.lastScaleValue == this.scale && recalculate==false)
      return false;
    this.lastScaleValue = this.scale;
    let count=Math.round((this.scale<5?(5-this.scale):0)+1);
    
    for(let xt=0;xt<count;++xt){
    for(let x=0;x<count;++x){
      a.forEach(item => array.push(item));      
    }
    for(let x=0;x<count;++x){
      b.forEach(item => array.push(item));      
    }
  }
  for(let xt=0;xt<count;++xt){
    for(let x=0;x<count;++x){
      b.forEach(item => array.push(item));      
    }
    for(let x=0;x<count;++x){
      a.forEach(item => array.push(item));      
    }
  }
 




    let data = new Uint8ClampedArray(array);

    let imageData = new ImageData(data, Math.sqrt(array.length/4), Math.sqrt(array.length/4));

    window.createImageBitmap(imageData).then((bitmap) => {

      this.pattern = graphics.createPattern(bitmap, "");
      this.render();


    }).catch((ex) => {

      //TODO: exception durumu handle edilmeli
    });
    return true;
  }
  public changeColors(){
    
    this.createPattern(this.graphics,true);
    this.render();

  }

  public render(): void {
    
      if(!this.pattern)
          this.createPattern(this.graphics,true);
    

       this.graphics.fillRect(new Rect(0, 0, this.width, this.height), this.pattern)

  }


  public dispose() {
    
      if(this.graphics)
      this.graphics.dispose();
  }
}
