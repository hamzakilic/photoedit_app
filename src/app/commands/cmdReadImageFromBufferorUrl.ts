import { LayerImage } from './../models/photoedit/layerImage';
import { AppService } from './../services/app.service';
import { Callback } from './../lib/callback';
import { History } from './../models/photoedit/history/history';
import { Command } from './command';
import { Message } from '../entities/message';
import { MessageBus } from '../lib/messageBus';
import { Constants } from '../lib/constants';

import { CmdShowError } from './cmdShowError';
import { ProjectService } from '../services/project.service';
import { Workspace } from '../models/photoedit/workSpace';
import { Layer } from '../models/photoedit/layer';
import { LayerHtmlImage } from '../models/photoedit/layerHtmlImage';
import { HImage } from '../lib/image';


export class CmdReadImageFromBufferorUrl extends Command {

  private buffer: any;
  private projectService: ProjectService;
  private _appService:AppService;
  private fileName: string;
  private createWorkspace: boolean;
  constructor(data: any, fileName: string, appService:AppService, projectService: ProjectService, createWorkspace = true) {
    super();
    this._appService=appService;
    this.createWorkspace = createWorkspace;
    this.buffer = data;
    this.projectService = projectService;
    this.fileName = fileName;
  }
  protected execute(): void {

    if (!this.buffer)
      return;
    let img = new Image();
    img.onload = () => {
     
      if (this.createWorkspace) {
        let ws = new Workspace(img.width, img.height,this._appService, this.fileName);
        
        //let imageData=this.createImageData(img);
        let ly = new LayerHtmlImage(img, this.fileName);
        //let ly=new LayerImage(new HImage(imageData.width,imageData.height,new Uint8ClampedArray(imageData.data)),this.fileName);

        ws.addLayer(ly);
       
        this.history(ws,ly.clone());
        this.projectService.currentProject.addWorkspace(ws);
      } else {
        if (this.projectService.currentProject.activeWorkspace) {
          
        //  let imageData=this.createImageData(img);
        let ly = new LayerHtmlImage(img, this.fileName);
        //let ly=new LayerImage(new HImage(imageData.width,imageData.height,new Uint8ClampedArray(imageData.data)),this.fileName);
   
          this.projectService.currentProject.activeWorkspace.addLayer(ly);
          this.history(this.projectService.currentProject.activeWorkspace,ly.clone());
        }
      }

    };
    img.onerror = (error: any) => {

      MessageBus.publish(Message.ShowError, { msg: "Image could not load" });

    }
    img.src = this.buffer;

    /*
          let stream = new iskilip_memoryStream(this.buffer);
          let dec = new iskilip_bmpDecoder();
          //on event finished data
          dec.onEvent(iskilip_decoder.EVENT_ONFINISHED, new iskilip_callback((img) => {
    
                   let ws = new workspace(img.width(),img.height(),this.fileName);
                   let ly = new layerImage(img,'background');
                   ws.addLayer(ly);
                   this.projectService.currentProject.addWorkspace(ws);
    
    
    
    
    
                }));
                //on error
                dec.onEvent(iskilip_decoder.EVENT_ONERROR, new iskilip_callback((err) => {
                   let cmd = new cmdShowError(err.msg);
                   cmd.executeAsync();
    
                }));
    
    
                //start from decoding
                dec.decodeFromStreamAsync(stream);*/
  }

  private history(workspace:Workspace,layer:Layer): void {
    let history=History.create().setUndo(Callback.from(()=>{
        workspace.removeLayer2(layer.uuid);
    }));

    workspace.historyManager.add(history,Callback.from(()=>{
        workspace.addLayer(layer.clone());
    }))
}
private createImageData(img:any){
  let canvas=document.createElement('canvas');
        canvas.width=img.naturalWidth;
        canvas.height=img.naturalHeight;        
        let context=canvas.getContext('2d');
        context.drawImage(img,0,0);
        return context.getImageData(0,0,canvas.width,canvas.height);
}
}
