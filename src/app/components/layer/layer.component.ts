import { Graphics } from './../../lib/graphics';
import { Rect } from './../../lib/draw/rect';
import { Surface } from './../../models/photoedit/surface';
import { Component, OnInit, Input, ViewChild, ElementRef, OnChanges, DoCheck } from '@angular/core';
import { SurfaceComponent } from '../surface/surface.component';
import { Layer } from '../../models/photoedit/layer';
import { Callback }from '../../lib/callback';

@Component({
  selector: 'layer-component',
  templateUrl: './layer.component.html',
  styleUrls: ['./layer.component.scss']
})
export class LayerComponent extends SurfaceComponent  implements OnInit,OnChanges,DoCheck  {


  @Input()
  surface: Layer
  @ViewChild("renderCanvas")
  canvas: ElementRef;

  constructor() {
    super()

   }

   ngOnInit(){
    this.checkAgain(true);

   }
   ngDoCheck(){

   }

   ngAfterViewChecked(){     
     this.checkAgain(true);
   }
   ngOnChanges(){
     
   }
   
   
   public showSelected(){
    return this.surface.isSelected && this.surface.showSelected && this.surface.canResizeOrRotate;
   }


   protected checkAgain(callrender:boolean=false){
    //width ve height değiştirilde
     //canvas elementinden yeni bir graphics nesnesi üretmek gerekiyor
     //resize edildiğinde yeni bir graphics oluşturmak gerekiyor
     if(this.surface)
     if(!this.surface.resizedAgain){
       if(Math.floor(this.surface.width) === this.canvas.nativeElement.width && Math.floor(this.surface.height) === this.canvas.nativeElement.height){
         this.initAgain(callrender);
 
 
       }
     }
     if(this.surface)
     if(this.surface.createAgain){
       this.initAgain(callrender);
     }
 
  }
 
 
 
 
 
   protected initAgain(callwhen:boolean=false) {
     if (this.grphics)
       this.grphics.dispose();
     //burada graphics nesnesi oluşturulur
     this.grphics = new Graphics(this.canvas.nativeElement, this.surface.width, this.surface.height, this.surface.scale);
     if(callwhen){
     this.surface.resizedAgain = true;
     this.surface.createAgain=false;
     }
     //çok önemli
     //burada surface nesnesinin graphics nesnesine atama yapılıyor
     //neticede biz diğer
     this.surface.graphics = this.grphics;
     this.surface.htmlElement = this.canvas;
     if (this.surface.whenCreatedGraphicsAgain && callwhen)
       this.surface.whenCreatedGraphicsAgain.call(undefined);
   }
 }
  

   






