import { Injectable } from '@angular/core';
import { AlertItem } from '../entities/alertItem';
import {BUSY_CONFIG_DEFAULTS, IBusyConfig} from 'angular2-busy';


@Injectable()
export class AppService {
  
  private _busyPromise: IBusyConfig = Object.assign({}, BUSY_CONFIG_DEFAULTS);
  private _alerts:Array<AlertItem>;
  constructor() {
    this._busyPromise.message='Busy';
    
    this._busyPromise.delay=1;
    this._alerts=[];
   // this.showAlert(new AlertItem('info','ok bu oldu',5000000));

  
  }
  public doBusy(promise:Promise<any>):Promise<any>{
    this._busyPromise.busy=promise;
    return promise;
  }
  
  public get busyPromise(){
    return this._busyPromise;
  }

  public get alerts():Array<AlertItem>{
    return this._alerts;
  }

  public showAlert(alert:AlertItem){
    
    alert.onClosed=(event)=>{
      let index=this._alerts.findIndex((value)=>value==alert);
      if(index>-1){
        
        this._alerts.splice(index,1);
      }
    }
    this._alerts.push(alert);
  }


}
