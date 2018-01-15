import { MessageBus } from './../../lib/messageBus';
import { ModalDirective } from 'ngx-bootstrap/modal';
import { Callback } from './../../lib/callback';
import { Component, OnInit, ViewChild } from '@angular/core';
import { RouterLink } from '@angular/router';
import { Message } from '../../entities/message';

@Component({
  selector: 'form-about',
  templateUrl: './form-about.component.html',
  styleUrls: ['./form-about.component.scss']
})
export class FormAboutComponent implements OnInit {
  private callFunc: Callback;
  @ViewChild("smModal")
  public smModal: ModalDirective;

  private _items:Array<any>;
  constructor() { 
    this.callFunc = Callback.from(() => { this.show() });
    this._items=[];
    this._items.push({name:'version',detail:'1.0.0'});
    this._items.push({name:'producer',detail:'Hamza Kılıç',src:'http://www.hamzakilic.com'});
    //this._items.push({name:'licence',detail:'MIT Licence',src:'https://opensource.org/licenses/MIT'});
   // this._items.push({name:'source',detail:'source code',src:'https://github.com/hamzakilic/wjimg'});
  }

  ngOnInit() {
    
        MessageBus.subscribe(Message.ShowFormAbout, this.callFunc);
    
      }
      ngOnDestroy() {
        MessageBus.unsubscribe(Message.ShowFormAbout, this.callFunc);
    
      }

  public get items(){
    
    return this._items;
  }


  show() {
    
        if (!this.smModal.isShown) {    
         
          this.smModal.show();
    
         
        }
    
    
      }

      open(url:string){
      //  debugger;
        window.open(url,'_blank');
      }
    
  

}


