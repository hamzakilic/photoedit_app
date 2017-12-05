import { Injectable } from '@angular/core';


export class ClipboardData{
  static get Types(){
    return {Image:1};
  }
  private _type:number;
  private _data:any;
  private _insertTime:number;
  /**
   *
   */
  constructor(type:number,data:any) {
    this._data=data;
    this._type=type;
    this._insertTime=Date.now();
    
  }

  public get data(){return this._data;}
  public get type(){return this._type;}

}

@Injectable()
export class ClipboardService {
   private _data:Array<ClipboardData>;
  constructor() { 
    this._data=new Array<ClipboardData>();
  }

  public add(data:ClipboardData){
      if(data)
      this._data.unshift(data);
  }

  public hasAny(type?:number):boolean{
    if(type)//if any type bigger than zero
    return this._data.findIndex((item)=>item.type==type)>=0; //then find index and control index
    //else look at array length
    return this._data.length>0;
  }

  public get(type?:number):ClipboardData{
    if(!this.hasAny(type))
       return undefined;
       let index=this._data.findIndex((item)=>item.type==type);
       return this._data[index];

  }

  public remove(data):void{
    let index= this._data.findIndex((item)=>item ===data)
    if(index>=0){
      debugger;
     this._data.splice(index,1);
    }
  }

   

}
