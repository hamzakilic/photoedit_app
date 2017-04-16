import { command } from './command';
import {message} from '../../lib/message';
import {messageBus} from '../../lib/messageBus';
import {constants} from '../../lib/constants';

import { memoryStream as iskilip_memoryStream } from 'iskilip/io/memoryStream';
import { bmpDecoder as iskilip_bmpDecoder } from 'iskilip/img/bmpDecoder';
import {decoder as iskilip_decoder} from 'iskilip/img/decoder';
import {callback as iskilip_callback} from 'iskilip/core/callback';



export class cmdShowError extends command {

  private msg: string;
  constructor(msg: string) {
    super();
    this.msg = msg;
  }
  protected execute(): void {
    if (!this.msg)
      return;
      messageBus.publish(message.ShowError,{msg:this.msg});
  }
}
