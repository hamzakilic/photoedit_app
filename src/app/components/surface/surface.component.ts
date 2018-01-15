import { Component,OnChanges,DoCheck, OnInit,ViewChild,ElementRef, Input } from '@angular/core';

import {MessageBus} from '../../lib/messageBus';
import {Utility} from '../../lib/utility';
import {Graphics} from '../../lib/graphics';
import {Callback } from '../../lib/callback';
import { SurfaceCanvas } from '../../models/photoedit/surface'



@Component({
  selector: 'surface-component',
  templateUrl: './surface.component.html',
  styleUrls: ['./surface.component.scss']
})
export class SurfaceComponent  {

  // uuid: string;


   @Input()
   surface: SurfaceCanvas;

  @ViewChild("renderCanvas") canvas: ElementRef;
  protected grphics: Graphics;
  constructor() {

    //create a uuid for component
   // this.uuid = Utility.uuid();



   }


}





