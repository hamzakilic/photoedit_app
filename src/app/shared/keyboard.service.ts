import { Injectable } from '@angular/core';

@Injectable()
export class KeyboardService {
  public IsCtrlPressed: boolean = false;


  constructor() {
    window.addEventListener('keydown', (event) => {
      this.onKeyboardDown(event);
    });
    window.addEventListener('keyup', (event) => {
      this.onKeyboardUp(event);
    });

  }
  onKeyboardDown(event: KeyboardEvent) {


        this.IsCtrlPressed = event.getModifierState("Control");
        console.log('CtrlDown:'+this.IsCtrlPressed);
  }
  onKeyboardUp(event: KeyboardEvent) {

           this.IsCtrlPressed = event.getModifierState("Control");

console.log('Ctrl Up:'+this.IsCtrlPressed);
  }
}
