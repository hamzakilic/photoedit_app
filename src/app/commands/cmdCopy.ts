import { ClipboardService, ClipboardData } from './../services/clipboard.service';
import { AppService } from './../services/app.service';
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
import { AlertItem } from '../entities/alertItem';



export class CmdCopy extends Command {
  zoomType: number;
  projectService: ProjectService;
  appService:AppService;
  clipboardService:ClipboardService;
  constructor(projectService: ProjectService,appService:AppService,clipboardService:ClipboardService) {
    super();

    this.projectService = projectService;
    this.appService=appService;
    this.clipboardService=clipboardService;
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
             
               let rect= poly.bounds;
               let translatedPoly=poly.translate(-rect.x,-rect.y);
               let crop=new ImageAlgorithmCrop(rect);
               let cropedImage =crop.process(selectedLayer.getImage());
               this.clipboardService.add(new ClipboardData(ClipboardData.Types.Image,cropedImage));
               this.appService.showAlert(new AlertItem('info','Copied'));
               //let newLayer=new LayerImage(cropedImage,'cut');
               //workspace.addLayer(newLayer);
               
           });

           




     

      }
    }

  }




}
