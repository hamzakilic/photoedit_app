import { command } from './command';
import {message} from '../../lib/message';
import {messageBus} from '../../lib/messageBus';
import {constants} from '../../lib/constants';
import {canvasTargetComponentsDictionary} from '../../components/canvas-target/canvas-target.component';
import { memoryStream as iskilip_memoryStream } from 'iskilip/io/memoryStream';
import { bmpDecoder as iskilip_bmpDecoder } from 'iskilip/img/bmpDecoder';
import {decoder as iskilip_decoder} from 'iskilip/img/decoder';
import {callback as iskilip_callback} from 'iskilip/core/callback';



export class cmdShowFormNewImage extends command {

  constructor() {
    super();

  }
  protected execute(): void {

      messageBus.publish(message.ShowFormNewImage,undefined);
  }
}
