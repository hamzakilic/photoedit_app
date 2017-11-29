import { debuging } from './../debuging';
import { Injectable } from '@angular/core';
import { Callback } from '../lib/callback';
import { setTimeout } from 'timers';
import { isComponentView } from '@angular/core/src/view/util';

export class ShortCut {
  isCtrl: boolean;
  isAlt: boolean;
  isShift: boolean;
  key: string;
  keyCode: number;
  callback: Callback;
  desc:string;
  category:string;

  /**
   *
   */
  constructor(isCtrl: boolean, isAlt: boolean, isShift: boolean, key: string,category?:string,desc?:string, keyCode?: number, callback?: Callback) {
    this.category=category;
    this.desc=desc;
    this.isCtrl = isCtrl;
    this.isAlt = isAlt;
    this.isShift = isShift;
    this.key = key;
    this.keyCode = keyCode;
    this.callback = callback;

  }

}

@Injectable()
export class KeyboardService {

  private _keys: Array<ShortCut>;

  constructor() {
    
   window.addEventListener('keydown', (event) => {
      this.onKeyboardDown(event);
    },true);
    window.addEventListener('keyup', (event) => {
      this.onKeyboardUp(event);
    },true); 

    this._keys = [];

  }
  onKeyboardDown(event: KeyboardEvent) {
    
    
    
    let isCtrlPressed = event.getModifierState("Control");
    let isAltPressed = event.getModifierState("Alt");
   
    var filteredList = this._keys.filter((item) => item.isAlt == isAltPressed && item.isCtrl == isCtrlPressed && (item.keyCode == event.keyCode || item.key.toLowerCase() == event.key.toLowerCase()));
    if (filteredList.length > 0) {
      
      event.preventDefault();
      event.stopPropagation();

      var promise = new Promise((resolve, reject) => {


        filteredList.forEach(item => item.callback.call(undefined));
       

        resolve();

      });
    } else {

    }

    



  }
  onKeyboardUp(event: KeyboardEvent) {

    //this.isCtrlPressed = event.getModifierState("Control");


  }
  public add(shortCut: ShortCut) {
    
    this._keys.push(shortCut);
  }

  public get shortcuts(){
    return this._keys;
  }
}
