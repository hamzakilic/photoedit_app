import { Command } from '../commands/command';
import { Message } from '../../lib/message';
import {MessageBus} from '../../lib/messageBus';
import {Constants} from '../../lib/constants';

import {CmdShowError } from './cmdShowError';
import { ProjectService } from '../project.service';
import { Workspace } from '../project/workSpace';
import { Layer } from '../project/layer';
import { LayerImage } from '../project/layerImage';
import { Image } from '../../lib/image';



export class CmdTestSomeThing extends Command {

  private msg: string;
  private projectService: ProjectService;
  constructor(msg: string,projectService: ProjectService) {
    super();
    this.msg = msg;
    this.projectService = projectService;
  }
  protected execute(): void {
    let layer = new LayerImage(new Image(10,10),'hamza');
    this.projectService.currentProject.activeWorkspace.addLayer(layer);
  }
}
