import { Component, OnInit, ViewChild,ElementRef } from '@angular/core';
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
import {LayerImageEffect} from "../../models/photoedit/layerImageEffect";
import { HImage} from "../../lib/image";
import { ImageAlgorithmEffect} from "../../lib/imagealgorithm/imageAlgorithmEffect";
import { ImageAlgorithmClone} from "../../lib/imagealgorithm/imageAlgorithmClone";
 
import { AutocompleteComponent} from '../../modulesext/autocomplete/autocomplete.component';

@Component({
  selector: 'form-effects-instagram',
  templateUrl: './form-effects-instagram.component.html',
  styleUrls: ['./form-effects-instagram.component.scss']
})
export class FormEffectsInstagramComponent implements OnInit {

  @ViewChild("smModal")
  public smModal: ModalDirective;

  @ViewChild("surfaceContainer")
  private surfaceDiv:ElementRef



  private _effectService:EffectService;
  private _projectService:ProjectService;
  private callFunc:Callback;

  public effectLayer:LayerImageEffect;
  private _emptyEffectLayer:LayerImageEffect;
  constructor(effectService:EffectService,projectService:ProjectService) {
      this.callFunc=new Callback(()=>{this.show()});
      this._effectService=effectService;
      this._projectService=projectService;
      let layer=new LayerImageEffect(new HImage(320,240));   
      layer.whenCreatedGraphicsAgain=new Callback(()=>layer.render());
      layer.resizedAgain=false;   
      this._emptyEffectLayer=layer;

      this.effectLayer=this._emptyEffectLayer;
   }

  ngOnInit() {   
    
    MessageBus.subscribe(Message.ShowFormEffectsInstagram, this.callFunc);
    
  }
  ngOnDestroy() {
    MessageBus.unsubscribe(Message.ShowFormEffectsInstagram, this.callFunc);
    
  }
  submitted = false;
  onSubmit() {

     this.submitted = true;
  }

  ngAfterContentInit(){
   
  }
 


  

  show() {

    if (!this.smModal.isShown){
    
      this.smModal.show();
      
      this.effectLayer=this._emptyEffectLayer;
      if(this._projectService.currentProject)
        if(this._projectService.currentProject.activeWorkspace && this._projectService.currentProject.activeWorkspace.layers.length>0)
        {
          let selectedLayer=  this._projectService.currentProject.activeWorkspace.layers.find(p=>p.isSelected);
          if(!selectedLayer){
              selectedLayer= this._projectService.currentProject.activeWorkspace.layers[0];
             
          }
          let layer=new LayerImageEffect(selectedLayer.getImage());
          let rect={width:550,height:450};
          let scaleX= rect.width/layer.width;
          let scaleY= rect.height/layer.height;
          
          if(scaleX<scaleY){
            layer.width=(layer.width*scaleX).extRound();
            layer.height=(layer.height*scaleX).extRound();

          }else{
            layer.width=(layer.width*scaleY).extRound();
            layer.height=(layer.height*scaleY).extRound();

          }
      
          layer.whenCreatedGraphicsAgain=new Callback(()=>layer.render());
          layer.resizedAgain=false;         
          this.effectLayer= layer;
          
        }

        
        
      
        
      
    }

   
  }

  public get effects():Array<Effect>{
    return this._effectService.effects.items.sort((a,b)=>{ return a.name.localeCompare(b.name)});
 }

 public get layer():LayerImageEffect{

      return this.effectLayer;
 }

 applyEffect(effectName:string){

  let originalImage=  this.effectLayer.getOriginalImage();
  let effectFounded= this._effectService.effects.items.find(p=>p.name==effectName);
  if(effectFounded){
    let effect = new ImageAlgorithmEffect(effectFounded);
   let img = effect.process(originalImage);
    this.effectLayer.setImg(img);
  }
 }


}
