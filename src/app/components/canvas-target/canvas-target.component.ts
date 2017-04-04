import { Component, OnInit,ViewChild,ElementRef, Input } from '@angular/core';
import {messageBus} from '../../lib/messageBus';
import {utility} from '../../lib/utility';
import {graphics} from '../../lib/graphics';

@Component({
  selector: 'component-canvas-target',
  templateUrl: './canvas-target.component.html',
  styleUrls: ['./canvas-target.component.scss']
})
export class CanvasTargetComponent implements OnInit {
  width: number;
  height: number;
  uuid: string;
  //we will use this for reaching to a component with name
  @Input() name: string;

  @ViewChild("renderCanvas") canvas: ElementRef;
  grphics: graphics;
  constructor() {
    this.width = 50;
    this.height = 50;
    //create a uuid for component
    this.uuid = utility.uuid();

   }

  ngOnInit() {

  }
  ngAfterViewInit(){
   if(this.name)
        //if this canvas has a name add to singleton dictionary for later reaching
        canvasTargetComponentsDictionary.add(name,this);
    this.grphics = new graphics(this.canvas);


  }

  ngOnDestroy(){

  }

  public setWidthHeight(width:number,height:number): void {
      this.width = width;
      this.height = height;
  }
  public clear(): void {

  }


}


/**
 * a static class for following every @see CanvasTargetComponent
 *
 */
export class canvasTargetComponentsDictionary{
    private static dic: Map<string,CanvasTargetComponent>;

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
