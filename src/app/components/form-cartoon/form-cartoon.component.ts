import { ImageAlgorithmEdgeDetectionGradient, GradientEdgeFilterType, GradientDerivativeLevel } from './../../lib/imagealgorithm/imageAlgorithmEdgeDetectionGradient';
import { Http } from '@angular/http';


import { IImageAlgorithmImmutable } from './../../lib/image';


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
import { ImageAlgorithmErosionDelation, MorphologyProcessType } from '../../lib/imagealgorithm/morphology/imageAlgorithmErosionDelation';
import { ImageAlgorithmOilPainting } from '../../lib/imagealgorithm/imageAlgorithmOilPainting';
import { setTimeout } from 'timers';


@Component({
  selector: 'form-cartoon',
  templateUrl: './form-cartoon.component.html',
  styleUrls: ['./form-cartoon.component.scss']
})
export class FormCartoonComponent implements OnInit {

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
  public filterSize:number=3;
  public binSize:number=3;
  public threshold:number=10;
  constructor(projectService: ProjectService, appService: AppService) {
    this.callFunc = Callback.from(() => { this.show() });

    this._projectService = projectService;
    this._appService = appService;
    let layer = new LayerImageEffect(new HImage(320, 240));
    layer.whenCreatedGraphicsAgain = Callback.from(() => { layer.render(); });
    layer.resizedAgain = false;
    this._emptyEffectLayer = layer;
    this.effectLayer = this._emptyEffectLayer;

  }

  

  ngOnInit() {

    MessageBus.subscribe(Message.ShowFormCartoon, this.callFunc);

  }
  ngOnDestroy() {
    MessageBus.unsubscribe(Message.ShowFormCartoon, this.callFunc);

  }
  submitted = false;
  onSubmit() {

    this.submitted = true;
  }

  ngAfterContentInit() {

  }





  show() {

    if (!this.smModal.isShown) {

      this.smModal.show();
      

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
  
  
  public get layer(): LayerImageEffect {

    return this.effectLayer;
  }
  
  

  applyFilter(event:Event) {
    
    if(event)
    event.preventDefault();
    if (!this._initialized) {
      this.effectLayer.setOrgImage(this.effectLayer.getImage());
      this._initialized = true;
    }
    let originalImage = this.effectLayer.getOriginalImage();
    let callback= Callback.from(()=>{
      let effect=new ImageAlgorithmOilPainting(this.binSize,this.filterSize)    
      let img = effect.process(originalImage);
      let effect2= new ImageAlgorithmEdgeDetectionGradient(GradientEdgeFilterType.SharpenGradient,GradientDerivativeLevel.First,1,1,1,this.threshold);
      let img2=effect2.process(img);
      this.effectLayer.setImg(img2);
    });
    
    this._appService.doBusyCallback(callback);  
    
    

  }

  filterSizeChanged(event:any){
    this.filterSize=Number(event.target.value);
    this.applyFilter(undefined);
  }

  binSizeChanged(event:any){
    this.binSize=Number(event.target.value);
    this.applyFilter(undefined);
  }
  thresholdChanged(event:any){
    this.threshold=Number(event.target.value);
    this.applyFilter(undefined);
  }
 

  close(event:Event) {
    event.preventDefault();
    
      let algo = new ImageAlgorithmOilPainting(this.binSize,this.filterSize);
      //let algo2=new ImageAlgorithmEdgeDetectionGradient(GradientEdgeFilterType.EdgeDetectGradient,GradientDerivativeLevel.First,)
     
      let cmd = new CmdExecuteImageAlgorithms([algo], this._projectService, this._appService);
      cmd.executeAsync();
    
    
    this.smModal.hide();
    
  }


}


