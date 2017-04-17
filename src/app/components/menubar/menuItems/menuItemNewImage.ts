import { menu } from '../menu';
import { menuItem } from '../menu';
import { utility } from '../../../lib/utility';
import { readFileOrUrl } from '../../../lib/readFileOrUrl';
import { message } from '../../../lib/message';
import { messageBus } from '../../../lib/messageBus';
import { cmdShowFormNewImage } from '../../../shared/commands/cmdShowFormNewImage';
import { ProjectService } from '../../../shared/project.service';

import { callback as iskilip_callback } from 'iskilip/core/callback';


//a base class for new image
export class menuItemNewImage extends menuItem {
    private projectService: ProjectService;
    constructor(projectService: ProjectService) {
      super('New',undefined);
      this.projectService = projectService;

    }

    onClick(parameters?:any): void{

      let cmd = new cmdShowFormNewImage();
      cmd.executeAsync();
  }


}
