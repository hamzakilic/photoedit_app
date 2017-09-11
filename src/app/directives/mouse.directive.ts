import { Directive, Output, HostListener, EventEmitter,Input } from '@angular/core';

@Directive({ selector: '[mouse]' })
export class MouseDirective {
  @Output() mouseWheelUp = new EventEmitter();
  @Output() mouseWheelDown = new EventEmitter();
  @Output() mouseDown = new EventEmitter();
  @Output() mouseUp = new EventEmitter();
  @Output() mouseMove = new EventEmitter();
  @Output() mouseLeave = new EventEmitter();
  @Output() mouseOver = new EventEmitter();
  @Output() doubleClick = new EventEmitter();

  /**
   *
   */
  constructor() {


  }

  @HostListener('mousewheel', ['$event']) onMouseWheelChrome(event: any) {

    this.mouseWheelFunc(event);
  }

  @HostListener('DOMMouseScroll', ['$event']) onMouseWheelFirefox(event: any) {

    this.mouseWheelFunc(event);
  }

  @HostListener('onmousewheel', ['$event']) onMouseWheelIE(event: any) {

    this.mouseWheelFunc(event);
  }

  @HostListener('mousedown',['$event']) onmousedown(event: any) {

      this.mouseDown.emit(event);

  }

  @HostListener('mouseup',['$event']) onmouseup(event: any) {

      this.mouseUp.emit(event);

  }
   @HostListener('mouseleave',['$event']) onmouseleave(event: any) {

      this.mouseLeave.emit(event);

  }

  @HostListener('mousemove',['$event']) onmousemove(event: any) {

      this.mouseMove.emit(event);

  }

  @HostListener('mouseover',['$event']) onmouseover(event: any) {
      
    this.mouseOver.emit(event);
  }
  @HostListener('dblclick',['$event']) ondblclick(event: any) {   
    
          this.doubleClick.emit(event);    
  }





  mouseWheelFunc(event: any) {
    var event = window.event || event; // old IE support
    var delta = Math.max(-1, Math.min(1, (event.wheelDelta || -event.detail)));
    if(delta > 0) {
        this.mouseWheelUp.emit(event);
    } else if(delta < 0) {
        this.mouseWheelDown.emit(event);
    }
    // for IE
    event.returnValue = false;
    // for Chrome and Firefox
    if(event.preventDefault) {
        event.preventDefault();
    }
  }
}
