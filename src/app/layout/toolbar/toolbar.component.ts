import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'layout-toolbar',
  templateUrl: './toolbar.component.html',
  styleUrls: ['./toolbar.component.scss']
})
export class ToolbarComponent implements OnInit {
  public tabs:toolBarTab[];
  public justified: boolean;
  constructor() {
    this.tabs = [];
    this.justified = true;
    let tabTools = new toolBarTab("Toolbar","Toolbar");
    this.tabs.push(tabTools);
    let tabProject = new toolBarTab("Project","Project");
    this.tabs.push(tabProject);

   }

  ngOnInit() {


  }

}


export class toolBarTab{

  public name: string;
  public title: string;
  constructor(name: string, title: string){
      this.name = name;
      this.title = title;
  }
  onSelected(){
    alert(this.title);
  }

}
