import { Component, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';


import { ModalDirective } from 'ngx-bootstrap/modal';

import { Callback  } from '../../lib/callback';
import { HImage  } from '../../lib/image';
import { Message } from '../../entities/message';
import { MessageBus } from '../../lib/messageBus';
import { ProjectService } from '../../services/project.service';
import { ValidationService } from '../../services/validation.service';
import { Workspace } from '../../models/photoedit/workSpace';
import { Layer } from '../../models/photoedit/layer';
import { LayerImage } from '../../models/photoedit/layerImage';
import { LayerEmpty } from '../../models/photoedit/layerEmpty';
import { CmdResizeWorkspace } from '../../commands/cmdResizeWorkspace'

@Component({
  selector: 'formResize-component',
  templateUrl: './form-resize.component.html',
  styleUrls: ['./form-resize.component.scss']
})
export class FormResizeComponent implements OnInit {

  @ViewChild("smModal")
  public smModal: ModalDirective;

  private callFunc: Callback;
  private formResize: FormGroup;
  private projectService: ProjectService;
  constructor(private fb: FormBuilder,projectService: ProjectService) {
    this.callFunc = new Callback(() => this.show());
    this.width = 100;
    this.height = 100;
    this.scale=1;
    this.keepRatio=true;
    this.projectService = projectService;
    this.formResize = this.fb.group({
      width: [this.width, ValidationService.widthHeightValidator],
      height: [this.height, ValidationService.widthHeightValidator],
      keepRatio:[this.keepRatio]
    });
  
  }

  width: number;
  height: number;
  scale: number;
  keepRatio:boolean;
  public get Form(): FormGroup{
    return this.formResize;

  }

  ngOnInit() {
    
   
    //console.log("initializing subsribe");
    MessageBus.subscribe(Message.ShowFormResize, this.callFunc);
  }
  ngOnDestroy() {
    //console.log("uninitializing subsribe");
    MessageBus.unsubscribe(Message.ShowFormResize, this.callFunc);
  }
  submitted = false;
  onSubmit() {
     this.submitted = true;
     }

  show() {

    if (!this.smModal.isShown){
        if(this.projectService)
      if(this.projectService.currentProject)
        if(this.projectService.currentProject.activeWorkspace)
          {
            this.keepRatio=true;
            this.width=this.projectService.currentProject.activeWorkspace.width;
            this.height=this.projectService.currentProject.activeWorkspace.height;
            this.scale=this.width/this.height;

          }
      this.smModal.show();
    }
  }

  doSubmit(event) {
    if (this.formResize.valid){

    let cmd = new CmdResizeWorkspace(this.projectService,this.width,this.height);
    cmd.executeAsync();

    this.smModal.hide();
    }
  }


  validationMessages = {
    error: {
      msg: 'Enter a valid number between 10-10000',
    }
  }

  changeWidth(value: any) {


    if (parseInt(value) > 10) {
      
      this.width=parseInt(value);
      if(this.keepRatio)        
          this.height = this.width/this.scale;
        
    }
  }

  changeHeight(value: any) {

    if (parseInt(value) > 10) {
      this.height= parseInt(value);
      if(this.keepRatio)
         this.width=this.height*this.scale;
    }
  }

  round(value: number) {
    return Math.round(value);
  }
}

