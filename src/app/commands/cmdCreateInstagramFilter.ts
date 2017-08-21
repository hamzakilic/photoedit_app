import { Command } from './command';
import { CommandBusy } from './commandBusy';
import { Message } from '../entities/message';
import { MessageBus } from '../lib/messageBus';
import { Constants } from '../lib/constants';

import { ProjectService } from '../services/project.service';
import { AppService } from '../services/app.service';
import { Workspace } from '../models/photoedit/workSpace';
import { LayerEmpty } from '../models/photoedit/layerEmpty';
import { LayerImage } from '../models/photoedit/layerImage';
import { Calc } from '../lib/calc';
import { Rect } from '../lib/draw/rect';
import { Imaging } from '../lib/imagealgorithm/imaging';
import { ImageAlgorithm1977} from  '../lib/imagealgorithm/imageAlgorithm1977';


export class CmdCreateInstagramFilter extends CommandBusy {
   
   
    constructor(projectService: ProjectService, appService: AppService) {
        super(projectService,appService);

        
    }



    protected execute(): void {
       
            if (this.projectService.currentProject)
                if (this.projectService.currentProject.activeWorkspace) {
                    let workspace = this.projectService.currentProject.activeWorkspace;
                    if (workspace && workspace.layers.length > 0) {
                        debugger;
                        

                       let selectedLayer=workspace.layers.find(p=>p.isSelected);
                       if(selectedLayer==undefined)
                        {
                            console.warn("select a layer");
                            return;
                        }
                       let filteredImage=selectedLayer.getImage();
                       
                        if(filteredImage.Pixels.length<256*256*4)
                            {
                                console.warn("filtered is not valid");
                                return;
                            }
                            let filtering={r:[],g:[],b:[]};
                       for(let i=0;i<256;++i){
                           let r= filteredImage.Pixels[i*4+0];
                           let g=filteredImage.Pixels[i*4+1];
                           let b=filteredImage.Pixels[i*4+2];
                           filtering.r[i]=r;
                           filtering.g[i]=g;
                           filtering.b[i]=b;
                       }
                       console.log(JSON.stringify(filtering));





                    }
                }

          

    }




}
