import { Command } from './command';
import { CommandBusy } from './commandBusy';
import { Message } from '../entities/message';
import { MessageBus } from '../lib/messageBus';
import { Constants } from '../lib/constants';

import { ProjectService } from '../services/project.service';
import { AppService } from '../services/app.service';
import { EffectService } from "../services/effect.service";
import { Workspace } from '../models/photoedit/workSpace';
import { LayerEmpty } from '../models/photoedit/layerEmpty';
import { LayerImage } from '../models/photoedit/layerImage';

import { Effect } from '../entities/effect';
import { Calc } from '../lib/calc';
import { Rect } from '../lib/draw/rect';
import { Imaging } from '../lib/imagealgorithm/imaging';
import { ImageAlgorithmMath } from '../lib/imagealgorithm/imageAlgorithmMath';
import { ImageColorMath,ImageColorMathBrightness,ImageColorMathContrast} from '../lib/imagealgorithm/imageColorMath';



export class CmdAdjustColors extends CommandBusy {

     private _brightness:number;
     private _constrast:number;
    constructor(brightness:number,contrast:number,  projectService: ProjectService, appService: AppService) {
        super(projectService, appService);
       this._brightness=brightness;
       this._constrast=contrast;


    }



    protected execute(): void {

        if (this.projectService.currentProject)
            if (this.projectService.currentProject.activeWorkspace) {
                let workspace = this.projectService.currentProject.activeWorkspace;
                if (workspace && workspace.hasLayer) {
                   


                        let selectedLayer = workspace.layers.find((layer) => layer.isSelected);
                        if (!selectedLayer) {
                            //selected layer yok ise layer 0 crop yapılacak
                            selectedLayer = workspace.layers[0];

                        }

                        if (selectedLayer) {
                            let img=selectedLayer.getImage();
                            let maths=[];
                            if(this._brightness!=0){
                             maths.push(new ImageColorMathBrightness(this._brightness));
                            }
                            if(this._constrast!=0){
                                maths.push(new ImageColorMathBrightness(this._constrast));
                            }
                            let algo=new ImageAlgorithmMath(maths);
                            img= algo.process(img);
                            let newLayer = new LayerImage(img, selectedLayer.name);
                            workspace.replaceLayer(selectedLayer, newLayer);



                        }
                    


                }
            }



    }




}
