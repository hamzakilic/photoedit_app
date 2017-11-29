import { ShortCut } from './../../../services/keyboard.service';
import { Menu } from '../menu';
import { MenuItem } from '../menu';
import { Utility } from '../../../lib/utility';
import { ReadFileOrUrl } from '../../../lib/readFileOrUrl';
import { Message } from '../../../entities/message';
import { MessageBus } from '../../../lib/messageBus';
import { CmdShowFormNewImage } from '../../../commands/cmdShowFormNewImage';
import { ProjectService } from '../../../services/project.service';
import { Callback } from '../../../lib/callback';




//a base class for new image
export class MenuItemNewImage extends MenuItem {
    private projectService: ProjectService;

    constructor(projectService: ProjectService,shortCut:ShortCut) {      
      super('New Empty',undefined,shortCut);
      this.projectService = projectService;

    }

    

    onClick(parameters?:any): void{

      let cmd = new CmdShowFormNewImage();
      cmd.executeAsync();
  }


}
