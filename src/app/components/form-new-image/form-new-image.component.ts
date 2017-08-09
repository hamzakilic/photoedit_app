import { Component, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';


import { ModalDirective } from 'ngx-bootstrap/modal';

import { Callback  } from '../../lib/callback';
import { HImage  } from '../../lib/image';
import { Message } from '../../lib/message';
import { MessageBus } from '../../lib/messageBus';
import { newImageInterface } from './new-image.interface';
import { ProjectService } from '../../shared/project.service';
import { ValidationService } from '../../shared/validation.service';
import { Workspace } from '../../shared/project/workSpace';
import { Layer } from '../../shared/project/layer';
import { LayerImage } from '../../shared/project/layerImage';
import { LayerEmpty } from '../../shared/project/layerEmpty';

@Component({
  selector: 'formNewImage-component',
  templateUrl: './form-new-image.component.html',
  styleUrls: ['./form-new-image.component.scss'],
  providers: []
})
export class FormNewImageComponent implements OnInit {

  @ViewChild("smModal")
  public smModal: ModalDirective;

  private callFunc: Callback;
  private formNewImage: FormGroup;
  private projectService: ProjectService;
  constructor(private fb: FormBuilder,projectService: ProjectService) {
    this.callFunc = new Callback(() => this.show());
    this.width = 16*30;
    this.height = 9*30;
    this.projectService = projectService;
  }

  width: number;
  height: number;
  public get Form(): FormGroup{
    return this.formNewImage;

  }

  ngOnInit() {
    this.formNewImage = this.fb.group({
      width: [this.width, ValidationService.widthHeightValidator],
      height: [this.height, ValidationService.widthHeightValidator]
    });

    MessageBus.subscribe(Message.ShowFormNewImage, this.callFunc);
  }
  ngOnDestroy() {
    MessageBus.unsubscribe(Message.ShowFormNewImage, this.callFunc);
  }
  submitted = false;
  onSubmit() {

     this.submitted = true;
     }

  show() {

    if (!this.smModal.isShown)
      this.smModal.show();
  }

  doSubmit(event) {
    if (this.formNewImage.valid){


         let ws = new Workspace(this.width,this.height,"new");

         let ly = new LayerEmpty('image',this.width,this.height);
         ws.addLayer(ly);
         this.projectService.currentProject.addWorkspace(ws);

         this.smModal.hide();
    }
  }


  validationMessages = {
    error: {
      msg: 'Enter a valid number between 10-10000',
    }
  }



}

class validation {
  
}

