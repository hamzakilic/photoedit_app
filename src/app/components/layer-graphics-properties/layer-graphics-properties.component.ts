import { Component, OnInit, Input, ViewChild } from '@angular/core';
import { LayerGraphics } from "../../models/photoedit/layerGraphics";
import { ColorPickerComponent } from '../../modulesext/color-picker/index';

@Component({
  selector: 'layer-graphics-properties',
  templateUrl: './layer-graphics-properties.component.html',
  styleUrls: ['./layer-graphics-properties.component.scss']
})
export class LayerGraphicsPropertiesComponent implements OnInit {

   @Input()
  layer: LayerGraphics;
  @ViewChild('colorpicker') colorpicker:ColorPickerComponent;

  private color:string;
  
  constructor() { }

  ngOnInit() {
    this.color="rgba(255,255,255,1)";
    this.calculateForegroundColor();
  }

  hasBackground():boolean{
    return this.layer.backgroundColor!=undefined;
  }
  get disabled():boolean{
    return this.layer.backgroundColor==undefined
  }

  changeHasBackgroundColor(event:any){
    if(event.target.checked)
      this.layer.backgroundColor=this.color;
    else this.layer.backgroundColor=undefined;
  }

  get backgroundColor():string{
    
    if(this.layer.backgroundColor)
      return this.layer.backgroundColor;
    return "rgba(255,255,255,1)";
  }
  

  calculateForegroundColor():string{
    
    let temp=this.color.replace("rgba(","").replace("rgb(","").replace(")","");
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
  foregroundcolor:string

  changeBackgroundColor(val:string){
    
      this.color=val;
      this.layer.backgroundColor=this.color;
      this.foregroundcolor=this.calculateForegroundColor();

  }

  openColorPicker(){
    this.colorpicker.openDialog(this.layer.backgroundColor);
  }

}
