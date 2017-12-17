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
   private _data:ClipboardData;
  constructor() { 
    this._data=undefined;
  }

  public set(data:ClipboardData){
      
      this._data=data;
  }

  /* public hasAny(type?:number):boolean{
    if(type)//if any type bigger than zero
    return this._data.findIndex((item)=>item.type==type)>=0; //then find index and control index
    //else look at array length
    return this._data.length>0;
  } */

  public get data():ClipboardData{
    
       
       return this._data;

  }

  /* public remove(data):void{
    let index= this._data.findIndex((item)=>item ===data)
    if(index>=0){
      
     this._data.splice(index,1);
    }
  } */

   

}
