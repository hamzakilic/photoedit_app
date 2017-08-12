
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

import { SomeTestFuncs } from '../../lib/someTestFuncs'

import { Callback } from '../../lib/callback';
import { CmdZoom } from '../../commands/cmdZoom';

import { CmdNewLayer } from '../../commands/cmdNewLayer';
import { CmdResizeWorkspace } from '../../commands/cmdResizeWorkspace';
import { CmdShowFormResize } from '../../commands/cmdShowFormResize';
import { CmdRotateWorkspace } from '../../commands/cmdRotateWorkspace';
import { CmdAddTextLayer } from '../../commands/cmdAddTextLayer';
import { CmdShowFormFontLoad } from '../../commands/cmdShowFormFontLoad';


@Component({
  selector: 'menubar-component',
  templateUrl: './menubar.component.html',
  styleUrls: ['./menubar.component.scss']
})
export class MenubarComponent implements OnInit {
  public menus: menu[];
  private projectService: ProjectService;
  private appService: AppService;
  constructor(projectService: ProjectService, appservice: AppService) {
    this.projectService = projectService;
    this.appService = appservice;
    this.menus = [];

    let menuFile = new menu("Workspace");
    menuFile.childs.push(new menuItemNewImage(projectService));
    menuFile.childs.push(new menuItemOpenImage(projectService));
    let divider = new menuItem('divider', undefined);
    divider.isDivider = true;
    menuFile.childs.push(divider);
    menuFile.childs.push(new menuItem("Resize", new Callback(() => (this.resize()))));
    menuFile.childs.push(new menuItem("Rotate 90", new Callback(() => { this.rotate() })));
    this.menus.push(menuFile);

    let divider2 = new menuItem('divider', undefined);
    divider2.isDivider = true;






    /*let menuView = new menu("View");

    menuView.childs.push(new menuItem("Zoom in",new Callback(()=>{ this.zoomIn()})));
    menuView.childs.push(new menuItem("Zoom out",new Callback(()=>{this.zoomOut()})));
    menuView.childs.push(new menuItem("Zoom fit",new Callback(this.notImplementedYet)));
    menuView.childs.push(new menuItem("Zoom fitH",new Callback(this.notImplementedYet)));
    menuView.childs.push(new menuItem("Zoom fitW",new Callback(this.notImplementedYet)));
    menuView.childs.push(new menuItem("Zoom fitW",new Callback(this.notImplementedYet)));
    menuView.childs.push(divider);
    this.menus.push(menuView);*/


    //let menuImage = new menu("Background");


    /* let subMenuImage=new menu("Rotate");
    subMenuImage.childs.push(new menuItem("Rotate 90",new Callback(()=>(this.rotate(90)))));  
     subMenuImage.childs.push(new menuItem("Rotate 180",new Callback(()=>(this.rotate(180)))));
      subMenuImage.childs.push(new menuItem("Rotate -90",new Callback(()=>(this.rotate(-90)))))  
       subMenuImage.childs.push(new menuItem("Rotate -180",new Callback(()=>(this.rotate(-180)))))    
    menuImage.childs.push(subMenuImage); */
    //this.menus.push(menuImage);



    let menuLayers = new menu("Layer");
    menuLayers.childs.push(new menuItem("New", new Callback(() => { this.newLayer() })));
    menuLayers.childs.push(new menuItem("New from selection", new Callback(this.notImplementedYet)));
    menuLayers.childs.push(new menuItemOpenImage(projectService, "New from a file", false));
     menuLayers.childs.push(new menuItem("New text layer", new Callback(()=>this.newTextLayer())));
    this.menus.push(menuLayers);


    let menuEdit = new menu("Edit");
    menuEdit.childs.push(new menuItem("Cut", new Callback(this.notImplementedYet)));
    menuEdit.childs.push(new menuItem("Copy", new Callback(this.notImplementedYet)));
    menuEdit.childs.push(new menuItem("Paste", new Callback(this.notImplementedYet)));
    menuEdit.childs.push(new menuItem("Delete", new Callback(this.notImplementedYet)));
    this.menus.push(menuEdit);


      let font = new menu("Font");
    font.childs.push(new menuItem("Load", new Callback(this.showFormFontLoad)));
    this.menus.push(font);

    let menuHelp = new menu("Help");
    menuHelp.childs.push(new menuItem("About", new Callback(this.showAbout)));
    this.menus.push(menuHelp);


    let menuTest = new menu("Test");
    menuTest.childs.push(new menuItem("Test Something", new Callback(() => { this.testSomeThingClicked(); })));
    this.menus.push(menuTest);



  }

  ngOnInit() {
  }

  testSomeThingClicked() {

    // MessageBus.publish(Message.ShowError,{msg:'hamza'});
   // let cmd = new CmdTestSomeThing('ba', this.projectService);
   
   //cmd.executeAsync();
  }

  notImplementedYet() {
    MessageBus.publish(Message.ShowError, { msg: 'not implemented yet' });
  }
  showFormFontLoad(){
     let cmd=new CmdShowFormFontLoad();
     cmd.executeAsync();
  }

  showAbout() {
    MessageBus.publish(Message.ShowAbout, undefined);
  }
  zoomIn() {
    let cmd = new CmdZoom(CmdZoom.In, this.projectService);
    cmd.executeAsync();
  }

  zoomOut() {
    let cmd = new CmdZoom(CmdZoom.Out, this.projectService);
    cmd.executeAsync();
  }
  newLayer() {
    let cmd = new CmdNewLayer(this.projectService);
    cmd.executeAsync();
  }
  newTextLayer(){
    let cmd= new CmdAddTextLayer(this.projectService,this.appService);
    cmd.executeAsync();
  }

  newLayerFromAFile() {
    let cmd = new CmdNewLayer(this.projectService);
    cmd.executeAsync();
  }
  resize() {
    let cmd = new CmdShowFormResize();
    cmd.executeAsync();
  }

  rotate() {
    let cmd = new CmdRotateWorkspace(this.projectService, this.appService);
    cmd.executeAsync();
  }


  isMenuItem(item: any): boolean {
    return item instanceof menuItem;

  }

}




