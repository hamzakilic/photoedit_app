import { Callback } from './../lib/callback';
import { Command } from './command';
import { Message } from '../entities/message';
import { MessageBus } from '../lib/messageBus';
import { Constants } from '../lib/constants';

import { ProjectService } from '../services/project.service';
import { Workspace } from '../models/photoedit/workSpace';
import { LayerEmpty } from '../models/photoedit/layerEmpty';
import { LayerImage } from '../models/photoedit/layerImage';
import { HImage } from '../lib/image';
import { History } from '../models/photoedit/history/history';



export class CmdNewLayer extends Command {
  zoomType: number;
  projectService: ProjectService;
  constructor(projectService: ProjectService) {
    super();

    this.projectService = projectService;
  }
  protected execute(): void {
    if (this.projectService.currentProject) {
      let workspace = this.projectService.currentProject.activeWorkspace;
      if (workspace) {
         let layer = new LayerEmpty('new layer', workspace.width, workspace.height);          
         let layerCloned=layer.clone();
         workspace.addLayer(layer);
         let history=History.create().setUndo(Callback.from(()=>{
             workspace.removeLayer2(layer.uuid);
         })); 
         workspace.historyManager.add(history,Callback.from(()=>{
            workspace.addLayer(layerCloned.clone());
         }))
     

      }
    }

  }




}
