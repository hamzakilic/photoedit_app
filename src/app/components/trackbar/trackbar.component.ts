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



  constructor() {

    this.position = 0;
    this.isMouseDown = false;
    this.valueChanged = new EventEmitter<number>(true);

  }


  ngOnInit() {
    

  }
  ngAfterContentChecked() {

  }


}
