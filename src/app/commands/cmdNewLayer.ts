import { Command } from './command';
import { Message } from '../entities/message';
import { MessageBus } from '../lib/messageBus';
import { Constants } from '../lib/constants';

import { ProjectService } from '../services/project.service';
import { Workspace } from '../models/photoedit/workSpace';
import { LayerEmpty } from '../models/photoedit/layerEmpty';
import { LayerImage } from '../models/photoedit/layerImage';
import { HImage } from '../lib/image';



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
        workspace.addLayer(layer); 
      /*   let img=new HImage(512,512);
        for(let y=0;y<img.height;++y)
          for(let x=0;x<img.width;++x)
        {
          let start=y*img.width*4+x*4;
          img.Pixels[start+0]=x<256?x:x-256;
          img.Pixels[start+1]=x<256?x:x-256;
          img.Pixels[start+2]=x<256?x:x-256;
          img.Pixels[start+3]=255;
        }
        let layer = new LayerImage(img,"asasf");          
        workspace.addLayer(layer);  */

      }
    }

  }




}
