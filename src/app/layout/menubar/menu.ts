



import {callback as iskilip_core_callback} from 'iskilip/core/callback';




export class menu{
  public name:string;
  public childs: menuItem[];
  public disabled: boolean;
  constructor(name: string){
    this.name = name;
    this.childs = [];
    this.disabled = false;
  }

}


export class menuItem{
  public name:string;
  public disabled: boolean;
  public callbackFunc: any;
  constructor(name: string,func:iskilip_core_callback){
    this.name = name;
    this.disabled = false;
    this.callbackFunc= func;

  }
}
