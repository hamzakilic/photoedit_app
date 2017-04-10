
import {callback as iskilip_callback} from 'iskilip/core/callback';


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
  public clickFunc: iskilip_callback;

  constructor(name: string,clickfunc:iskilip_callback ){
    this.name = name;
    this.disabled = false;
    this.clickFunc = clickfunc;

  }
  onClick(parameters?:any): void{
    this.clickFunc.call(parameters);
  }
}
