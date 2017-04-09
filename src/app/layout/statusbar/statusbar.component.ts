import { Component, OnInit } from '@angular/core';

export class statusItem{
  public name: string;
  public msg: string;
  constructor(name){
    this.name = name;
  }
}



@Component({
  selector: 'layoutStatusbar',
  templateUrl: './statusbar.component.html',
  styleUrls: ['./statusbar.component.scss']
})
export class StatusbarComponent implements OnInit {
  public statusList: statusItem[];
  constructor() {
    this.statusList = [];

    let statusImagePos = new statusItem("Pos");
    this.statusList.push(statusImagePos);

    let statusTest = new statusItem("TEST2");
    this.statusList.push(statusTest);
   }

  ngOnInit() {
  }

}

