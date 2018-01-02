import { KeyboardService, ShortCut } from './../../services/keyboard.service';
import { ModalDirective } from 'ngx-bootstrap/modal';
import { MessageBus } from './../../lib/messageBus';
import { Callback } from './../../lib/callback';
import { Component, OnInit, ViewChild } from '@angular/core';
import { Message } from '../../entities/message';
import { element } from 'protractor';



class GroupedObject {
  name: string;
  shortCuts: Array<ShortCut>;
  /**
   *
   */
  constructor(name: string) {
    this.name = name;
    this.shortCuts = [];

  }
}


@Component({
  selector: 'form-shortcuts',
  templateUrl: './form-shortcuts.component.html',
  styleUrls: ['./form-shortcuts.component.scss']
})
export class FormShortcutsComponent implements OnInit {

  private callFunc: Callback;
  @ViewChild("smModal")
  public smModal: ModalDirective;
  private keyboardService: KeyboardService;
  private items: Array<GroupedObject>;
  constructor(keyboardService: KeyboardService) {
    this.items = new Array<GroupedObject>();

    this.callFunc = Callback.from(() => { this.show() });
    //create shortcuts mapped list

    this.keyboardService = keyboardService;

  }

  ngOnInit() {

    MessageBus.subscribe(Message.ShowFormShortcuts, this.callFunc);

  }
  ngOnDestroy() {
    MessageBus.unsubscribe(Message.ShowFormShortcuts, this.callFunc);

  }

  public get shortCutsList() {
    if (this.items.length == 0){      
      this.initializeShortCuts();
    }
    return this.items;
  }

  private initializeShortCuts() {
    this.keyboardService.shortcuts.reduce((prev, elem) => {
      if (elem.category) {
        var index = prev.findIndex((val) => val.name == elem.category);

        if (index < 0) {
          index = prev.length;
          
          prev.push(new GroupedObject(elem.category));
        }
        
        prev[index].shortCuts.push(elem);
      }
      return prev;
    }, this.items);
  }

  show() {

    if (!this.smModal.isShown) {

      this.smModal.show();


    }


  }

  public createShortString(shortCut: ShortCut) {
    
    if(shortCut){
      let str=[];
      if(shortCut.isShift)
      str.push('Shift');
      if(shortCut.isCtrl)
      str.push('Ctrl');
      if(shortCut.isAlt)
      str.push('Alt');
      str.push(shortCut.key)
      return str.join("+");
      
  }
  return "";
  }




}
