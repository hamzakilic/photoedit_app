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


export class CmdEffect1977 extends CommandBusy {
   
   
    constructor(projectService: ProjectService, appService: AppService) {
        super(projectService,appService);

        
    }



    protected execute(): void {
       
            if (this.projectService.currentProject)
                if (this.projectService.currentProject.activeWorkspace) {
                    let workspace = this.projectService.currentProject.activeWorkspace;
                    if (workspace && workspace.layers.length > 0) {
                        debugger;
                        

                        let isLayer0Crop = false;
                        let selectedLayer = workspace.layers.find((layer) => layer.isSelected);
                        if (!selectedLayer) {
                            //selected layer yok ise layer 0 crop yapılacak
                            selectedLayer = workspace.layers[0];
                            isLayer0Crop = true;
                        }
                        
                        if(selectedLayer){
                            let effect= new ImageAlgorithm1977();
                            let img=effect.process(selectedLayer.getImage());
                            let newLayer =new LayerImage(img,selectedLayer.name);
                            workspace.replaceLayer(selectedLayer,newLayer);
                            
                            
                            
                        }





                    }
                }

          

    }




}
