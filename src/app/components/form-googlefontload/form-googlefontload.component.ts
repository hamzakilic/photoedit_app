import { Component, OnInit, ViewChild } from '@angular/core';
import { MessageBus } from './../../lib/messageBus';
import { Message } from './../../entities/message';
import { Callback } from './../../lib/callback';
import { FontService } from './../../services/font.service';

import { ModalDirective } from 'ngx-bootstrap/modal';
import { AutocompleteComponent} from '../../modulesext/autocomplete/autocomplete.component';

@Component({
  selector: 'formGoogleFontload-component',
  templateUrl: './form-googlefontload.component.html',
  styleUrls: ['./form-googlefontload.component.scss']
})
export class FormGoogleFontloadComponent implements OnInit {

  @ViewChild("smModal")
  public smModal: ModalDirective;
  @ViewChild('autocomplete') autocomplete: AutocompleteComponent
  
 private callFunc: Callback;
  public _languages=[];
  private fontService: FontService;
  private _currentLanguage:any;
  private _allLanguage={id:"all",text:"All"};
  private _callbackWhenGoogleLanguagesGetted:Callback;
  constructor(fontService: FontService) {
    this.fontService=fontService;
    this._allLanguage.text="All";//language change yapılacak
    this._currentLanguage=this._allLanguage;
    this._callbackWhenGoogleLanguagesGetted=new Callback(()=>this.whenGoogleFontLanguagesGetted());
    this.callFunc = new Callback(() => this.show());
    //default all langulage
    this._languages.push(this._allLanguage);
    
   

  }
  
   ngOnInit() {   
    
    MessageBus.subscribe(Message.ShowFormFontLoad, this.callFunc);
    MessageBus.subscribe(Message.GoogleFontsLanguagesGetted,this._callbackWhenGoogleLanguagesGetted);

  }
  ngOnDestroy() {
    MessageBus.unsubscribe(Message.ShowFormFontLoad, this.callFunc);
    MessageBus.unsubscribe(Message.GoogleFontsLanguagesGetted,this._callbackWhenGoogleLanguagesGetted);
  }
  submitted = false;
  onSubmit() {

     this.submitted = true;
  }

  show() {

    if (!this.smModal.isShown){
      this.smModal.show();
      this.fontService.loadGoogleFonts();
    }
  }

  private whenGoogleFontLanguagesGetted(){
    this.fontService.googleLanguages().forEach((val,index,arr) => {  
      
      if(this._languages.findIndex((elem,index,arr)=>elem.id===val.id)==-1)  
        this._languages.push({id:val.id,text:val.text});
      
    });
    this.autocomplete.items=this._languages;
  }
  public get languages():Array<any>{
   // console.log('languages lenght:'+this._languages.length);
    return this._languages;
  }
  public currentLanguage():Array<string>{
    let currents=[];
    currents.push(this._currentLanguage);
    
    return currents;
  }



  public selected(value:any):void {    
   this._currentLanguage=value;
  }
 

 
  public refreshValue(value:any):void {
   
    this._currentLanguage = value;
  }

  public isSerif:boolean=false;
  public isSansSerif:boolean=false;
  public isDisplay:boolean=false;
  public isHandwriting:boolean=false;
  public isMonospace:boolean=false;

  public get googleFonts():Array<string>{
    debugger;
    let familyNames=[];
    if(this.isSerif)
      familyNames.push("serif");
     if(this.isSansSerif)
      familyNames.push("sans-serif");
      if(this.isDisplay)
      familyNames.push("display");
       if(this.isHandwriting)
      familyNames.push("handwriting");
        if(this.isMonospace)
      familyNames.push("monospace");
    return this.fontService.searchGoogleFonts(this._currentLanguage.id,familyNames);
  }



  

  


}
