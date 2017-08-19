import { Component, OnInit,Input } from '@angular/core';
import { LayerGraphics } from "../../models/photoedit/layerGraphics";

@Component({
  selector: 'layer-graphics-properties',
  templateUrl: './layer-graphics-properties.component.html',
  styleUrls: ['./layer-graphics-properties.component.scss']
})
export class LayerGraphicsPropertiesComponent implements OnInit {

   @Input()
  layer: LayerGraphics;

  private color:string;
  
  constructor() { }

  ngOnInit() {
    this.color="#000000";
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
    return "#FFFFFF";
  }

  calculateForegroundColor():string{
    
    let color= "#FF"+ this.color.substring(3,5)+"0F";
   
    return color;
     
  }

  changeBackgroundColor(val:string){
      this.color=val;
      this.layer.backgroundColor=this.color;

  }

}
