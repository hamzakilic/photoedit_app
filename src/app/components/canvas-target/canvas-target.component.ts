import { Component, OnInit,ViewChild,ElementRef } from '@angular/core';
import {messageBus} from '../../lib/messageBus';
import {utility} from '../../lib/utility';

@Component({
  selector: 'component-canvas-target',
  templateUrl: './canvas-target.component.html',
  styleUrls: ['./canvas-target.component.scss']
})
export class CanvasTargetComponent implements OnInit {
  width: number;
  height: number;
  uuid: string;
  // get the element with the #chessCanvas on it
   // get the element with the #chessCanvas on it
  @ViewChild("renderCanvas") canvas: ElementRef;
  constructor() {
    this.width = 300;
    this.height = 300;
    this.uuid = utility.uuid();
   }

  ngOnInit() {

  }
  ngAfterViewInit(){

    let context: CanvasRenderingContext2D = this.canvas.nativeElement.getContext("2d");
      // happy drawing from here on
      context.fillStyle = 'blue';
      context.fillRect(10, 20, 150, 150);

  }
  public setWidthHeight(width:number,height:number): void {
      this.width = width;
      this.height = height;
  }
  public clear(): void {

  }

}
