import { Component, OnInit, Input } from '@angular/core';
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

  constructor() {
    super()

   }

   ngOnInit(){

     this.surface.whenCreatedGraphicsAgain= new Callback(()=>(this.surface.render()));

   }
   ngDoCheck(){

   }





}
