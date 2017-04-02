import {eventEmitter} from 'iskilip/core/eventEmitter.d';
import {callback} from 'iskilip/core/callback.d';

export class messageBus extends eventEmitter{
  private static readonly _instance: messageBus = new messageBus();
  private constructor(){
    super();
  }

  public static publish(message: string,data: any): void{
      messageBus._instance.callEvent(message,data);
  }
  public static  subsribe(message: string,func: callback): void {
      messageBus._instance.onEvent(message,func);
  }

}

