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
   ngAfterContentChecked(){
    

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
      // console.log(`checking layer:${this.surface.name} sw:${this.surface.width.extFloor()} -> cw:${this.canvas.nativeElement.width} sh:${this.surface.height.extFloor()} ch:${this.canvas.nativeElement.height} `);
      if(this.surface.width.extToInt32() === this.canvas.nativeElement.width && this.surface.height.extToInt32() === this.canvas.nativeElement.height){
        this.initAgain(callrender);

      }
       
     }else     
     if(this.surface.createAgain){
     // console.log(`checking2 layer:${this.surface.name} sw:${this.surface.width.extFloor()} -> cw:${this.canvas.nativeElement.width} sh:${this.surface.height.extFloor()} ch:${this.canvas.nativeElement.height} `);
     if(this.surface.width.extToInt32() === this.canvas.nativeElement.width && this.surface.height.extToInt32() === this.canvas.nativeElement.height)
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
     if (this.surface.whenCreatedGraphicsAgain && callwhen){
       //console.log(`${this.surface.name}:rendering again`);
      // console.log(`checking layer:${this.surface.name} sw:${this.surface.width} -> cw:${this.canvas.nativeElement.width} sh:${this.surface.height} ch:${this.canvas.nativeElement.height} `);
       this.surface.whenCreatedGraphicsAgain.call(undefined);
     }
   }
 }
  

   






