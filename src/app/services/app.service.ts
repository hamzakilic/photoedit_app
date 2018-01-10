import { Callback } from './../lib/callback';
import { Injectable } from '@angular/core';
import { AlertItem } from '../entities/alertItem';
import {BUSY_CONFIG_DEFAULTS, IBusyConfig} from 'angular2-busy';
import { setTimeout } from 'timers';


@Injectable()
export class AppService {
  
  private _busyPromise: IBusyConfig;
  private _alerts:Array<AlertItem>;
  constructor() {
    this._busyPromise= Object.assign({}, BUSY_CONFIG_DEFAULTS);
    this._busyPromise.message='Busy';
    
    this._busyPromise.delay=0;    
    this._busyPromise.minDuration=0;
    
    this._alerts=[];
   // this.showAlert(new AlertItem('info','ok bu oldu',5000000));

  
  }
  
  public doBusyCallback(callback:Callback,parameters=undefined){
     
      
       this._busyPromise.busy=new Promise((resolve,reject)=>{
        setTimeout(()=>{          
       
            try{          
              let result=callback.call(parameters);          
              resolve(result);
              
      
            }catch(e){
              reject(e);
            }
          },0);       
          
        
        
      })
      
    
      
    
      
      
     
    
      
    
    
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
