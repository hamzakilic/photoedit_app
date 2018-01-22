import { Component, OnInit, Input, ViewChild } from '@angular/core';
import { LayerGraphics } from "../../models/photoedit/layerGraphics";
import { ColorPickerComponent } from '../../modulesext/color-picker/index';

@Component({
  selector: 'layer-color-properties',
  templateUrl: './layer-color-properties.component.html',
  styleUrls: ['./layer-color-properties.component.scss']
})
export class LayerColorPropertiesComponent implements OnInit {

   @Input()
  layer: LayerGraphics;
  @ViewChild('colorpickerbackground') colorpickerBackground:ColorPickerComponent;
  @ViewChild('colorpickerforeground') colorpickerForeground:ColorPickerComponent;

  private colorBack:string;
  private colorFore:string;
  foregroundcolorBack:string;
  foregroundcolorFore:string;

  constructor() { }

  ngOnInit() {
    this.colorBack="rgba(0,0,0,1)";
    this.colorFore="rgba(255,255,255,1)";
    this.foregroundcolorBack= this.calculateForegroundColor(this.colorBack);
    this.foregroundcolorFore=this.calculateForegroundColor(this.colorFore);
  }

  get hasBackground():boolean{
    return !(this.layer.backgroundPattern===undefined);
  }

  get hasForeground():boolean{
    return !(this.layer.foregroundPattern===undefined);
  }
  get disabledBackground():boolean{
    return this.layer.backgroundPattern==undefined
  }

  get disabledForeground():boolean{
    return this.layer.foregroundPattern==undefined
  }

  changeHasBackgroundColor(event:any){
    if(event.target.checked)
      this.layer.backgroundPattern=this.colorBack;
    else this.layer.backgroundPattern=undefined;
  }

  changeHasForegroundColor(event:any){
    if(event.target.checked)
      this.layer.foregroundPattern=this.colorFore;
    else this.layer.foregroundPattern=undefined;
  }

  get backgroundColor():string{
    
    if(this.layer.backgroundPattern)
      return this.layer.backgroundPattern;
    return "rgba(255,255,255,1)";
  }

  get foregroundColor():string{
    
    if(this.layer.foregroundPattern)
      return this.layer.foregroundPattern;
    return "rgba(255,255,255,1)";
  }
  

  calculateForegroundColor(clr:string):string{
    
    let temp=clr.replace("rgba(","").replace("rgb(","").replace(")","");
    let rgba= temp.split(/,/);
    if(rgba.length>=3){
      let color="rgba(";
      let r=parseInt(rgba[0]);
      if(Number.isInteger(r)){
        color+=(255-r);
        let g=parseInt(rgba[1]);
        if(Number.isInteger(g)){
          color+=","+(255-g);
          let b=parseInt(rgba[2]);
          if(Number.isInteger(b)){
            color+=","+(255-b);
            
          }
          return color+=",1)";
        }
      }
    }
    
   
    return "rgba(255,0,255,1)";
     
  }

  

  changeBackgroundColor(val:string){
    
      this.colorBack=val;
      this.layer.backgroundPattern=this.colorBack;
      this.foregroundcolorBack=this.calculateForegroundColor(this.colorBack);

  }

  openColorPickerBackground(){
    this.colorpickerBackground.openDialog(this.layer.backgroundPattern);
  }


  changeForegroundColor(val:string){
    
    this.colorFore=val;
    this.layer.foregroundPattern=this.colorFore;
    this.foregroundcolorFore=this.calculateForegroundColor(this.colorFore);

}

openColorPickerForeground(){
  this.colorpickerForeground.openDialog(this.layer.foregroundPattern);
}

}
