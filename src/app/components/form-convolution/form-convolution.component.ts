import { ImageAlgorithmConvolution } from './../../lib/imagealgorithm/convolution/imageAlgorithmConvolution';
import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';

import { MessageBus } from './../../lib/messageBus';
import { Message } from './../../entities/message';
import { Callback } from './../../lib/callback';
import { FontService } from './../../services/font.service';
import { AppService } from './../../services/app.service';
import { UserService } from './../../services/user.service';


import { ProjectService } from '../../services/project.service';

import { ModalDirective } from 'ngx-bootstrap/modal';

import { LayerImageEffect } from "../../models/photoedit/layerImageEffect";
import { HImage } from "../../lib/image";
import { ImageAlgorithmGrayscale } from "../../lib/imagealgorithm/imageAlgorithmGrayscale";
import { ImageAlgorithmClone } from "../../lib/imagealgorithm/imageAlgorithmClone";
import { CmdColorRemap } from "../../commands/cmdColorRemap";

import { AutocompleteComponent } from '../../modulesext/autocomplete/autocomplete.component';

import { EntityIdName } from "../../entities/entityIdName";
import { CmdExecuteImageAlgorithms } from "../../commands/cmdExecuteImageAlgorithms";


@Component({
  selector: 'form-convolution',
  templateUrl: './form-convolution.component.html',
  styleUrls: ['./form-convolution.component.scss']
})
export class FormConvolutionComponent implements OnInit {

  @ViewChild("smModal")
  public smModal: ModalDirective;

  @ViewChild("surfaceContainer")
  private surfaceDiv: ElementRef




  private _projectService: ProjectService;
  private _appService: AppService;
  private callFunc: Callback;

  public effectLayer: LayerImageEffect;
  private _emptyEffectLayer: LayerImageEffect;
  private _initialized = false;
  constructor(projectService: ProjectService, appService: AppService) {
    this.callFunc = Callback.from((prototypes) => { this.show(prototypes) });

    this._projectService = projectService;
    this._appService = appService;
    let layer = new LayerImageEffect(new HImage(320, 240));
    layer.whenCreatedGraphicsAgain = Callback.from(() => { layer.render(); });
    layer.resizedAgain = false;
    this._emptyEffectLayer = layer;

    this.effectLayer = this._emptyEffectLayer;
  }

  ngOnInit() {

    MessageBus.subscribe(Message.ShowFormConvolution, this.callFunc);

  }
  ngOnDestroy() {
    MessageBus.unsubscribe(Message.ShowFormConvolution, this.callFunc);

  }
  submitted = false;
  onSubmit() {

    this.submitted = true;
  }

  ngAfterContentInit() {

  }





  show(prototypes:ImageAlgorithmConvolution[]) {

    if (!this.smModal.isShown) {

      this.smModal.show();
      this._convolutions=prototypes;

      this.effectLayer = this._emptyEffectLayer;
      if (this._projectService.currentProject)
        if (this._projectService.currentProject.activeWorkspace && this._projectService.currentProject.activeWorkspace.layers.length > 0) {
          let selectedLayer = this._projectService.currentProject.activeWorkspace.layers.find(p => p.isSelected);
          if (!selectedLayer) {
            selectedLayer = this._projectService.currentProject.activeWorkspace.layers[0];

          }
          let layer = new LayerImageEffect(selectedLayer.getImage());
          let rect = { width: 360, height: 320 };
          let scaleX = rect.width / layer.width;
          let scaleY = rect.height / layer.height;

          if (scaleX < scaleY) {
            layer.width = (layer.width * scaleX).extRound();
            layer.height = (layer.height * scaleX).extRound();

          } else {
            layer.width = (layer.width * scaleY).extRound();
            layer.height = (layer.height * scaleY).extRound();

          }

          layer.whenCreatedGraphicsAgain = Callback.from(() => { layer.render(); });
          layer.resizedAgain = false;
          this.effectLayer = layer;
          this._initialized = false;
        }
    }

  }
  private _convolutions:ImageAlgorithmConvolution[]=[];
  public get convolutions(){return this._convolutions};
  
  public get layer(): LayerImageEffect {

    return this.effectLayer;
  }

  private _lastSelectedConvolutionAlgorithmName: string;

  applyConvolution(event:Event,convolutionAlgorithmName:string) {

    event.preventDefault();
    if (!this._initialized) {
      this.effectLayer.setOrgImage(this.effectLayer.getImage());
      this._initialized = true;
    }

    let originalImage = this.effectLayer.getOriginalImage();

    this._lastSelectedConvolutionAlgorithmName = convolutionAlgorithmName;
    let effect = this._convolutions.find(p=>p.name==convolutionAlgorithmName);
    if(effect){
    let img = effect.process(originalImage);
    this.effectLayer.setImg(img);
    }
    

  }

  close(event:Event) {
    event.preventDefault();
    if (this._lastSelectedConvolutionAlgorithmName) {
      let algo = this._convolutions.find(p=>p.name==this._lastSelectedConvolutionAlgorithmName);
      if(algo){
      let cmd = new CmdExecuteImageAlgorithms([algo], this._projectService, this._appService);
      cmd.executeAsync();
      }
    }
    this.smModal.hide();
    
  }


}


