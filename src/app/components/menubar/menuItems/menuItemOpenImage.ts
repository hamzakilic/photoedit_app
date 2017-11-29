import { Menu } from '../menu';
import { MenuItem } from '../menu';
import { Utility } from '../../../lib/utility';
import { ReadFileOrUrl } from '../../../lib/readFileOrUrl';
import { Message } from '../../../entities/message';
import { MessageBus } from '../../../lib/messageBus';
import { CmdReadImageFromBufferorUrl } from '../../../commands/cmdReadImageFromBufferorUrl';
import { CmdShowError } from '../../../commands/cmdShowError';

import { Callback } from '../../../lib/callback';

import { MenuItemOpenFile } from './menuItemOpenFile'
import { FileData } from '../../../entities/fileData';
import { ProjectService } from '../../../services/project.service';
import { ShortCut } from '../../../services/keyboard.service';

export class MenuItemOpenImage extends MenuItemOpenFile {

  private projectService: ProjectService;
  private createWorkspace: boolean;

  constructor(projectService: ProjectService,shortCut:ShortCut, title = "Open File", createWorkspace = true) {

    

    super(title, "image/*",
      new Callback((data) => { this.onSuccess(data) }),
      new Callback((err) => this.onError(err)),
      new Callback((data) => this.onProgress(data)),
    shortCut);
    
    
    this.projectService = projectService;
    this.createWorkspace = createWorkspace;

  }

  onProgress(data: any): void {

  }

  onSuccess(data: FileData) {

    let cmd = new CmdReadImageFromBufferorUrl(data.result, data.fileName, this.projectService, this.createWorkspace);
    cmd.executeAsync();

  }
  onError(err: string) {
    let cmd = new CmdShowError(err);
    cmd.executeAsync();
  }
}
