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
  set value(val: number) {
    let temp=val;
    if (typeof val ==="string") {
      temp =parseInt(val).extRound();
      
    }
    while(temp%this.step!=0){
      temp++;
    }
    
    
    if (this._value != temp) {
      this._value = temp;

      this.valueChanged.emit(this.value);
    }
  }
  get value(): number {

    return this._value;
  }
  @Input()
  step: number = 10;

  @Output()
  valueChanged: EventEmitter<number>



  private _value: number;
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
    // this.calculatePosition();

  }
  ngAfterContentChecked() {

  }





  /* mouseDownProgress(event: MouseEvent) {



    let boundingRect = (<HTMLDivElement>this.progress.nativeElement).getBoundingClientRect();
    let x = event.pageX - boundingRect.left;
    let dif = this.max - this.min;
    let val = (x * dif / boundingRect.width) + this.min;
    this._value = val;
    this.checkValueForRange();
   this.calculatePosition();
    this.valueChanged.emit(this._value);


  }
  mouseDown() {

    this.isMouseDown = true;
  }
  mouseMove(event: MouseEvent) {

    if (this.isMouseDown) {
      let x = event.movementX;
      let boundingRect = (<HTMLDivElement>this.progress.nativeElement).getBoundingClientRect();
      let dif = this.max - this.min;
      let val = this._value + (x * dif / boundingRect.width);
      this._value = val;
       this.checkValueForRange();
     this.calculatePosition();
      this.valueChanged.emit(this._value);
    }


  }


  mouseUp() {
    this.isMouseDown = false;
  }

  mouseLeave() {

    this.isMouseDown = false;
  }

  minus() {
    let newValue = this._value - this.step;   
    this._value = newValue;
    this.checkValueForRange();
    this.calculatePosition();
    this.valueChanged.emit(this._value);


  }
  private checkValueForRange(){
    if(this._value<this.min)
      this._value=this.min;
    if(this._value>this.max)
      this._value=this.max;
  }
  private calculatePosition(){
    let dif = this.max - this.min;
    this.position = (((this._value - this.min) / dif) * 100).extRound();
  }

  plus() {
    let newValue = this._value + this.step;
   
    this._value = newValue;
    this.checkValueForRange();
   this.calculatePosition();
    this.valueChanged.emit(this._value);


  } 
 */
}
