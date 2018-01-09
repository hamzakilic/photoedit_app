

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


@Component({
  selector: 'form-erodedilation',
  templateUrl: './form-erodedilation.component.html',
  styleUrls: ['./form-erodedilation.component.scss']
})
export class FormErodeDilationComponent implements OnInit {

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
  private _processType:string="Erosion";
  public matrixSize:number=3;
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
  public get processType(){
    return this._processType;
  }
  public set processType(value){
    this._processType=value;
    this.applyFilter(undefined);
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

    MessageBus.subscribe(Message.ShowFormErodeDilation, this.callFunc);

  }
  ngOnDestroy() {
    MessageBus.unsubscribe(Message.ShowFormErodeDilation, this.callFunc);

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
  private calculateProcessType():MorphologyProcessType{
    switch(this.processType){
      case "Erosion":return MorphologyProcessType.Erosion;
      case "Dilation":return MorphologyProcessType.Dilation;
      case "Open":return MorphologyProcessType.Open;
      case "Closed":return MorphologyProcessType.Closed;
    }
    return MorphologyProcessType.Erosion;
  }
  

  applyFilter(event:Event) {
    if(event)
    event.preventDefault();
    if (!this._initialized) {
      this.effectLayer.setOrgImage(this.effectLayer.getImage());
      this._initialized = true;
    }
    

    let originalImage = this.effectLayer.getOriginalImage();

    let effect=new ImageAlgorithmErosionDelation(this.calculateProcessType(),this.matrixSize,this.applyRed,this.applyGreen,this.applyBlue);
    if(effect){
    let img = effect.process(originalImage);
    this.effectLayer.setImg(img);
    }
    

  }

  matrixSizeChanged(event:any){
    this.matrixSize=Number(event.target.value);
    this.applyFilter(undefined);
  }
 

  close(event:Event) {
    event.preventDefault();
    
      let algo = new ImageAlgorithmErosionDelation(this.calculateProcessType(),this.matrixSize,this.applyRed,this.applyGreen,this.applyBlue);
      if(algo){
      let cmd = new CmdExecuteImageAlgorithms([algo], this._projectService, this._appService);
      cmd.executeAsync();
    
    }
    this.smModal.hide();
    
  }


}


