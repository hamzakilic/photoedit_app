import { Rect } from './../../lib/draw/rect';
import { Surface } from './../../models/photoedit/surface';
import { Component, OnInit, Input, ViewChild, ElementRef } from '@angular/core';
import { SurfaceComponent } from '../surface/surface.component';
import { Layer } from '../../models/photoedit/layer';
import { Callback }from '../../lib/callback';

@Component({
  selector: 'layer-component',
  templateUrl: './layer.component.html',
  styleUrls: ['./layer.component.scss']
})
export class LayerComponent extends SurfaceComponent  {


  @Input()
  surface: Layer
  @ViewChild("renderCanvas")
  canvas: ElementRef;

  constructor() {
    super()

   }

   ngOnInit(){

     this.surface.whenCreatedGraphicsAgain= new Callback(()=>(this.surface.render()));
     this.surface.htmlElement=this.canvas;

   }
   
   public showSelected(){
    return this.surface.isSelected && this.surface.showSelected && this.surface.canResizeOrRotate;
   }
  

   





}
