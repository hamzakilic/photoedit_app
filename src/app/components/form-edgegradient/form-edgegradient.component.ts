import { ImageAlgorithmEdgeDetectionGradient } from './../../lib/imagealgorithm/imageAlgorithmEdgeDetectionGradient';


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
import { GradientEdgeFilterType, GradientDerivativeLevel } from '../../lib/imagealgorithm/imageAlgorithmEdgeDetectionGradient';


@Component({
  selector: 'form-edgegradient',
  templateUrl: './form-edgegradient.component.html',
  styleUrls: ['./form-edgegradient.component.scss']
})
export class FormEdgeGradientComponent implements OnInit {
  
  _filterLevel: string="First";

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
  private _applyRed:boolean=true;
  private _applyGreen:boolean=true;
  private _applyBlue:boolean=true;
  private _filterType:string="None";
  private _threshold:number=10;
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
  
  public  get applyBlue(){
    return this._applyBlue;    
  }
  public set applyBlue(value:boolean){
    this._applyBlue=value;
    this.applyFilter(undefined);

  }
  public get applyGreen() {
    return this._applyGreen;
    
  }
  public set applyGreen(value) {
    this._applyGreen=value;
    this.applyFilter(undefined);
  }

  public get applyRed() {
    return this._applyRed;
  }
  public set applyRed(value) {
    this._applyRed=value;
    this.applyFilter(undefined);
  }
  

  ngOnInit() {

    MessageBus.subscribe(Message.ShowFormEdgeGradient, this.callFunc);

  }
  ngOnDestroy() {
    MessageBus.unsubscribe(Message.ShowFormEdgeGradient, this.callFunc);

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
  private calculateFilterType():GradientEdgeFilterType{
    switch(this._filterType){
      case "None":return GradientEdgeFilterType.None;
      case "EdgeDetectMono":return GradientEdgeFilterType.EdgeDetectMono;
      case "EdgeDetectGradient":return GradientEdgeFilterType.EdgeDetectGradient;
      case "Sharpen":return GradientEdgeFilterType.Sharpen;
      case "SharpenGradient":return GradientEdgeFilterType.SharpenGradient;
    }
    return GradientEdgeFilterType.None;
  }
  private calculateLevel():GradientDerivativeLevel{
    switch(this._filterLevel){
      case "First":return GradientDerivativeLevel.First;
      case "Second":return GradientDerivativeLevel.Second;
     
    }
    return GradientDerivativeLevel.First;
  }
  

  applyFilter(event:Event) {
    if(event)
    event.preventDefault();
    if (!this._initialized) {
      this.effectLayer.setOrgImage(this.effectLayer.getImage());
      this._initialized = true;
    }
    

    let originalImage = this.effectLayer.getOriginalImage();

    let effect=new ImageAlgorithmEdgeDetectionGradient(this.calculateFilterType(),this.calculateLevel(),this._applyRed?1:0,this.applyGreen?1:0,this.applyFilter?1:0,this._threshold);
    if(effect){
    let img = effect.process(originalImage);
    this.effectLayer.setImg(img);
    }
    

  }

  filterTypeChanged(event:any){
    this._filterType=event.target.value;
    this.applyFilter(undefined);
  }

  levelChanged(event:any){
    this._filterLevel=event.target.value;
    this.applyFilter(undefined);
  }

  thresholdChanged(event:any){
    this._threshold=Number(event.target.value);
    this.applyFilter(undefined);
  }
 

  close(event:Event) {
    event.preventDefault();
    
    let effect=new ImageAlgorithmEdgeDetectionGradient(this.calculateFilterType(),this.calculateLevel(),this._applyRed?1:0,this.applyGreen?1:0,this.applyFilter?1:0,this._threshold);
      
      let cmd = new CmdExecuteImageAlgorithms([effect], this._projectService, this._appService);
      cmd.executeAsync();
    
    
    this.smModal.hide();
    
  }


}


