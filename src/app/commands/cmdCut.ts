import { LayerImage } from './../models/photoedit/layerImage';
import { ImageAlgorithmCrop } from './../lib/imagealgorithm/imageAlgorithmCrop';
import { Command } from './command';
import { Message } from '../entities/message';
import { MessageBus } from '../lib/messageBus';
import { Constants } from '../lib/constants';

import { ProjectService } from '../services/project.service';
import { Workspace } from '../models/photoedit/workSpace';
import { LayerEmpty } from '../models/photoedit/layerEmpty';

import { HImage } from '../lib/image';
import { LayerSelect } from '../models/photoedit/layerSelect';



export class CmdCut extends Command {
  zoomType: number;
  projectService: ProjectService;
  constructor(projectService: ProjectService) {
    super();

    this.projectService = projectService;
  }
  protected execute(): void {
    if (this.projectService.currentProject) {
      let workspace = this.projectService.currentProject.activeWorkspace;
      if (workspace && workspace.layers.length>0) {
           let indexOfSelected=workspace.layers.findIndex((item)=>item.isSelected);
           if(indexOfSelected<0)
               indexOfSelected=0;
           let selectedLayer=workspace.layers[indexOfSelected];
           let selectionLayer=workspace.selectionLayer as LayerSelect;

           if(!selectionLayer){
             //selectionLayer yok ise, bir alan seçili değildi ne yapacağız peki
            return;
           }

           let polygons = selectionLayer.polygons;
           polygons.forEach((poly)=>{
             debugger;
               let rect= poly.bounds;
               let translatedPoly=poly.translate(-rect.x,-rect.y);
               let crop=new ImageAlgorithmCrop(rect);
               let cropedImage =crop.process(selectedLayer.getImage());
               let newLayer=new LayerImage(cropedImage,'cut');
               workspace.addLayer(newLayer);
               
           });

           




     

      }
    }

  }




}
