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
        
  }
  onKeyboardUp(event: KeyboardEvent) {

      this.IsCtrlPressed = event.getModifierState("Control");


  }
}
