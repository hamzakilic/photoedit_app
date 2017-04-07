import { command } from './command';
import {message} from '../message';
import {messageBus} from '../messageBus';
import {constants} from '../constants';
import {canvasTargetComponentsDictionary} from '../../components/canvas-target/canvas-target.component';
import { memoryStream as iskilip_memoryStream } from 'iskilip/io/memoryStream';
import { bmpDecoder as iskilip_bmpDecoder } from 'iskilip/img/bmpDecoder';
import {decoder as iskilip_decoder} from 'iskilip/img/decoder';
import {callback as iskilip_callback} from 'iskilip/core/callback';



export class commandTest extends command {

  func: iskilip_callback;
  constructor(func: iskilip_callback) {
    super();
    this.func = func;

  }
  execute(): void {

      this.func.call(undefined);



}
}
