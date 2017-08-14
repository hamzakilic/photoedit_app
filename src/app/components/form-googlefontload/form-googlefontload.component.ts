import { Component, OnInit, ViewChild } from '@angular/core';
import { MessageBus } from './../../lib/messageBus';
import { Message } from './../../entities/message';
import { Callback } from './../../lib/callback';
import { FontService } from './../../services/font.service';
import { AppService } from './../../services/app.service';

import { ModalDirective } from 'ngx-bootstrap/modal';
import { AutocompleteComponent} from '../../modulesext/autocomplete/autocomplete.component';

interface language{
   id:string;
  text:string;
}


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
  public _languages:Array<language>=[];
  private _fontService: FontService;
  private _appService:AppService;
  private _currentLanguage:language;
  private _allLanguage={id:"all",text:"All"};
  private _callbackWhenGoogleLanguagesGetted:Callback;
  public  sampleText:string;
  public searchFontName:string;
  constructor(fontService: FontService,appService:AppService) {

    //todo burası dil desteğine sahip olacak
    this.sampleText="Sample text";
    this._fontService=fontService;
    this._appService=appService;
    this._allLanguage.text="All";//language change yapılacak
    this._currentLanguage=this._allLanguage;
    this._callbackWhenGoogleLanguagesGetted=new Callback(()=>this.whenGoogleFontLanguagesGetted());
    this.callFunc = new Callback(() => this.show());
    
   
    
   

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
     
      this._fontService.loadGoogleFonts();
       
      
    }
  }

  private whenGoogleFontLanguagesGetted(){
    this._fontService.googleLanguages().forEach((val,index,arr) => {  
      
      if(this._languages.findIndex((elem,index,arr)=>elem.id===val.id)==-1)  
        this._languages.push({id:val.id,text:val.text});
      
    });
    this.autocomplete.items=this._languages;
  }
  public get languages():Array<language>{
    let langs=[];
   // console.log('languages lenght:'+this._languages.length);
    var sortedItems= this._languages.sort((a,b)=> {return a.id.localeCompare(b.id);});
    langs.push(this._allLanguage);
    sortedItems.forEach(a=>langs.push(a));
    //sortedItems.forEach((a)=>{console.log(a.id)});
    return langs;
  }
  public currentLanguage():Array<language>{
    let currents=[];
    currents.push(this._currentLanguage);
    
    return currents;
  }



  public selected(value:language):void {    
   this._currentLanguage=value;
   this.search();
  }
 

 
  public refreshValue(value:language):void {
   
    this._currentLanguage = value;
  }

  private _isSerif:boolean=false;
  private _isSansSerif:boolean=false;
  private _isDisplay:boolean=false;
  private _isHandwriting:boolean=false;
  private _isMonospace:boolean=false; 

  private _lastSearchCount:number=0;
  public get isSerif():boolean{
    return this._isSerif;

  }
  public set isSerif(val:boolean){
    this._isSerif=val;
    this.search();
  }

  public get isSansSerif():boolean{
    return this._isSansSerif;

  }
  public set isSansSerif(val:boolean){
    this._isSansSerif=val;
    this.search();
  }

  public get isDisplay():boolean{
    return this._isDisplay;

  }
  public set isDisplay(val:boolean){
    this._isDisplay=val;
    this.search();
  }

  public get isHandwriting():boolean{
    return this._isHandwriting;

  }
  public set isHandwriting(val:boolean){
    this._isHandwriting=val;
    this.search();
  }

  public get isMonospace():boolean{
    return this._isMonospace;

  }
  public set isMonospace(val:boolean){
    this._isMonospace=val;
    this.search();
  }



  public googleFonts:Array<string>=[];
  public search(){
  console.log('console:'+this.searchFontName);
  
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
        
    let items= this._fontService.searchGoogleFonts(this._currentLanguage.id,familyNames,this.searchFontName);
    this._lastSearchCount=items.length;
    this.googleFonts= items;
  }

  public get ratioOfSearchToTotal():string{
    return this._lastSearchCount+"/"+this._fontService.totalSizeGooleFonts;
  }

  public searchKeyDown(event:KeyboardEvent){
    
    if(event.keyCode==13)//enter 
      this.search();
    event.stopPropagation();
  }    

 

  

  


}


