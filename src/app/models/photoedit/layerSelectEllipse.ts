import { Layer } from './layer';
import { LayerSelect } from './layerSelect';
import { Graphics } from '../../lib/graphics';
import { Callback } from '../../lib/callback';
import { HImage } from '../../lib/image';
import { Rect } from '../../lib/draw/rect';

import { Point } from '../../lib/draw/point';
import { RotationHelper, RotationMove } from './lib/rotationHelper';




export class LayerSelectEllipse extends LayerSelect {



  constructor(width: number, height: number, left: number, top: number) {
    super(width, height, left, top);

  }


  private clearRect(){
    let rect = new Rect(0, 0, this.width, this.height);
    this.graphics.clearRect(rect);
  }
  private drawEllipse(){
    let centerX = this.width / 2;
    let centerY = this.height / 2;    
  
    this.graphics.beginPath();
    this.graphics.lineWidth(2);
    this.graphics.strokeStyle(this.strokeStyle);
    this.graphics.fillStyle(this.fillStyle);
    this.graphics.ellipse(centerX,centerY,this.width/2,this.height/2,0,0,2*Math.PI);    
        
    this.graphics.fill();
    this.graphics.stroke();
    
  }

  public render(): void {
    this.graphics.save();
    this.clearRect();
    this.drawEllipse();    
    
    this.graphics.restore();
  }
  public dispose() {
    super.dispose();
  }

  protected renderAnimation():void{
    
    if(this.graphics){
     
    this.graphics.save();
    let rect = new Rect(0, 0, this.width, this.height);
    this.graphics.clearRect(rect);
    
    let splitSize=2;
    let totalParts=180;
    let lh=4;//linewidth
    
    this.frameCounter++;
    let dividen=this.frameCounter%totalParts;
    
    
        
    let centerX = this.width / 2;
    let centerY = this.height / 2; 
    this.graphics.strokeStyle(this.strokeStyle);   
    this.graphics.lineWidth(2);
    for(let x=0;x<totalParts;x+=1){     
      
        if((x+dividen)%2==0){
          this.graphics.beginPath();

          this.graphics.ellipse(centerX,centerY,this.width/2,this.height/2,0,x*splitSize*Math.PI/180,(x*splitSize+splitSize)*Math.PI/180);
          this.graphics.stroke();
        
      }
      
      
    }
   
    this.graphics.restore();
    setTimeout(()=>{
      if(this.animation)
     this.animation=window.requestAnimationFrame(()=>this.renderAnimation());
   },1000/3);
  
  }
}

  public selectedCss() {
    let classes = {
      divSelectedLayer: false,
      divCropLayer: true,
    };
    return classes;
  }
}
