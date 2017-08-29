import { Component, OnInit, ViewChild, ElementRef, Input, Output, EventEmitter } from '@angular/core';


@Component({
  selector: 'trackbar-component',
  templateUrl: './trackbar.component.html',
  styleUrls: ['./trackbar.component.scss']
})
export class TrackbarComponent implements OnInit {

  @Input()
  min: number;
  @Input()
  max: number;
  @Input()
  set value(val:number){
    this._value=val;
    this.calculatePosition();
  };
  get value():number{
    return this._value;
  }
  @Input()
  step: number = 10;

  @Output()
  valueChanged: EventEmitter<number>



  private _value:number;
  public position: number;

  private isMouseDown: boolean;

  @ViewChild('progressdiv')
  progress: ElementRef;

  constructor() {

    this.position = 0;
    this.isMouseDown = false;
    this.valueChanged = new EventEmitter<number>(true);

  }


  ngOnInit() {
   this.calculatePosition();

  }
  ngAfterContentChecked() {

  }

  



  mouseDownProgress(event: MouseEvent) {



    let boundingRect = (<HTMLDivElement>this.progress.nativeElement).getBoundingClientRect();
    let x = event.pageX - boundingRect.left;
    let dif = this.max - this.min;
    let val = (x * dif / boundingRect.width) + this.min;
    this.value = val;
    this.checkValueForRange();
   this.calculatePosition();
    this.valueChanged.emit(this.value);


  }
  mouseDown() {

    this.isMouseDown = true;
  }
  mouseMove(event: MouseEvent) {

    if (this.isMouseDown) {
      let x = event.movementX;
      let boundingRect = (<HTMLDivElement>this.progress.nativeElement).getBoundingClientRect();
      let dif = this.max - this.min;
      let val = this.value + (x * dif / boundingRect.width);
      this.value = val;
       this.checkValueForRange();
     this.calculatePosition();
      this.valueChanged.emit(this.value);
    }


  }


  mouseUp() {
    this.isMouseDown = false;
  }

  mouseLeave() {

    this.isMouseDown = false;
  }

  minus() {
    let newValue = this.value - this.step;   
    this.value = newValue;
    this.checkValueForRange();
    this.calculatePosition();
    this.valueChanged.emit(this.value);


  }
  private checkValueForRange(){
    if(this.value<this.min)
      this.value=this.min;
    if(this.value>this.max)
      this.value=this.max;
  }
  private calculatePosition(){
    let dif = this.max - this.min;
    this.position = (((this.value - this.min) / dif) * 100).extRound();
  }

  plus() {
    let newValue = this.value + this.step;
   
    this.value = newValue;
    this.checkValueForRange();
   this.calculatePosition();
    this.valueChanged.emit(this.value);


  }

}
