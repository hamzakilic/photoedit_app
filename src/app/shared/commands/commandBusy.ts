import { Command } from './command';
import { Message } from '../../lib/message';
import { MessageBus } from '../../lib/messageBus';
import { Constants } from '../../lib/constants';

import { ProjectService } from '../project.service';
import { AppService } from '../../app.service';
import { Workspace } from '../project/workSpace';
import { LayerEmpty } from '../project/layerEmpty';
import { LayerImage } from '../project/layerImage';
import { Calc } from '../../lib/calc';
import { Rect } from '../../lib/draw/rect';
import { Imaging } from '../../lib/imagealgorithm/imaging';



export abstract class CommandBusy extends Command {
    
    protected projectService: ProjectService;
    protected appService: AppService;
    constructor(projectService: ProjectService, appService: AppService) {
        super();

        this.projectService = projectService;
        this.appService = appService;
    }

 public executeAsync():void {

     this.appService.busyPromise = new Promise((resolve, reject) => {
            
                  setTimeout(()=>{this.execute();resolve()},0);
         });
    }
}
