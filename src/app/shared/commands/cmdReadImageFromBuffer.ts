import { Command } from '../commands/command';
import { Message } from '../../lib/message';
import {MessageBus} from '../../lib/messageBus';
import {Constants} from '../../lib/constants';

import {CmdShowError } from './cmdShowError';
import { ProjectService } from '../project.service';
import { Workspace } from '../project/workSpace';
import { Layer } from '../project/layer';
import { LayerImage } from '../project/layerImage';


export class CmdReadImageFromBuffer extends Command {

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
/*
      let stream = new iskilip_memoryStream(this.buffer);
      let dec = new iskilip_bmpDecoder();
      //on event finished data
      dec.onEvent(iskilip_decoder.EVENT_ONFINISHED, new iskilip_callback((img) => {

               let ws = new workspace(img.width(),img.height(),this.fileName);
               let ly = new layerImage(img,'background');
               ws.addLayer(ly);
               this.projectService.currentProject.addWorkspace(ws);





            }));
            //on error
            dec.onEvent(iskilip_decoder.EVENT_ONERROR, new iskilip_callback((err) => {
               let cmd = new cmdShowError(err.msg);
               cmd.executeAsync();

            }));


            //start from decoding
            dec.decodeFromStreamAsync(stream);*/
  }
}
