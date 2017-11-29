
import { ShortCut } from './../../services/keyboard.service';

import {Callback } from '../../lib/callback';


export class Menu{
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


export class MenuItem{
  public name:string;
  public disabled: boolean;
  public clickFunc: Callback;
  public isDivider: boolean;
  public shortCut:ShortCut
  constructor(name: string,clickfunc:Callback,shortCut?:ShortCut ){
    this.name = name;
    this.disabled = false;
    this.clickFunc = clickfunc;
    this.isDivider = false;
    
    this.shortCut=shortCut;
    if(shortCut){
      this.shortCut.callback=new Callback(()=>this.onClick(undefined));
      this.shortCut.desc=this.name;
    }
    
    
    
  }
  public get shortCutName():string{
    if(this.shortCut){
        let str=[];
        if(this.shortCut.isShift)
        str.push('Shift');
        if(this.shortCut.isCtrl)
        str.push('Ctrl');
        if(this.shortCut.isAlt)
        str.push('Alt');
        str.push(this.shortCut.key)
        return str.join("+");
        
    }
    return "";
  }
  onClick(parameters?:any): void{

    this.clickFunc.call(parameters);
  }
}


