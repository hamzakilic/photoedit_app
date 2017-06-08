import {menu} from '../menu';
import {menuItem } from '../menu';
import {Utility} from '../../../lib/utility';
import {ReadFileOrUrl} from '../../../lib/readFileOrUrl';
import {Message} from '../../../lib/message';
import {MessageBus} from '../../../lib/messageBus';
import {CmdReadImageFromBuffer} from '../../../shared/commands/cmdReadImageFromBuffer';
import {CmdShowError} from '../../../shared/commands/cmdShowError';

import {Callback } from '../../../lib/callback';

import {menuItemOpenFile} from './menuItemOpenFile'
import { FileData } from '../../../shared/entities/fileData';
import { ProjectService } from '../../../shared/project.service';

export class menuItemOpenImage extends menuItemOpenFile {

    private projectService:ProjectService;
    private createWorkspace: boolean;

    constructor(projectService: ProjectService,title = "Open Image",createWorkspace=true) {

      super(title,"image/*",
      new Callback((data)=>{this.onSuccess(data)}),
      new Callback((err)=>this.onError(err)),
      new Callback((data)=>this.onProgress(data))
      );
      this.projectService = projectService;
      this.createWorkspace = createWorkspace;

    }

    onProgress(data: any): void{

    }

    onSuccess(data: FileData){

      let cmd = new CmdReadImageFromBuffer(data.result,data.fileName,this.projectService,this.createWorkspace);
      cmd.executeAsync();

    }
    onError(err: string){
        let cmd = new CmdShowError(err);
        cmd.executeAsync();
    }
}
