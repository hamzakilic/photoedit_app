import { Component, OnInit,Input } from '@angular/core';
import { Layer } from '../../shared/project/layer';
import { Callback }from '../../lib/callback';
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

  mouseOver(event: MouseEvent,which: number){
    this.whichMouseOver = which;
  }
  mouseLeave(event:MouseEvent, which: number){
    this.whichMouseOver = 0;
  }


}
