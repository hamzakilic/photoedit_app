
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

import {someTestFuncs} from '../../lib/someTestFuncs'

import {callback as iskilip_core_callback} from 'iskilip/core/callback';


@Component({
  selector: 'menubar',
  templateUrl: './menubar.component.html',
  styleUrls: ['./menubar.component.scss']
})
export class MenubarComponent implements OnInit {
  public menus: menu [];
  constructor() {

    this.menus = [];

    let menuFile = new menu("File");
    menuFile.childs.push(new menuItemNewImage());
    menuFile.childs.push(new menuItemOpenImage());
    this.menus.push(menuFile);

    let menuTest = new menu("Test");
    menuTest.childs.push(new menuItem("Test Something",new iskilip_core_callback(this.testSomeThingClicked)));
    this.menus.push(menuTest);



   }

  ngOnInit() {
  }

  testSomeThingClicked(){
      messageBus.publish(message.ShowError,{msg:'hamza'});
  }

}




