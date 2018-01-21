import { Callback } from './../lib/callback';
import { Command } from './command';
import { Message } from '../entities/message';
import { MessageBus } from '../lib/messageBus';
import { Constants } from '../lib/constants';

import { ProjectService } from '../services/project.service';
import { AppService } from '../services/app.service';
import { Workspace } from '../models/photoedit/workSpace';
import { LayerEmpty } from '../models/photoedit/layerEmpty';
import { LayerImage } from '../models/photoedit/layerImage';
import { HMath } from '../lib/hMath';
import { Rect } from '../lib/draw/rect';



export abstract class CommandNotBusy extends Command {
    
    protected projectService: ProjectService;
    protected appService: AppService;
    constructor(projectService: ProjectService, appService: AppService) {
        super();

        this.projectService = projectService;
        this.appService = appService;
    }

 public executeAsync():void {

    let promise= new Promise((resolve,reject)=>{
         
        try{  this.execute(); resolve();}catch(e){reject(e)};
         
     });
     promise.catch((e)=>{
         console.log(e);

     })
        
    }
}

export abstract class CommandBusy extends Command {
    
    protected projectService: ProjectService;
    protected appService: AppService;
    constructor(projectService: ProjectService, appService: AppService) {
        super();

        this.projectService = projectService;
        this.appService = appService;
    }

 public executeAsync():void {

     this.appService.doBusyCallback(Callback.from(()=>this.execute()));
    }
}
