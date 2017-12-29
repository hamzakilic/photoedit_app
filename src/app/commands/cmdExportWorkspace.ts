
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
import { Graphics } from '../lib/graphics';








export class CmdExportWorkspace extends CommandBusy {

    private _format:string;
    constructor(format:string, projectService: ProjectService, appService: AppService) {
        super(projectService, appService);     
        this._format=format;

    }



    protected execute(): void {

        if (this.projectService.currentProject)
            if (this.projectService.currentProject.activeWorkspace) {
                let workspace = this.projectService.currentProject.activeWorkspace;
                if (workspace && workspace.hasLayer) {
                    let canvas=window.document.createElement("canvas");
                    canvas.width=workspace.width;
                    canvas.height=workspace.height;
                    let graphics=new Graphics(canvas,canvas.width,canvas.height,1);
                    let promise=Promise.resolve();
                    let i=0;                                      
                        while(i<workspace.layers.length){
                            let tempi=i;
                        promise=promise.then(()=>{
                               
                            let layer=workspace.layers[tempi];
                            graphics.save();
                            graphics.setGlobalAlpha(layer.globalAlpha);
                            graphics.setBlendMode(layer.blendMode);                          
                           
                            graphics.translate(layer.marginLeft,layer.marginTop);
                            graphics.translate(layer.width/2,layer.height/2);                            
                            graphics.rotate(layer.rotateAngleDeg);
                            let img=layer.getImage();
                            return graphics.drawImageRect(img,new Rect(0,0,img.width,img.height),new Rect(-layer.width/2,-layer.height/2,layer.width,layer.height),Callback.from(()=>{
                                
                                graphics.restore();
                            }));
                            
                        });
                        ++i;
                        }
                        
                    
                        
                        
                    promise.then(()=>{
                        
                       /* let tempwindow=window.open("","a");          
                        tempwindow.document.body.appendChild(canvas);*/
                        let link= window.document.querySelector("#downloadlink") as HTMLAnchorElement;
                        if(!link){
                            link= window.document.createElement("a");
                            link.id="downloadlink";
                            link.hidden=true;
                            window.document.body.appendChild(link);
                        }
                          
                          link.href=graphics.exportToURI(this._format);                          
                          link.download="photoedit_"+this.formatDate(new Date(Date.now()))+"."+this.fileExt();
                          link.click();
                          
                        
                    });
                    
                    
                    
                       
                }
            }



    }
    private fileExt():string{
        let exts=["png","jpg","jpeg"];
        for(let i=0;i<exts.length;++i){
            if(this._format.includes(exts[i]))
            return exts[i];
        }
        return "jpg";
    }
    private formatDate(date:Date):string {
        let hours = date.getHours();
        let minutes = date.getMinutes();
        let seconds= date.getSeconds();
        //let ampm = hours >= 12 ? 'pm' : 'am';
        //hours = hours % 12;
        //hours = hours ? hours : 12; // the hour '0' should be '12'
        let minutesstr = minutes < 10 ? '0'+minutes : minutes;
        let secondsstr=seconds<10?'0'+seconds:seconds;
        var strTime = hours + ':' + minutesstr + ':' + secondsstr;
        return  date.getFullYear()+"-"+(date.getMonth()+1) + "-" + date.getDate() + "  " + strTime;
      }
      




}
