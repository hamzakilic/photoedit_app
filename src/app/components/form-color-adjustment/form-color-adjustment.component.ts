import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { MessageBus } from './../../lib/messageBus';
import { Message } from './../../entities/message';
import { Callback } from './../../lib/callback';
import { FontService } from './../../services/font.service';
import { AppService } from './../../services/app.service';
import { UserService } from './../../services/user.service';
import { Font } from './../../entities/font';
import { EffectService } from '../../services/effect.service';
import { ProjectService } from '../../services/project.service';

import { ModalDirective } from 'ngx-bootstrap/modal';
import { Effect } from "../../entities/effect";
import { LayerImageEffect } from "../../models/photoedit/layerImageEffect";
import { HImage } from "../../lib/image";

import { ImageAlgorithmGamma } from "../../lib/imagealgorithm/imageAlgorithmGamma";
import { ImageAlgorithmClone } from "../../lib/imagealgorithm/imageAlgorithmClone";
import { ImageAlgorithmBrightness } from "../../lib/imagealgorithm/imageAlgorithmBrightness";
import { ImageAlgorithmContrast } from "../../lib/imagealgorithm/imageAlgorithmContrast";
import { ImageAlgorithmSaturationLight } from "../../lib/imagealgorithm/imageAlgorithmSaturationLight";

import { CmdExecuteImageAlgorithms }  from "../../commands/cmdExecuteImageAlgorithms";


import { AutocompleteComponent } from '../../modulesext/autocomplete/autocomplete.component';

@Component({
  selector: 'form-color-adjustment',
  templateUrl: './form-color-adjustment.component.html',
  styleUrls: ['./form-color-adjustment.component.scss']
})
export class FormColorAdjustmentComponent implements OnInit {

  @ViewChild("smModal")
  public smModal: ModalDirective;

  @ViewChild("surfaceContainer")
  private surfaceDiv: ElementRef




  private _projectService: ProjectService;
  private _appService: AppService;
  private callFunc: Callback;

  public effectLayer: LayerImageEffect;
  private _emptyEffectLayer: LayerImageEffect;
  private _brightness: number = 0;
  private _contrast: number = 0;
  private _gamma: number = 1;
  private _saturation:number=0;
  private _light:number=0;
  private _initialized = false;
  constructor(projectService: ProjectService, appService: AppService) {
    this.callFunc = new Callback(() => { this.show() });

    this._projectService = projectService;
    this._appService = appService;
    let layer = new LayerImageEffect(new HImage(320, 240));
    layer.whenCreatedGraphicsAgain = new Callback(() => { layer.render(); });
    layer.resizedAgain = false;
    this._emptyEffectLayer = layer;

    this.effectLayer = this._emptyEffectLayer;

  }

  ngOnInit() {

    MessageBus.subscribe(Message.ShowFormColorAdjustments, this.callFunc);

  }
  ngOnDestroy() {
    MessageBus.unsubscribe(Message.ShowFormColorAdjustments, this.callFunc);

  }




  show() {

    if (!this.smModal.isShown) {

      this._brightness = 0;
      this._contrast = 0;
      this._gamma = 1;
      this._saturation=0;
      this._light=0;
      this.smModal.show();

      this.effectLayer = this._emptyEffectLayer;
      if (this._projectService.currentProject)
        if (this._projectService.currentProject.activeWorkspace && this._projectService.currentProject.activeWorkspace.layers.length > 0) {
          let selectedLayer = this._projectService.currentProject.activeWorkspace.layers.find(p => p.isSelected);
          if (!selectedLayer) {
            selectedLayer = this._projectService.currentProject.activeWorkspace.layers[0];

          }
          let layer = new LayerImageEffect(selectedLayer.getImage());
          let rect = { width: 480, height: 320 };
          let scaleX = rect.width / layer.width;
          let scaleY = rect.height / layer.height;

          if (scaleX < scaleY) {
            layer.width = (layer.width * scaleX).extRound();
            layer.height = (layer.height * scaleX).extRound();

          } else {
            layer.width = (layer.width * scaleY).extRound();
            layer.height = (layer.height * scaleY).extRound();

          }

          layer.whenCreatedGraphicsAgain = new Callback(() => { layer.render(); });
          layer.resizedAgain = false;
          this.effectLayer = layer;
          this._initialized = false;
        }






    }


  }



  public get layer(): LayerImageEffect {

    return this.effectLayer;
  }




  public get brightness(): number {
    return this._brightness.extRound();
  }
  public set brightness(val: number) {
    this._brightness = val;
  }
  brightnessChanged(value: number) {
    this._brightness = value;
    this.filterValues();

  }

  public get contrast(): number {
    return this._contrast.extRound();
  }
  public set contrast(val: number) {
    this._contrast = val;
  }
  contrastChanged(value: number) {
    this._contrast = value;
    this.filterValues();

  }


  public get gamma(): number {
    return this._gamma.extRound();
  }
  public set gamma(val: number) {
    this._gamma = val;
  }
  gammaChanged(value: number) {
    this.gamma = value;
    this.filterValues();

  }


  public get saturation(): number {
    return this._saturation.extRound();
  }
  public set saturation(val: number) {
    this._saturation = val;
  }
  saturationChanged(value: number) {
    this._saturation = value;
    this.filterValues();

  }

  public get light(): number {
    return this._light.extRound();
  }
  public set light(val: number) {
    this._light = val;
  }
  lightChanged(value: number) {
    this._light = value;
    this.filterValues();

  }


  _filterPromise: Promise<any>;
  filterValues() {

    if (!this._initialized) {
      this.effectLayer.setOrgImage(this.effectLayer.getImage());
      this._initialized = true;
    }
    if (!this._filterPromise) {
      
      this._filterPromise=new Promise((resolve,reject)=>{
      let img = this.effectLayer.getOriginalImage();
     
      if(this.brightness!=0){
        let algo=new ImageAlgorithmBrightness(this.brightness);
        img=algo.process(img);
      }
      if(this.contrast!=0){
        let algo=new ImageAlgorithmContrast(this.contrast);
        img=algo.process(img);
      }

      if(this.saturation!=0){
        let algo=new ImageAlgorithmSaturationLight(this.saturation/100,false);
        img=algo.process(img);
      }

      if(this.light!=0){
        let algo=new ImageAlgorithmSaturationLight(this.light/100,true);
        img=algo.process(img);
      }
     

      this.effectLayer.setImg(img);
      resolve();
      
    }).then(()=>this._filterPromise=undefined).catch(()=>this._filterPromise=undefined);
    }

  }

  close() {
    let algos=[];
    if(this.brightness!=0){
      let algo=new ImageAlgorithmBrightness(this.brightness);
     algos.push(algo);
    }
    if(this.contrast!=0){
      let algo=new ImageAlgorithmContrast(this.contrast);
      algos.push(algo);
    }

    if(this.saturation!=0){
      let algo=new ImageAlgorithmSaturationLight(this.saturation/100,false);
      algos.push(algo);
    }

    if(this.light!=0){
      let algo=new ImageAlgorithmSaturationLight(this.light/100,true);
      algos.push(algo);
    }
    if(algos.length>0){
    let cmd=new CmdExecuteImageAlgorithms(algos,this._projectService,this._appService);
    cmd.executeAsync();
    }

    this.smModal.hide();
  }


}
