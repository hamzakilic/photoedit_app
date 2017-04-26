import {HEventEmitter } from './eventEmitter';
import {Callback } from './callback';



export class MessageBus  {
  private  static emitter: HEventEmitter;



  private constructor(){

  }

  public static publish(message: string,data: any): void{
       if(!MessageBus.emitter)
        MessageBus.emitter = new HEventEmitter();
        MessageBus.emitter.callEvent(message,data);
  }
  public  static subscribe(message: string,func: Callback): void {
      if(!MessageBus.emitter)
        MessageBus.emitter = new HEventEmitter();
        MessageBus.emitter.onEvent(message,func);

  }
   public  static unsubscribe(message: string,func: Callback): void {
      if(!MessageBus.emitter)
        MessageBus.emitter = new HEventEmitter();
        MessageBus.emitter.offEvent(message,func);
  }

}










