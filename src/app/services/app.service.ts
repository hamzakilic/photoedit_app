import { Injectable } from '@angular/core';
import {BUSY_CONFIG_DEFAULTS, IBusyConfig} from 'angular2-busy';

@Injectable()
export class AppService {
  
  private _busyPromise: IBusyConfig = Object.assign({}, BUSY_CONFIG_DEFAULTS);

  constructor() {
    this._busyPromise.message='Busy';
    
    this._busyPromise.delay=1;

  
  }
  public doBusy(promise:Promise<any>):Promise<any>{
    this._busyPromise.busy=promise;
    return promise;
  }
  
  public get busyPromise(){
    return this._busyPromise;
  }


}
