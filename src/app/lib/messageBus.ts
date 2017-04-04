import {eventEmitter as iskilip_core_eventEmitter} from 'iskilip/core/eventEmitter';
import {callback as iskilip_core_callback} from 'iskilip/core/callback';


class callEmit extends iskilip_core_callback
{

}

class messageEmitter extends iskilip_core_eventEmitter{

  /**
   *
   */
  constructor() {
    super();

  }
}

export class messageBus  {
  private    _instance: messageEmitter;
    private    _instance2: callEmit;


  constructor(){
    this._instance2 = new callEmit(()=>{});
    this._instance = new messageEmitter();

    alert(2);
  }

  public static publish(message: string,data: any): void{

  }
  public  static subscribe(message: string,func: iskilip_core_callback): void {
    let x =new messageBus();

  }
   public  static unsubscribe(message: string,func: iskilip_core_callback): void {

  }

}










