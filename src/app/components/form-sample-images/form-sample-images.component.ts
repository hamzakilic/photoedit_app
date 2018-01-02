import { AppService } from './../../services/app.service';
import { Component, OnInit, ViewChild } from '@angular/core';
import { ModalDirective } from 'ngx-bootstrap/modal';
import { MessageBus } from './../../lib/messageBus';
import { Message } from './../../entities/message';
import { Callback } from './../../lib/callback';
import { Observable } from 'rxjs/Rx';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';
import { Http, Response, Headers, RequestOptions } from '@angular/http';

import { CmdReadImageFromBufferorUrl } from '../../commands/cmdReadImageFromBufferorUrl';
import { ProjectService } from '../../services/project.service';

@Component({
  selector: 'form-sample-images',
  templateUrl: './form-sample-images.component.html',
  styleUrls: ['./form-sample-images.component.scss']
})
export class FormSampleImagesComponent implements OnInit {

  @ViewChild("smModal")
  public smModal: ModalDirective;

  private callFunc: Callback;
  private _http: Http;
  private _projectService: ProjectService;
  private _openAsWorkspace: boolean;
  private _appService:AppService;
  constructor(http: Http, projectService: ProjectService,appService:AppService) {
    this.callFunc = Callback.from((openAsWorkspace: boolean) => { this.show(openAsWorkspace) });
    this._http = http;
    this._projectService = projectService;
    this._appService=appService;
  }

  ngOnInit() {

    MessageBus.subscribe(Message.ShowFormSampleImages, this.callFunc);
   

  }
  ngOnDestroy() {
    MessageBus.unsubscribe(Message.ShowFormSampleImages, this.callFunc);

  }

  show(openAsWorkspace: boolean) {
    this._openAsWorkspace = openAsWorkspace;
   
    if (!this.smModal.isShown) {

      this.smModal.show();
    }
  }

  public get images(): Array<string> {
    return ["city_320", "eagle_320", "flower_320", "love_320", "newyork_320", "sunset_320"];
  }

  public link(filename: string): string {
    return "assets/samples/" + filename + ".jpg";
  }

  loadFile(filename: string) {
    //todo: on error what will we do

    let newFileName = filename.replace("320", "640") + ".jpg";
    let url = "assets/samples/" + newFileName;

    let cmd = new CmdReadImageFromBufferorUrl(url, filename,this._appService, this._projectService, this._openAsWorkspace);
    cmd.executeAsync();
    /*  this._http.get(url).subscribe((response)=> {
       if(response.status==200){
       let createWorkspace = this._projectService.currentProject.workspaces.length==0;
      let cmd= new CmdReadImageFromBuffer(response.arrayBuffer(),filename,this._projectService,createWorkspace);
      cmd.executeAsync();
       }else{
        MessageBus.publish(Message.ShowError,{msg: "Image could not load:"+ response.statusText});
       }

     },(error:any)=>{
        if(error.statusText)
          MessageBus.publish(Message.ShowError,{msg: "Image could not load:"+ error.statusText});
     }); */

    this.smModal.hide();

  }

}
