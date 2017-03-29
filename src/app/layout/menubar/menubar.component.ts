
import { Component, OnInit } from '@angular/core';
import {menu} from './menu';
import {menuItem } from './menu';
import {utility} from '../../lib/utility';


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
    this.menus.push(menuTest);

   }

  ngOnInit() {
  }

  testSomeThingClicked(){
    alert("testsomething clicked");
  }

}


export class menuItemOpenFile extends menuItem{
    public isOpenFile: boolean;
    public idOfInput: string;
    constructor(name: string,func:iskilip_core_callback){
      super(name,func);
      this.isOpenFile = true;
      this.idOfInput = utility.uuid();
    }
    handleFiles(): void{
      let filelist=(<HTMLInputElement>document.getElementById(this.idOfInput)).files;
      if(filelist.length>0){

         var reader = new FileReader();
         reader.onload=function(e){
           var data = reader.result;
           alert("readed size"+data.byteLength);
         }
         reader.onerror = function(e){

         }
         reader.readAsArrayBuffer(filelist[0]);
      }
    }

    onClick(parameters?:any): void{

      let fileElem = document.getElementById(this.idOfInput);
      if(fileElem)
      fileElem.click();
  }
}
