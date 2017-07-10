import { Component, OnInit, Input } from '@angular/core';
import { Layer } from '../../shared/project/layer';
import { LayerCrop } from '../../shared/project/layerCrop';
import { Callback } from '../../lib/callback';
import { Point } from '../../lib/draw/point';
import { Calc } from '../../lib/calc';

@Component({
  selector: 'layer-selected',
  templateUrl: './layer-selected.component.html',
  styleUrls: ['./layer-selected.component.scss']
})
export class LayerSelectedComponent implements OnInit {
  



  whichMouseOver: number;

  @Input()
  surface: Layer;
  constructor() {

  }

  ngOnInit() {
  }

  mouseOver(event: MouseEvent, which: number) {
    this.whichMouseOver = which;
  }
  mouseLeave(event: MouseEvent, which: number) {
    this.whichMouseOver = 0;
  }

 

  public get left(): Point {
    let y = (this.surface.height  / 2) + (this.surface.marginTop);
    let x = this.surface.marginLeft;
    let wmouse=(this.whichMouseOver == 1 ? 2 : 1);
    let point = Calc.rotatePoint(new Point(x, y), this.surface.rotateAngleDeg, new Point(this.surface.marginLeft + this.surface.width  / 2, this.surface.marginTop + this.surface.height / 2));

    return new Point(point.X * this.surface.scale - (this.surface.selectPointwh * wmouse / 2), point.Y * this.surface.scale - (this.surface.selectPointwh * wmouse / 2))
  }
    public get leftTop(): Point {
    let y = (this.surface.marginTop );
    let x = this.surface.marginLeft ;
    let wmouse=(this.whichMouseOver == 2 ? 2 : 1);
    let point = Calc.rotatePoint(new Point(x, y), this.surface.rotateAngleDeg, new Point(this.surface.marginLeft + this.surface.width  / 2, this.surface.marginTop + this.surface.height  / 2));

    return new Point(point.X*this.surface.scale - (this.surface.selectPointwh * wmouse / 2), point.Y*this.surface.scale - (this.surface.selectPointwh * wmouse / 2))
  }
   public get top(): Point {
    let y = (this.surface.marginTop);
    let x = this.surface.marginLeft +(this.surface.width)/2;
    let wmouse=(this.whichMouseOver == 3 ? 2 : 1);
    let point = Calc.rotatePoint(new Point(x, y), this.surface.rotateAngleDeg, new Point(this.surface.marginLeft + this.surface.width  / 2, this.surface.marginTop + this.surface.height  / 2));

    return new Point(point.X * this.surface.scale - (this.surface.selectPointwh * wmouse / 2), point.Y * this.surface.scale - (this.surface.selectPointwh * wmouse / 2))
  }
   public get rightTop(): Point {
    let y = (this.surface.marginTop );
    let x = this.surface.marginLeft +(this.surface.width);
    let wmouse=(this.whichMouseOver == 4 ? 2 : 1);
    let point = Calc.rotatePoint(new Point(x, y), this.surface.rotateAngleDeg, new Point(this.surface.marginLeft + this.surface.width  / 2, this.surface.marginTop + this.surface.height / 2));

    return new Point(point.X * this.surface.scale - (this.surface.selectPointwh * wmouse / 2), point.Y * this.surface.scale - (this.surface.selectPointwh * wmouse / 2))
  }

  public get right(): Point {
    let y = (this.surface.marginTop)+(this.surface.height)/2;
    let x = this.surface.marginLeft +(this.surface.width);
    let wmouse=(this.whichMouseOver == 5 ? 2 : 1);
    let point = Calc.rotatePoint(new Point(x, y), this.surface.rotateAngleDeg, new Point(this.surface.marginLeft + this.surface.width  / 2, this.surface.marginTop + this.surface.height  / 2));

    return new Point(point.X * this.surface.scale - (this.surface.selectPointwh * wmouse / 2), point.Y * this.surface.scale - (this.surface.selectPointwh * wmouse / 2))
  }
    public get rightBottom(): Point {
    let y = (this.surface.marginTop )+(this.surface.height);
    let x = this.surface.marginLeft +(this.surface.width);
    let wmouse=(this.whichMouseOver == 6 ? 2 : 1);
    let point = Calc.rotatePoint(new Point(x, y), this.surface.rotateAngleDeg, new Point(this.surface.marginLeft + this.surface.width  / 2, this.surface.marginTop + this.surface.height  / 2));

    return new Point(point.X * this.surface.scale - (this.surface.selectPointwh * wmouse / 2), point.Y * this.surface.scale - (this.surface.selectPointwh * wmouse / 2));
  }

   public get bottom(): Point {
    let y = (this.surface.marginTop )+(this.surface.height);
    let x = this.surface.marginLeft +(this.surface.width)/2;
    let wmouse=(this.whichMouseOver == 7 ? 2 : 1);
    let point = Calc.rotatePoint(new Point(x, y), this.surface.rotateAngleDeg, new Point(this.surface.marginLeft + this.surface.width  / 2, this.surface.marginTop + this.surface.height  / 2));

    return new Point(point.X * this.surface.scale - (this.surface.selectPointwh * wmouse / 2), point.Y *  this.surface.scale  - (this.surface.selectPointwh * wmouse/ 2))
  }

   public get leftBottom(): Point {
    let y = (this.surface.marginTop)+(this.surface.height);
    let x = this.surface.marginLeft;
    let wmouse=(this.whichMouseOver == 8 ? 2 : 1);
    let point = Calc.rotatePoint(new Point(x, y), this.surface.rotateAngleDeg, new Point(this.surface.marginLeft + this.surface.width / 2, this.surface.marginTop + this.surface.height  / 2));

    return new Point(point.X * this.surface.scale - (this.surface.selectPointwh * wmouse / 2), point.Y * this.surface.scale - (this.surface.selectPointwh * wmouse / 2))
  }

  cssclass(val: number){
    return "cursorns";
  }

   public selectedCss(val:number) {
     let classes =  {
            divSelectedLayer: !(this.surface instanceof LayerCrop) ,
            divCropLayer: (this.surface instanceof LayerCrop),            
            cursornwse: false,
            cursornesw: false,            
            cursorew: false,
            cursorns:false
  
        };
        this.calculateCursor(classes,val);
        return classes;
   }

   private calculateCursor(instance: any, val:number){
        switch(val){
          case 1://left side
          case 5://left side
          this.calculateCursor15(instance);break;
           case 3: //top side
           case 7: //bottom side
          this.calculateCursor37(instance);break;           
          
          default:break;
        }
   }

   private calculateCursor15(instance:any){
      let angle=this.surface.rotateAngleDeg;
    

      if(angle>=-180 && angle<=-160){
        instance.cursorew = true;
      }
      if(angle>-160 && angle<=-100){
        instance.cursornwse = true;
      }
       if(angle>-100 && angle<=-80){
        instance.cursorns = true;
      }
      if(angle>-80 && angle<=-10){
        instance.cursornesw = true;
      }      
      if(angle>-10 && angle<=10){
        instance.cursorew = true;
      }
      if(angle>10 && angle<=80){
        instance.cursornwse = true;
      }
      if(angle>80 && angle<=100){
        instance.cursorns = true;
      }
       if(angle>100 && angle<=160){
        instance.cursornesw = true;
      }
      if(angle>160 && angle<=180){
        instance.cursorew = true;
      }
   }


    private calculateCursor37(instance:any){
      let angle=this.surface.rotateAngleDeg;
      

      if(angle>=-180 && angle<=-160){
        instance.cursorns = true;
      }
      if(angle>-160 && angle<=-100){
        instance.cursornesw = true;
      }
       if(angle>-100 && angle<=-80){
        instance.cursorew = true;
      }
      if(angle>-80 && angle<=-10){
        instance.cursornesw = true;
      }      
      if(angle>-10 && angle<=10){
        instance.cursorns = true;
      }
      if(angle>10 && angle<=60){
        instance.cursornesw = true;
      }
      if(angle>60 && angle<=100){
        instance.cursorew = true;
      }
       if(angle>100 && angle<=160){
        instance.cursornwse = true;
      }
      if(angle>160 && angle<=180){
        instance.cursorns = true;
      }
   }
 

 




}
