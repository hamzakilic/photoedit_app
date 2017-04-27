import { Component, OnInit, Input } from '@angular/core';
import { SurfaceComponent } from '../surface/surface.component';
import { Layer } from '../../shared/project/layer';

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



}
