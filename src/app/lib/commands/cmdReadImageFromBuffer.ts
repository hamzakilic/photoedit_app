import { command } from './command';
import {message} from '../message';
import {messageBus} from '../messageBus';
import {constants} from '../constants';
import {canvasTargetComponentsDictionary} from '../../components/canvas-target/canvas-target.component';
import { memoryStream as iskilip_memoryStream } from 'iskilip/io/memoryStream';
import { bmpDecoder as iskilip_bmpDecoder } from 'iskilip/img/bmpDecoder';
import {decoder as iskilip_decoder} from 'iskilip/img/decoder';
import {callback as iskilip_callback} from 'iskilip/core/callback';
import {cmdShowError } from './cmdShowError';



export class cmdReadImageFromBuffer extends command {

  private buffer: ArrayBuffer;
  constructor(data: ArrayBuffer) {
    super();
    this.buffer = data;
  }
  protected execute(): void {
    if (!this.buffer)
      return;

      let stream = new iskilip_memoryStream(this.buffer);
      let dec = new iskilip_bmpDecoder();
      //on event finished data
      dec.onEvent(iskilip_decoder.EVENT_ONFINISHED, new iskilip_callback((img) => {

                //image is ready
                if(!canvasTargetComponentsDictionary.contains(constants.MAINCANVAS))
                    return;

                let canvasContainer = canvasTargetComponentsDictionary.get(constants.MAINCANVAS);
                canvasContainer.setWidthHeight(img.width(),img.height(),new iskilip_callback(()=>{

                  canvasContainer.grphics.drawImage(img);
                }));




            }));
            //on error
            dec.onEvent(iskilip_decoder.EVENT_ONERROR, new iskilip_callback((err) => {
               let cmd = new cmdShowError(err.msg);
               cmd.executeAsync();

            }));


            //start from decoding
            dec.decodeFromStreamAsync(stream);
  }
}
