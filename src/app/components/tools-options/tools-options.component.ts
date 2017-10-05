import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'tools-options-component',
  templateUrl: './tools-options.component.html',
  styleUrls: ['./tools-options.component.scss']
})
export class ToolsOptionsComponent implements OnInit {

  constructor() { }

  ngOnInit() {
  }

  get isSelectionTool():boolean{
    return true;
  }

}
