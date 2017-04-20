import { Component,OnChanges,DoCheck, OnInit,ViewChild,ElementRef, Input } from '@angular/core';

import {messageBus} from '../../lib/messageBus';
import {utility} from '../../lib/utility';
import {graphics} from '../../lib/graphics';
import {callback as iskilip_callback } from 'iskilip/core/callback.d';




@Component({
  selector: 'canvasTarget',
  templateUrl: './canvas.component.html',
  styleUrls: ['./canvas.component.scss']
})
export class CanvasComponent implements OnInit,OnChanges,DoCheck {
   width: number;
   height: number;
   stwidth:number;
   stheight:number;
   uuid: string;
   scale: number;
   private initFunc: iskilip_callback;
   private initialized:boolean;




  @ViewChild("renderCanvas") canvas: ElementRef;
  grphics: graphics;
  constructor() {
    this.width = 0;
    this.height = 0;
    this.stwidth=this.width;
    this.stheight=this.height;

    //create a uuid for component
    this.uuid = utility.uuid();
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
        this.grphics = new graphics(this.canvas,this.width,this.height,1);

        if(this.initFunc)
          this.initFunc.call(undefined);
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

  public setWidthHeight(width:number,height:number,func?: iskilip_callback): void {

      this.width = width;
      this.height = height;
      this.scale = 1;
      this.stwidth = this.width;
      this.stheight = this.height;
      this.initFunc =func;
      this.initialized =false;



  }



}





