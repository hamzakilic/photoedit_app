

import * as WebFont from '../../../node_modules/webfontloader/webfontloader';
import { Injectable } from '@angular/core';
import { Http, Response, Headers, RequestOptions } from '@angular/http';
import {Observable} from 'rxjs/Rx';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';
import { Message} from './../entities/message';
import { MessageBus } from './../lib/messageBus';


class utility {
  /**
   * adds source collection to destination collection if item does not exits
   */
  public static addIfNotExits(source: Array<string>, destination: Array<string>) {
    source.forEach((value, index, coll) => {
      if (destination.findIndex((element, index, array) => { return element === value; }) == -1)
        destination.push(value);
    })
  }
}

class genericFonts {
  public get fonts() {
    let fonts = [];
    //serif
    let serif = ["Georgia", "Palatino Linotype", "Book Antiqua", "Palatino", "Times New Roman", "Times"];

    let sanserif = ["Arial", "Helvetica", "Arial Black", "Gadget", "Comic Sans MS", "cursive", "Impact", "Charcoal", "Lucida Sans Unicode", "Lucida Grande", "Tahoma", "Geneva", "Trebuchet MS", "Helvetica", "Verdana"];
    let monospace = [, "Courier New", "Courier", "Lucida Console", "Monaco"];
    let others = ["Garamond", "Bookman"]
    utility.addIfNotExits(serif, fonts);
    utility.addIfNotExits(sanserif, fonts);
    utility.addIfNotExits(monospace, fonts);
    utility.addIfNotExits(others, fonts);
    return fonts;

  }
}

interface googleFont{
    subsets:Array<any>
    family:string;
    category:string;
}
class googleFontData{
  public fontData:googleFont;
  public loaded:boolean;
  /**
   *
   */
  constructor(fontData:any) {
    this.loaded=false;
    this.fontData=fontData;
    
  }
}

class googleFonts {
  private _http:Http;
 
  private _fontsMaps:Map<string,googleFontData>=undefined;
  /**
   *
   */
  constructor(private http: Http) {
   
    this._http=http;
    this.loadJson();
  }
  private _loadedJson:boolean=false;
  private loadJson(){
    
    if(!this._loadedJson){
      //todo: error durumu handle edilmeli
      //load json file 
      this._http.get("assets/json/googlefonts.json").map((response)=>{return response.json()}).subscribe(data=>{
        
        
        this._fontsMaps=new Map<string,googleFontData>();
        data.items.forEach((elem,index,arr)=>{
          let googleFont=new googleFontData(elem);
          this._fontsMaps.set(googleFont.fontData.family,googleFont);

        });
        this._loadedJson=true;
        //pusblish a message 
        MessageBus.publish(Message.GoogleFontsLanguagesGetted,undefined);
        /* let fontNames=[];
        this._fonts.forEach((val,index,arr)=>{
          fontNames.push(val.family);
        });
        this.loadGoogleFonts(fontNames); */
        
      },err=>{console.log(err);this._loadedJson=false;})
    }

  }
  
  
 
  
  private _isLoadingFonts=false;

  public loadGoogleFonts(fonts:Array<string>) {
    
    if(this._isLoadingFonts)//dont start loading again
         return;
    let notLoaded=[];
    this._fontsMaps.forEach((value,key,map)=>{
        if(!value.loaded){
          if(fonts.findIndex((e,i,a)=>value.fontData.family===e)==-1)            
            notLoaded.push(value.fontData.family);
        }
    });
      this._isLoadingFonts=true;
    
    WebFont.load({
      google: {
        families: notLoaded
      },
      fontactive: (familyName, fvd)=> {
        
        if(this._fontsMaps.has(familyName))
          this._fontsMaps.get(familyName).loaded=true;
         /* MessageBus.publish(Message.FontLoaded,familyName) */ },
      active: function () { this._isLoadingFonts=false; },
      classes: false
      /* loading: function () {  console.log("loading font") },
      active: function () {  console.log("font active") },
      inactive: function () {  console.log("font inactive") },
      fontloading: function (familyName, fvd) {  console.log("font loading" + familyName) },
      fontactive: function (familyName, fvd) {  console.log("font active" + familyName) },
      fontinactive: function (familyName, fvd) {  console.log("font inactive" + familyName) } */
    });
  }

  public get languages():Array<any>{
    
    if(!this._fontsMaps)
      return [];
    let languageNames=[];
    //find google languages of fonts
    this._fontsMaps.forEach((value,key,map)=>{
      value.fontData.subsets.forEach((lan,lindex,lar)=>{
      if(languageNames.findIndex((elem,eindex,earr)=>elem.id===lan)==-1)//distinct them
            languageNames.push({id:lan,text:lan});
      });
    });
   
    return languageNames;
    
  }

  public searchFonts(language?:string,fontTypes?:Array<string>):Array<string>{
     if(!this._fontsMaps)
      return [];
    let fonts=[];
    //find google languages of fonts
    this._fontsMaps.forEach((val,key,map)=>{
      let add=true;
        if(language && language!="all"){
          if(val.fontData.subsets.findIndex((el,ind,arrr)=> el==language)==-1){
            add=false;
          }
        }
        if(fontTypes && fontTypes.length>0){
          if(fontTypes.findIndex((v,i,a)=>v==val.fontData.category)==-1)
          add=false;
        }
        if(add)
          fonts.push(val.fontData.family);
    });
      return fonts;
  }

  public get totalSizeGooleFonts():number{
    if(this._fontsMaps)
    return this._fontsMaps.size;
    return 0;
  }
}



@Injectable()
export class FontService {
  private _fonts: Array<string>;
  private _genericFonts: genericFonts;
  private _googleFonts: googleFonts;
  constructor(private http: Http) {


    this._fonts = [];
    this._genericFonts = new genericFonts();
    this._googleFonts = new googleFonts(http);
    //this.addGoogleFonts();
    utility.addIfNotExits(this._genericFonts.fonts, this._fonts);
    //sort with locale and lowercase
    this._fonts = this._fonts.sort((item1, item2): number => {
      return item1.toLocaleLowerCase().localeCompare(item2.toLocaleLowerCase());

    });
  }





  public get fonts(): Array<any> {
   
    return this._fonts;
  }

  public googleLanguages(): Array<any> {
  
    return this._googleFonts.languages;
  }

  public searchGoogleFonts(language?:string,fontTypes?:Array<string>):Array<string>{
  
   
    return  this._googleFonts.searchFonts(language,fontTypes);
    

  }
  public get totalSizeGooleFonts():number{
    return this._googleFonts.totalSizeGooleFonts;
  }

  public loadGoogleFonts(){

   new Promise((resolve,reject)=>{ this._googleFonts.loadGoogleFonts([]);resolve();});
   // this._googleFonts.loadGoogleFonts([]);
  }
  

}






