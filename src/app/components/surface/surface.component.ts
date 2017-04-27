import { Component,OnChanges,DoCheck, OnInit,ViewChild,ElementRef, Input } from '@angular/core';

import {MessageBus} from '../../lib/messageBus';
import {Utility} from '../../lib/utility';
import {Graphics} from '../../lib/graphics';
import {Callback } from '../../lib/callback';
import { SurfaceCanvas } from '../../lib/surface'



@Component({
  selector: 'surface-component',
  templateUrl: './surface.component.html',
  styleUrls: ['./surface.component.scss']
})
export class SurfaceComponent  implements OnInit,OnChanges,DoCheck {

   uuid: string;


   @Input()
   surface: SurfaceCanvas;

  @ViewChild("renderCanvas") canvas: ElementRef;
  grphics: Graphics;
  constructor() {

    //create a uuid for component
    this.uuid = Utility.uuid();



   }

  ngOnInit() {

  }
  ngAfterViewInit(){




  }

  ngOnDestroy(){
    if(this.grphics)
      this.grphics.dispose();

  }
  ngOnChanges(changes){



  }
  ngDoCheck(){


  }
  ngAfterContentChecked(){



  }

  ngAfterViewChecked(){
    if(this.surface)
    if(!this.surface.resizedAgain)
      if(this.surface.width == this.canvas.nativeElement.width && this.surface.height == this.canvas.nativeElement.height){
        if(this.grphics)
            this.grphics.dispose();


        this.grphics = new Graphics(this.canvas,this.surface.width,this.surface.height,1);
        this.surface.resizedAgain = true;
        if(this.surface.whenWidthAndChanged)
            this.surface.whenWidthAndChanged.call(undefined);
      }


  }






}





