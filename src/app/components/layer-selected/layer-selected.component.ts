import { Component, OnInit,Input } from '@angular/core';
import { Layer } from '../../shared/project/layer';
import { Callback }from '../../lib/callback';
@Component({
  selector: 'layer-selected',
  templateUrl: './layer-selected.component.html',
  styleUrls: ['./layer-selected.component.scss']
})
export class LayerSelectedComponent implements OnInit {
  @Input()
  surface: Layer;
  constructor() {

  }

  ngOnInit() {
  }


}
