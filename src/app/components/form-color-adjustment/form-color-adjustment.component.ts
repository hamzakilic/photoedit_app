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
import { ImageAlgorithmBrightness } from "../../lib/imagealgorithm/imageAlgorithmBrightness";
import { ImageAlgorithmContrast } from "../../lib/imagealgorithm/imageAlgorithmContrast";
import { ImageAlgorithmGamma } from "../../lib/imagealgorithm/imageAlgorithmGamma";
import { ImageAlgorithmClone } from "../../lib/imagealgorithm/imageAlgorithmClone";
import { ImageAlgorithmMath} from "../../lib/imagealgorithm/imageAlgorithmMath";
import { ImageColorMath,ImageColorMathBrightness,ImageColorMathContrast} from "../../lib/imagealgorithm/imageColorMath";
import { CmdAdjustColors }  from "../../commands/cmdAdjustColors";


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
    this.brightness = value;
    this.filterValues();

  }

  public get contrast(): number {
    return this._contrast.extRound();
  }
  public set contrast(val: number) {
    this._contrast = val;
  }
  contrastChanged(value: number) {
    this.contrast = value;
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

  _filterPromise: Promise<any>;
  filterValues() {

    if (!this._initialized) {
      this.effectLayer.setOrgImage(this.effectLayer.getImage());
      this._initialized = true;
    }
    if (!this._filterPromise) {
      
      this._filterPromise=new Promise((resolve,reject)=>{
      let originalImage = this.effectLayer.getOriginalImage();
      let maths=[];
      if(this.brightness!=0)
        maths.push(new ImageColorMathBrightness(this.brightness));
      if(this.contrast!=0)
        maths.push(new ImageColorMathContrast(this.contrast));
      let algoMaths=new ImageAlgorithmMath(maths);
      originalImage= algoMaths.process(originalImage);

      this.effectLayer.setImg(originalImage);
      resolve();
      
    }).then(()=>this._filterPromise=undefined).catch(()=>this._filterPromise=undefined);
    }

  }

  close() {
    let cmd=new CmdAdjustColors(this.brightness,this.contrast,this._projectService,this._appService);
    cmd.executeAsync();

    this.smModal.hide();
  }


}
