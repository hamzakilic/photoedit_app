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
    //width ve height değiştirilde
    //canvas elementinden yeni bir graphics nesnesi üretmek gerekiyor

    if(this.surface)
    if(!this.surface.resizedAgain)
      if(Math.floor(this.surface.width) == this.canvas.nativeElement.width && Math.floor(this.surface.height) === this.canvas.nativeElement.height){
        if(this.grphics)
            this.grphics.dispose();

            //burada graphics nesnesi oluşturulur

        this.grphics = new Graphics(this.canvas,this.surface.width,this.surface.height,this.surface.scale);
        this.surface.resizedAgain = true;
        //çok önemli
        //burada surface nesnesinin graphics nesnesine atama yapılıyor
        //neticede biz diğer
        this.surface.graphics=this.grphics;
        if(this.surface.whenCreatedGraphicsAgain)
           this.surface.whenCreatedGraphicsAgain.call(undefined);


      }


  }






}





