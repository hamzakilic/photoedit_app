import { Command } from './command';
import {Message} from '../../lib/message';
import {MessageBus} from '../../lib/messageBus';
import {Constants} from '../../lib/constants';

import { ProjectService } from '../project.service';
import { Workspace } from '../project/workSpace';




export class CmdZoom extends Command {
  zoomType: number;
  projectService: ProjectService;
  constructor(zoomType: number,projectService: ProjectService) {
    super();
    this.zoomType = zoomType;
    this.projectService = projectService;
  }
  protected execute(): void {
      switch (this.zoomType){
        case CmdZoom.In:

          this.projectService.currentProject.activeWorkspace.zoomIn();
          break;
          case CmdZoom.Out:
          this.projectService.currentProject.activeWorkspace.zoomOut();
          break;
      }

  }

  static readonly In: number = 1;
  static readonly Out: number = 2;


}
