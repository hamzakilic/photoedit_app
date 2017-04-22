import { Component, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';


import { ModalDirective } from 'ng2-bootstrap/modal';

import { callback as iskilip_callback } from 'iskilip/core/callback';
import { image as iskilip_image } from 'iskilip/img/image';
import { message } from '../../lib/message';
import { messageBus } from '../../lib/messageBus';
import { newImageInterface } from './new-image.interface';
import { ProjectService } from '../../shared/project.service';
import { workspace } from '../../shared/project/workSpace';
import { layer } from '../../shared/project/layer';
import { layerImage } from '../../shared/project/layerImage';

@Component({
  selector: 'formNewImage',
  templateUrl: './form-new-image.component.html',
  styleUrls: ['./form-new-image.component.scss'],
  providers: []
})
export class FormNewImageComponent implements OnInit {

  @ViewChild("smModal")
  public smModal: ModalDirective;

  private callFunc: iskilip_callback;
  private formNewImage: FormGroup;
  private projectService: ProjectService;
  constructor(private fb: FormBuilder,projectService: ProjectService) {
    this.callFunc = new iskilip_callback(() => this.show());
    this.width = 100;
    this.height = 100;
    this.projectService = projectService;
  }

  width: number;
  height: number;
  public get Form(): FormGroup{
    return this.formNewImage;

  }

  ngOnInit() {
    this.formNewImage = this.fb.group({
      width: [this.width, validation.widthHeight],
      height: [this.height, validation.widthHeight]
    });

    messageBus.subscribe(message.ShowFormNewImage, this.callFunc);
  }
  ngOnDestroy() {
    messageBus.unsubscribe(message.ShowFormNewImage, this.callFunc);
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

         let img = new iskilip_image(this.width,this.height);
         let ws = new workspace(img.width(),img.height(),"new ("+img.width()+"x"+img.height()+")");
         let ly = new layerImage(img,'background');
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
  static widthHeight(control) {
    if (control.value === null)
      return { msg: true };

    let val = Number(control.value);
    if (isNaN(val) || val < 10 || val > 9999) {

         return { msg: true };
    }


    return null;

  }
}
