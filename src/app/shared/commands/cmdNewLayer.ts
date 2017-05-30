import { Command } from './command';
import {Message} from '../../lib/message';
import {MessageBus} from '../../lib/messageBus';
import {Constants} from '../../lib/constants';

import { ProjectService } from '../project.service';
import { Workspace } from '../project/workSpace';
import { LayerEmpty } from '../project/layerEmpty';



export class CmdNewLayer extends Command {
  zoomType: number;
  projectService: ProjectService;
  constructor(projectService: ProjectService) {
    super();

    this.projectService = projectService;
  }
  protected execute(): void {
    let workspace =this.projectService.currentProject.activeWorkspace;
    let layer = new LayerEmpty('new layer',workspace.width,workspace.height);

    workspace.addLayer(new LayerEmpty('new layer'));

  }




}
