
import { Component, OnInit } from '@angular/core';
import {menu} from './menu';
import {menuItem } from './menu';
import {utility} from '../../lib/utility';
import {readFileOrUrl} from '../../lib/readFileOrUrl';
import {message} from '../../lib/message';
import {messageBus} from '../../lib/messageBus';
import {menuItemOpenFile } from '../menubar/menuItems/menuItemOpenFile';
import {menuItemOpenImage } from '../menubar/menuItems/menuItemOpenImage';
import {menuItemNewImage } from '../menubar/menuItems/menuItemNewImage';

import { ProjectService } from '../../shared/project.service';

import {someTestFuncs} from '../../lib/someTestFuncs'

import {callback as iskilip_core_callback} from 'iskilip/core/callback';


@Component({
  selector: 'menubar',
  templateUrl: './menubar.component.html',
  styleUrls: ['./menubar.component.scss']
})
export class MenubarComponent implements OnInit {
  public menus: menu [];
  constructor(projectService: ProjectService ) {

    this.menus = [];

    let menuFile = new menu("File");
    menuFile.childs.push(new menuItemNewImage(projectService));
    menuFile.childs.push(new menuItemOpenImage(projectService));
    this.menus.push(menuFile);

    let menuTest = new menu("Test");
    menuTest.childs.push(new menuItem("Test Something",new iskilip_core_callback(this.testSomeThingClicked)));
    this.menus.push(menuTest);

    let menuEdit = new menu("Edit");
    menuEdit.childs.push(new menuItem("Cut",new iskilip_core_callback(this.notImplementedYet)));
    menuEdit.childs.push(new menuItem("Copy",new iskilip_core_callback(this.notImplementedYet)));
    menuEdit.childs.push(new menuItem("Paste",new iskilip_core_callback(this.notImplementedYet)));
    menuEdit.childs.push(new menuItem("Delete",new iskilip_core_callback(this.notImplementedYet)));
    this.menus.push(menuEdit);


    let menuSelect = new menu("Select");
    menuSelect.childs.push(new menuItem("Rectangle",new iskilip_core_callback(this.notImplementedYet)));
    this.menus.push(menuSelect);

    let menuTools = new menu("Tools");
    menuTools.childs.push(new menuItem("Zoom in",new iskilip_core_callback(this.notImplementedYet)));
    menuTools.childs.push(new menuItem("Zoom out",new iskilip_core_callback(this.notImplementedYet)));
    this.menus.push(menuTools);

    let menuFilters = new menu("Filters");
    menuFilters.childs.push(new menuItem("Grayscale",new iskilip_core_callback(this.notImplementedYet)));
    menuFilters.childs.push(new menuItem("BlackandWhite",new iskilip_core_callback(this.notImplementedYet)));
    this.menus.push(menuFilters);

    let menuHelp = new menu("Help");
    menuHelp.childs.push(new menuItem("About",new iskilip_core_callback(this.showAbout)));
    this.menus.push(menuHelp);



   }

  ngOnInit() {
  }

  testSomeThingClicked(){
      messageBus.publish(message.ShowError,{msg:'hamza'});
  }

  notImplementedYet(){
    messageBus.publish(message.ShowError,{msg:'not implemented yet'});
  }

  showAbout(){
      messageBus.publish(message.ShowAbout,undefined);
  }

}




