import {menu} from '../menu';
import {menuItem } from '../menu';
import {utility} from '../../../lib/utility';
import {readFileOrUrl} from '../../../lib/readFileOrUrl';
import {message} from '../../../lib/message';
import {messageBus} from '../../../lib/messageBus';
import {cmdReadImageFromBuffer} from '../../../shared/commands/cmdReadImageFromBuffer';
import {cmdShowError} from '../../../shared/commands/cmdShowError';

import {callback as iskilip_callback} from 'iskilip/core/callback';

import {menuItemOpenFile} from './menuItemOpenFile'
import { fileData } from '../../../shared/entities/fileData';
import { ProjectService } from '../../../shared/project.service';

export class menuItemOpenImage extends menuItemOpenFile {

    private projectService:ProjectService;
    constructor(projectService: ProjectService) {

      super("Open Image","image/*",
      new iskilip_callback((data)=>{this.onSuccess(data)}),
      new iskilip_callback((err)=>this.onError(err)),
      new iskilip_callback((data)=>this.onProgress(data))
      );
      this.projectService = projectService;

    }

    onProgress(data: any): void{

    }

    onSuccess(data: fileData){

      let cmd = new cmdReadImageFromBuffer(data.buffer,data.fileName,this.projectService);
      cmd.executeAsync();

    }
    onError(err: string){
        let cmd = new cmdShowError(err);
        cmd.executeAsync();
    }
}
