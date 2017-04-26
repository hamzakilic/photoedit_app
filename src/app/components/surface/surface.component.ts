import { Component,OnChanges,DoCheck, OnInit,ViewChild,ElementRef, Input } from '@angular/core';

import {MessageBus} from '../../lib/messageBus';
import {Utility} from '../../lib/utility';
import {Graphics} from '../../lib/graphics';
import {Callback } from '../../lib/callback';




@Component({
  selector: 'surface-component',
  templateUrl: './surface.component.html',
  styleUrls: ['./surface.component.scss']
})
export class SurfaceComponent implements OnInit,OnChanges,DoCheck {
   width: number;
   height: number;
   stwidth:number;
   stheight:number;
   uuid: string;
   scale: number;
   private initFunc: Callback;
   private initialized:boolean;




  @ViewChild("renderCanvas") canvas: ElementRef;
  grphics: Graphics;
  constructor() {
    this.width = 0;
    this.height = 0;
    this.stwidth=this.width;
    this.stheight=this.height;

    //create a uuid for component
    this.uuid = Utility.uuid();
    this.scale = 1;
    this.initialized = false;

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

    if(!this.initialized && this.width>0)
      if(this.width == this.canvas.nativeElement.width && this.height == this.canvas.nativeElement.height){
        if(this.grphics)
        this.grphics.dispose();
        this.initialized = true;
        this.grphics = new Graphics(this.canvas,this.width,this.height,1);

        if(this.initFunc){
          this.initFunc.call(undefined);
        }
      }


  }
  public scalePlus():void{
      this.scale *= 1.1;
      if(this.scale>5)
        this.scale = 5;
      this.stwidth = this.scale* this.width;
      this.stheight = this.scale * this.height;
      this.grphics.scale = this.scale;
  }
  public scaleMinus():void{
      this.scale *= 0.9;
      if(this.scale<0.1)
        this.scale = 0.1;
      this.stwidth = this.scale* this.width;
      this.stheight = this.scale * this.height;
      this.grphics.scale = this.scale;
  }

  public setWidthHeight(width:number,height:number,func?: Callback): void {

      this.width = width;
      this.height = height;
      this.scale = 1;
      this.stwidth = this.width;
      this.stheight = this.height;
      this.initFunc =func;
      this.initialized =false;



  }



}





