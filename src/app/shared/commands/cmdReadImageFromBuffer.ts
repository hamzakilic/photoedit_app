import { command } from '../commands/command';
import { message } from '../../lib/message';
import {messageBus} from '../../lib/messageBus';
import {constants} from '../../lib/constants';

import { memoryStream as iskilip_memoryStream } from 'iskilip/io/memoryStream';
import { bmpDecoder as iskilip_bmpDecoder } from 'iskilip/img/bmpDecoder';
import {decoder as iskilip_decoder} from 'iskilip/img/decoder';
import {callback as iskilip_callback} from 'iskilip/core/callback';
import {cmdShowError } from './cmdShowError';
import { ProjectService } from '../project.service';


export class cmdReadImageFromBuffer extends command {

  private buffer: ArrayBuffer;
  private projectService:  ProjectService;
  private fileName: string;
  constructor(data: ArrayBuffer,fileName: string,projectService: ProjectService) {
    super();
    this.buffer = data;
    this.projectService =  projectService;
    this.fileName = fileName;
  }
  protected execute(): void {

    if (!this.buffer)
      return;

      let stream = new iskilip_memoryStream(this.buffer);
      let dec = new iskilip_bmpDecoder();
      //on event finished data
      dec.onEvent(iskilip_decoder.EVENT_ONFINISHED, new iskilip_callback((img) => {


               let workSpace= this.projectService.currentProject.createWorkspace(this.fileName);


                workSpace.setBackgroundImage(img);




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
