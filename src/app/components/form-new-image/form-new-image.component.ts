import { Component, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';


import { ModalDirective } from 'ng2-bootstrap/modal';

import { callback as iskilip_callback } from 'iskilip/core/callback';
import { message } from '../../lib/message';
import { messageBus } from '../../lib/messageBus';
import { newImageInterface } from './new-image.interface';



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

  constructor(private fb: FormBuilder) {
    this.callFunc = new iskilip_callback(() => this.show());
    this.width = 100;
    this.height = 100;
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
 console.log(this.width);
 console.log(this.formNewImage.get('width').value);
    if (this.formNewImage.valid)
         this.smModal.hide();
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
