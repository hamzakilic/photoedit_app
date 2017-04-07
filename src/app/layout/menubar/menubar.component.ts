
import { Component, OnInit } from '@angular/core';
import {menu} from './menu';
import {menuItem } from './menu';
import {utility} from '../../lib/utility';
import {readFileOrUrl} from '../../lib/readFileOrUrl';
import {message} from '../../lib/message';
import {messageBus} from '../../lib/messageBus';
import {menuItemOpenFile } from '../menubar/menuItems/menuItemOpenFile';
import {menuItemTest } from '../menubar/menuItems/menuItemTest';
import {someTestFuncs} from '../../lib/someTestFuncs'

import {callback as iskilip_core_callback} from 'iskilip/core/callback';


@Component({
  selector: 'layout-menubar',
  templateUrl: './menubar.component.html',
  styleUrls: ['./menubar.component.scss']
})
export class MenubarComponent implements OnInit {
  menus: menu [];
  constructor() {

    this.menus = [];

    let menuFile = new menu("File");
    menuFile.childs.push(new menuItemOpenFile("Open File",undefined));
    this.menus.push(menuFile);

    let menuTest = new menu("Test");
    menuTest.childs.push(new menuItem("Test Something",new iskilip_core_callback(this.testSomeThingClicked)));
    menuTest.childs.push(new menuItemTest("Test  DrawCanvas",someTestFuncs.TestCanvas1()));
    menuTest.childs.push(new menuItemTest("Test Canvas Zoom plus",someTestFuncs.TestCanvas2()));
    menuTest.childs.push(new menuItemTest("Test Canvas Zoom minus",someTestFuncs.TestCanvas3()));
    this.menus.push(menuTest);



   }

  ngOnInit() {
  }

  testSomeThingClicked(){
    alert("testsomething clicked");
  }

}



