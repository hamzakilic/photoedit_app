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
  public callback: any;
  constructor(name: string,func:any){
    this.name = name;
    this.disabled = false;
    this.callback= func;
  }
}
