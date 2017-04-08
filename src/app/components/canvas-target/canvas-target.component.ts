import { Component,OnChanges,DoCheck, OnInit,ViewChild,ElementRef, Input } from '@angular/core';
import {messageBus} from '../../lib/messageBus';
import {utility} from '../../lib/utility';
import {graphics} from '../../lib/graphics';

@Component({
  selector: 'component-canvas-target',
  templateUrl: './canvas-target.component.html',
  styleUrls: ['./canvas-target.component.scss']
})
export class CanvasTargetComponent implements OnInit,OnChanges,DoCheck {
   width: number;
   height: number;
   stwidth:number;
   stheight:number;
   uuid: string;
   scale: number;
   private lastWidth:number
   private lastHeight:number;
   private widthOrheightChanged: boolean;
  //we will use this for reaching to a component with name
  @Input() name: string;


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
   }

  ngOnInit() {

  }
  ngAfterViewInit(){
   if(this.name)
        //if this canvas has a name add to singleton dictionary for later reaching
    canvasTargetComponentsDictionary.add(this.name,this);

    //this.grphics = new graphics(this.canvas,this.width,this.height);
    //ebugger;

  }

  ngOnDestroy(){

  }
  ngOnChanges(changes){

    //console.log('ngonchanges');

  }
  ngDoCheck(){

    //console.log('ngdocheck');
  }
  ngAfterContentChecked(){

    //console.log('ngAfterContentChecked');

  }

  ngAfterViewChecked(){

    if(this.lastWidth!= this.width || this.lastHeight != this.height){
      if(this.width == this.canvas.nativeElement.width && this.height == this.canvas.nativeElement.height){
        this.grphics = new graphics(this.canvas,this.width,this.height);
        this.lastWidth = this.width;
        this.lastHeight = this.height;
        console.log("canvas size changed");
        if(this.func)
        this.func();
      }
    }

  }
  public scalePlus():void{
      this.scale *= 1.1;
      if(this.scale>5)
        this.scale = 5;
      this.stwidth = this.scale* this.width;
      this.stheight = this.scale * this.height;
  }
  public scaleMinus():void{
      this.scale *= 0.9;
      if(this.scale<0.1)
        this.scale = 0.1;
      this.stwidth = this.scale* this.width;
      this.stheight = this.scale * this.height;
  }
  private func: any;

  public setWidthHeight(width:number,height:number,func?: any): void {
      this.lastWidth=this.width;
      this.lastHeight =this.height;
      this.width = width;
      this.height = height;
      this.scale = 1;
      this.stwidth = this.width;
      this.stheight = this.height;
      this.func =func;



  }



}


/**
 * a static class for following every @see CanvasTargetComponent
 *
 */
export class canvasTargetComponentsDictionary{
    private static dic: Map<string,CanvasTargetComponent> = new Map<string,CanvasTargetComponent>();

    /**
     *
     * @param name name of component
     * @param component
     */
    public static add(name: string,component: CanvasTargetComponent){
      if(name && component)
      if(!canvasTargetComponentsDictionary.dic.has(name)){
        canvasTargetComponentsDictionary.dic.set(name,component);

      }
    }

    /**
     *
     * @param name name of canvas target component
     */
    public static remove(name: string){
      if(name){
         if(canvasTargetComponentsDictionary.dic.has(name))
        canvasTargetComponentsDictionary.dic.delete(name);

      }

    }

    public static contains(name: string):boolean{
        return canvasTargetComponentsDictionary.dic.has(name)
      }


/**
 *
 * @param name name of canvas component
 * @returns if has a canvas with parameter name returns canvas else returns undefined
 */
    public static get(name:string): CanvasTargetComponent{
      if(name){
        if(canvasTargetComponentsDictionary.dic.has(name)){
          return canvasTargetComponentsDictionary.dic.get(name);
        }
      }
      return undefined;
    }
}
