import { Layer } from './layer';
import { Graphics } from '../../lib/graphics';

import { HImage  } from '../../lib/image';
import  { Rect } from '../../lib/draw/rect'

export class LayerBackground extends Layer{



  constructor(name?: string) {
    super(name);
    this.canRotate = false;

  }

 
  public render(): void{


    this.graphics.fillRect(new Rect(0,0,this.width,this.height),'#FFFFFF')
    
   
    let scaler=Math.floor(10/this.scale);
    if(this.height>100 || this.width >100)
    scaler=10;
    
    this.graphics.setGlobalAlpha(0.7);
    let color="#ccc9c9";
    
    for(let y=0;y<=Math.ceil(this.height/scaler);y+=1){
      for(let x=0;x<=Math.ceil(this.width/scaler);x+=1){
          let currentCell=x+y;
        if((currentCell)%2==0)
        this.graphics.fillRect(new Rect(x*scaler,y*scaler,scaler,scaler),color);
    
      }
    }
  }

  public dispose(){

  }
}
