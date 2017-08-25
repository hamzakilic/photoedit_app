
import { Component, OnInit } from '@angular/core';
import { menu } from './menu';
import { menuItem } from './menu';
import { Utility } from '../../lib/utility';
import { ReadFileOrUrl } from '../../lib/readFileOrUrl';
import { Message } from '../../entities/message';
import { MessageBus } from '../../lib/messageBus';
import { menuItemOpenFile } from '../menubar/menuItems/menuItemOpenFile';
import { menuItemOpenImage } from '../menubar/menuItems/menuItemOpenImage';
import { menuItemNewImage } from '../menubar/menuItems/menuItemNewImage';

import { ProjectService } from '../../services/project.service';
import { AppService } from '../../services/app.service';
import { EffectService } from '../../services/effect.service';

import { SomeTestFuncs } from '../../lib/someTestFuncs'

import { Callback } from '../../lib/callback';
import { CmdZoom } from '../../commands/cmdZoom';

import { CmdNewLayer } from '../../commands/cmdNewLayer';
import { CmdResizeWorkspace } from '../../commands/cmdResizeWorkspace';
import { CmdShowFormResize } from '../../commands/cmdShowFormResize';
import { CmdRotateWorkspace } from '../../commands/cmdRotateWorkspace';
import { CmdAddTextLayer } from '../../commands/cmdAddTextLayer';
import { CmdShowFormFontLoad } from '../../commands/cmdShowFormFontLoad';
import { CmdShowFormLayerProperties } from '../../commands/cmdShowFormLayerProperties';
import { CmdShowFormEffectInstagram} from '../../commands/cmdShowFormEffectInstagram';
import { CmdShowFormSampleImages } from '../../commands/cmdShowFormSampleImages';

import { CmdEffect } from '../../commands/cmdEffect';
import { CmdCreateInstagramFilter } from '../../commands/cmdCreateInstagramFilter';


@Component({
  selector: 'menubar-component',
  templateUrl: './menubar.component.html',
  styleUrls: ['./menubar.component.scss']
})
export class MenubarComponent implements OnInit {
  public menus: menu[];
  private _projectService: ProjectService;
  private _appService: AppService;
  private _effectService:EffectService;
  constructor(projectService: ProjectService, appservice: AppService,effectService:EffectService) {
    this._projectService = projectService;
    this._appService = appservice;
    this._effectService=effectService;
    this.menus = [];

    let menuFile = new menu("File");
    
    menuFile.childs.push(new menuItemNewImage(projectService));
    menuFile.childs.push(new menuItemOpenImage(projectService));
    menuFile.childs.push(new menuItem("Sample Images", new Callback(() => { this.showFormSampleImages(true) })));
    let divider = new menuItem('divider', undefined);
    divider.isDivider = true;
    menuFile.childs.push(divider);   
    this.menus.push(menuFile);

    let divider2 = new menuItem('divider', undefined);
    divider2.isDivider = true;

   



    
    let menuEdit = new menu("Edit");
    menuEdit.childs.push(new menuItem("Cut", new Callback(this.notImplementedYet)));
    menuEdit.childs.push(new menuItem("Copy", new Callback(this.notImplementedYet)));
    menuEdit.childs.push(new menuItem("Paste", new Callback(this.notImplementedYet)));
    menuEdit.childs.push(new menuItem("Delete", new Callback(this.notImplementedYet)));
    this.menus.push(menuEdit);




    

    let workspace = new menu("Image");
    workspace.childs.push(new menuItem("Resize", new Callback(() => (this.resize()))));
    workspace.childs.push(new menuItem("Rotate 90", new Callback(() => { this.rotate() })));
    this.menus.push(workspace);

    let menuLayers = new menu("Layer");
    menuLayers.childs.push(new menuItem("New", new Callback(() => { this.newLayer() })));
    menuLayers.childs.push(new menuItem("New from selection", new Callback(this.notImplementedYet)));
    menuLayers.childs.push(new menuItemOpenImage(projectService, "New from a file", false));
    menuLayers.childs.push(new menuItem("New text layer", new Callback(()=>this.newTextLayer())));
    menuLayers.childs.push(new menuItem("New from sample images", new Callback(()=>this.showFormSampleImages(false))));
    this.menus.push(menuLayers);

    let effects = new menu("Effects");
    effects.childs.push(new menuItem("Instagram like", new Callback(this.showFormInstagramLike)));
    this.menus.push(effects);
    
    let font = new menu("Font");
    font.childs.push(new menuItem("Load Google Fonts", new Callback(this.showFormFontLoad)));
    this.menus.push(font);

 /*    let window = new menu("Window");
    window.childs.push(new menuItem("Show Layer Properties", new Callback(this.showFormLayerProperties)));
    this.menus.push(window); */

    let menuHelp = new menu("Help");
    menuHelp.childs.push(new menuItem("About", new Callback(this.showAbout)));
    this.menus.push(menuHelp);


    let menuTest = new menu("Test");
    menuTest.childs.push(new menuItem("Create Instagram", new Callback(() => { this.createInstagramFilter(); })));
    this.menus.push(menuTest);



  }

  ngOnInit() {
  }

  createInstagramFilter() {

    
    let cmd = new CmdCreateInstagramFilter(this._projectService,this._appService);
   
    cmd.executeAsync();
  }

  notImplementedYet() {
    MessageBus.publish(Message.ShowError, { msg: 'not implemented yet' });
  }
  showFormFontLoad(){
     let cmd=new CmdShowFormFontLoad();
     cmd.executeAsync();
  }

  showFormLayerProperties(){
    let cmd=new CmdShowFormLayerProperties();
    cmd.executeAsync();
 }

 showFormInstagramLike(){
  let cmd=new CmdShowFormEffectInstagram();
  cmd.executeAsync();
 }
/**
 * opens sample images dialog for adding new workspace or layer
 */
 showFormSampleImages(openAsWorkspace:boolean){
  let cmd=new CmdShowFormSampleImages(openAsWorkspace);
  cmd.executeAsync();
}

  showAbout() {
    MessageBus.publish(Message.ShowAbout, undefined);
  }
  zoomIn() {
    let cmd = new CmdZoom(CmdZoom.In, this._projectService);
    cmd.executeAsync();
  }

  zoomOut() {
    let cmd = new CmdZoom(CmdZoom.Out, this._projectService);
    cmd.executeAsync();
  }
  newLayer() {
    let cmd = new CmdNewLayer(this._projectService);
    cmd.executeAsync();
  }
  newTextLayer(){
    let cmd= new CmdAddTextLayer(this._projectService,this._appService);
    cmd.executeAsync();
  }

  newLayerFromAFile() {
    let cmd = new CmdNewLayer(this._projectService);
    cmd.executeAsync();
  }
  resize() {
    let cmd = new CmdShowFormResize();
    cmd.executeAsync();
  }

  rotate() {
    let cmd = new CmdRotateWorkspace(this._projectService, this._appService);
    cmd.executeAsync();
  }

   effect(name:string) {
    let cmd = new CmdEffect(name,this._projectService, this._appService,this._effectService);
    cmd.executeAsync();
  }




  isMenuItem(item: any): boolean {
    return item instanceof menuItem;

  }

}




