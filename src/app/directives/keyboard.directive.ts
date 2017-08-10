import { Directive, Output, HostListener, EventEmitter } from '@angular/core';

@Directive({ selector: '[keyboard]' })
export class KeyboardDirective {
  @Output() keyboardUp = new EventEmitter();
  @Output() keyboardDown = new EventEmitter();

  @HostListener('window:keydown', ['$event']) onKeyboardDown(event: KeyboardEvent) {
    this.keyboardDown.emit(event);
  }
  @HostListener('window:keyup', ['$event']) onKeyboardUp(event: KeyboardEvent) {
    this.keyboardUp.emit(event);
  }

}

