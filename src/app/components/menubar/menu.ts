
import {Callback } from '../../lib/callback';


export class menu{
  public name:string;
  public childs: any[];
  public disabled: boolean;
  public isOpen: false;
  constructor(name: string){
    this.name = name;
    this.childs = [];
    this.disabled = false;
    this.isOpen = false;
  }
  public close($event: MouseEvent){
    $event.preventDefault();
    $event.stopPropagation();
    this.isOpen = false;
  }

}


export class menuItem{
  public name:string;
  public disabled: boolean;
  public clickFunc: Callback;
  public isDivider: boolean;
  
  constructor(name: string,clickfunc:Callback ){
    this.name = name;
    this.disabled = false;
    this.clickFunc = clickfunc;
    this.isDivider = false;
    
  }
  onClick(parameters?:any): void{

    this.clickFunc.call(parameters);
  }
}


