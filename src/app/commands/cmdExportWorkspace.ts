import { Utility } from './../lib/utility';

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
import * as IcoEncoder from 'icoimagejs';
import { CmdShowAlert } from './cmdShowAlert';
import { CmdShowError } from './cmdShowError';




const exts = [{mime:"png",ext:"png"},{mime:"jpeg",ext:"jpg"},{mime:"ico",ext:"ico"}];

export interface FormatOptions{
    mimetype:string,
    options?:any;
}

export class CmdExportWorkspace extends CommandBusy {

    private _format: FormatOptions;
    private _isPreview: boolean;
    constructor(format: FormatOptions, isPreview: boolean = false, projectService: ProjectService, appService: AppService) {
        super(projectService, appService);
        this._format = format;
        this._isPreview = isPreview;



    }

   

    private createJpegOrPngImage(): Promise<Graphics> {
        let workspace = this.projectService.currentProject.activeWorkspace;
        let canvas = window.document.createElement("canvas");
        canvas.width = workspace.width;
        canvas.height = workspace.height;
        let graphics = new Graphics(canvas, canvas.width, canvas.height, 1);
        let promise = Promise.resolve(graphics);
        let i = 0;
        while (i < workspace.layers.length) {
            let tempi = i;
            promise = promise.then(() => {

                let layer = workspace.layers[tempi];
                graphics.save();
                graphics.setGlobalAlpha(layer.globalAlpha);
                graphics.setBlendMode(layer.blendMode);

                graphics.translate(layer.marginLeft, layer.marginTop);
                graphics.translate(layer.width / 2, layer.height / 2);
                graphics.rotate(layer.rotateAngleDeg);
                let img = layer.getImage();
                graphics.drawImageRect(img, new Rect(0, 0, img.width, img.height), new Rect(-layer.width / 2, -layer.height / 2, layer.width, layer.height), Callback.from(() => {

                    graphics.restore();
                }));
                return graphics;

            });
            ++i;
        }
        return promise;


    }

    private showPreview(uri: string) {
        let tempwindow = window.open("", Utility.guid());
        tempwindow.document.title = "PhotoEdit-Preview";
        try {
            tempwindow.history.pushState("", "PhotoEdit-Preview", "/preview");
        } catch (err) { };
        let img = new Image();
        img.src = uri;
        tempwindow.document.body.appendChild(img);
    }
    private downloadFile(uri: string,filenameExt?:string) {
        let link = window.document.querySelector("#downloadlink") as HTMLAnchorElement;
        if (!link) {
            link = window.document.createElement("a");
            link.id = "downloadlink";
            link.hidden = true;
            window.document.body.appendChild(link);
        }

        link.href = uri;
        link.download = "photoedit_" + this.formatDate(new Date(Date.now()))+(filenameExt?filenameExt:"")+ "." + this.fileExt();
        link.click();
    }


    protected execute(): void {

        if (this.projectService.currentProject)
            if (this.projectService.currentProject.activeWorkspace) {
                let workspace = this.projectService.currentProject.activeWorkspace;
                if (workspace && workspace.hasLayer) {

                    if (this._format.mimetype.includes("jpg")|| this._format.mimetype.includes("jpeg") || this._format.mimetype.includes("png")) {
                        let promisegraphics = this.createJpegOrPngImage();
                        promisegraphics.then((graphics)=>{
                            
                            let uri= graphics.exportToURI(this._format.mimetype);
                            if (this._isPreview)
                            this.showPreview(uri);
                        else this.downloadFile(uri);
                            
                        });
                       
                        
                    }

                    if(this._format.mimetype.includes("ico")){
                        let promisegraphics = this.createJpegOrPngImage();
                        promisegraphics.then((graphics)=>{
                           
                            let image=graphics.getImage();
                            let whes=[16,24,32,64,128,256];
                            whes.forEach((wh)=>{
                                
                                let canvas=document.createElement('canvas');
                                canvas.width=wh;
                                canvas.height=wh;                                
                                let grp=new Graphics(canvas,wh,wh,1);
                                grp.drawImageRect(image,new Rect(0,0,image.width,image.height),new Rect(0,0,wh,wh));
                                let whimage= grp.getImage(); 
                                
                                let buffer= IcoEncoder.encode(wh,whimage.Pixels);
                                let base64= btoa(buffer);
                                
                                this.downloadFile(window.URL.createObjectURL(new Blob([buffer])),"_"+wh);                                
                                grp.dispose();
                                
                            }); 
                          
                            
                        }).catch((e)=>{
                            let err=new CmdShowError(e.message);
                            err.executeAsync();
                        });
                    }




                }
            }



    }

     base64ToArrayBuffer(base64) {
        var binaryString = window.atob(base64);
        var binaryLen = binaryString.length;
        var bytes = new Uint8Array(binaryLen);
        for (var i = 0; i < binaryLen; i++) {
           var ascii = binaryString.charCodeAt(i);
           bytes[i] = ascii;
        }
        return bytes;
     }
    private fileExt(): string {
        
        for (let i = 0; i < exts.length; ++i) {
            if (this._format.mimetype.includes(exts[i].mime))
                return exts[i].ext;
        }
        return "jpg";
    }
    private formatDate(date: Date): string {
        let hours = date.getHours();
        let minutes = date.getMinutes();
        let seconds = date.getSeconds();
        //let ampm = hours >= 12 ? 'pm' : 'am';
        //hours = hours % 12;
        //hours = hours ? hours : 12; // the hour '0' should be '12'
        let minutesstr = minutes < 10 ? '0' + minutes : minutes;
        let secondsstr = seconds < 10 ? '0' + seconds : seconds;
        var strTime = hours + ':' + minutesstr + ':' + secondsstr;
        return date.getFullYear() + "-" + (date.getMonth() + 1) + "-" + date.getDate() + "  " + strTime;
    }





}
