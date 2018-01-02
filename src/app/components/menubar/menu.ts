
import { ShortCut } from './../../services/keyboard.service';

import {Callback } from '../../lib/callback';


export class Menu{
  public name:string;  
  public childs: any[];
  
  public isOpen: false;
  public isDisabledCallback:Callback;
  constructor(name: string){
    this.name = name;
    this.childs = [];
  
    this.isOpen = false;
    this.isDisabledCallback=undefined;
    
  }
  public close($event: MouseEvent){
    $event.preventDefault();
    
    this.isOpen = false;
  }
  
  public get disabled():boolean{
      if(!this.isDisabledCallback)
      return false;
      return this.isDisabledCallback.call(undefined);
  }

  

}


export class MenuItem{
  public name:string;
  public isDisabledCallback:Callback;
  public clickFunc: Callback;
  public isDivider: boolean;
  public shortCut:ShortCut
  constructor(name: string,clickfunc:Callback,shortCut?:ShortCut ){
    this.name = name;
    this.isDisabledCallback=undefined;
    this.clickFunc = clickfunc;
    this.isDivider = false;
    
    this.shortCut=shortCut;
    if(shortCut){
      this.shortCut.callback=Callback.from(()=>this.onClick(undefined));
      this.shortCut.desc=this.name;
    }
    
    
    
  }


  public get disabled():boolean{
    if(!this.isDisabledCallback)
    return false;
    return this.isDisabledCallback.call(undefined);
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


