import { Component, OnInit, Input } from '@angular/core';

import { Layer } from "../../shared/project/layer";
import { LayerText } from "../../shared/project/layerText";

@Component({
  selector: 'layer-text-properties',
  templateUrl: './layer-text-properties.component.html',
  styleUrls: ['./layer-text-properties.component.scss']
})
export class LayerTextPropertiesComponent implements OnInit {

  @Input()
  layer: LayerText;
  constructor() { }

  ngOnInit() {
  }

  changeText(value: any, layer: LayerText){
    if(value)
    layer.setText(value);
  }

}
