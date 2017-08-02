import { menu } from '../menu';
import { menuItem } from '../menu';
import { Utility } from '../../../lib/utility';
import { ReadFileOrUrl } from '../../../lib/readFileOrUrl';
import { Message } from '../../../lib/message';
import { MessageBus } from '../../../lib/messageBus';
import { CmdShowFormNewImage } from '../../../shared/commands/cmdShowFormNewImage';
import { ProjectService } from '../../../shared/project.service';




//a base class for new image
export class menuItemNewImage extends menuItem {
    private projectService: ProjectService;
    constructor(projectService: ProjectService) {
      super('New Empty',undefined);
      this.projectService = projectService;

    }

    

    onClick(parameters?:any): void{

      let cmd = new CmdShowFormNewImage();
      cmd.executeAsync();
  }


}
