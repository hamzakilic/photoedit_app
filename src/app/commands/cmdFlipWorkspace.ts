import { CmdFlipImage } from './cmdFlipImage';

import { ImageAlgorithmFlip } from './../lib/imagealgorithm/imageAlgorithmFlip';
import { Callback } from './../lib/callback';
import { FormResizeComponent } from './../components/form-resize/form-resize.component';
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
import { HMath } from '../lib/hMath';
import { Rect } from '../lib/draw/rect';
import { Layer } from '../models/photoedit/layer';
import { History } from '../models/photoedit/history/history';








export class CmdFlipWorkspace extends CmdFlipImage {

    
    constructor(isHorizontal:boolean, projectService: ProjectService, appService: AppService) {
        super(isHorizontal, projectService, appService);     
        
        this.findedLayerIndex=0;//with this base class will not try to find selected layer, it will use this index

    }



   



}
