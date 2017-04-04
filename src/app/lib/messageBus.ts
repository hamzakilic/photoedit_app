import {eventEmitter as iskilip_core_eventEmitter} from 'iskilip/core/eventEmitter';
import {callback as iskilip_core_callback} from 'iskilip/core/callback';



export class messageBus  {
  private  static emitter: iskilip_core_eventEmitter;



  private constructor(){

  }

  public static publish(message: string,data: any): void{
       if(!messageBus.emitter)
        messageBus.emitter = new iskilip_core_eventEmitter();
        messageBus.emitter.callEvent(message,data);
  }
  public  static subscribe(message: string,func: iskilip_core_callback): void {
      if(!messageBus.emitter)
        messageBus.emitter = new iskilip_core_eventEmitter();
        messageBus.emitter.onEvent(message,func);

  }
   public  static unsubscribe(message: string,func: iskilip_core_callback): void {
      if(!messageBus.emitter)
        messageBus.emitter = new iskilip_core_eventEmitter();
        messageBus.emitter.offEvent(message,func);
  }

}










