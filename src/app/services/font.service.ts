

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

class googleFonts {
  private _http:Http;
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
       
        this._fonts=data.items;
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
  
  private _fonts:Array<any>=undefined;
  
 
  private loadGoogleFonts(fonts:Array<string>) {

    WebFont.load({
      google: {
        families: fonts
      },
      /* loading: function () {  console.log("loading font") },
      active: function () {  console.log("font active") },
      inactive: function () {  console.log("font inactive") },
      fontloading: function (familyName, fvd) {  console.log("font loading" + familyName) },
      fontactive: function (familyName, fvd) {  console.log("font active" + familyName) },
      fontinactive: function (familyName, fvd) {  console.log("font inactive" + familyName) } */
    });
  }

  public get languages():Array<any>{
    
    if(!this._fonts)
      return [];
    let languageNames=[];
    //find google languages of fonts
    this._fonts.forEach((val,index,arr)=>{
      val.subsets.forEach((lan,lindex,lar)=>{
      if(languageNames.findIndex((elem,eindex,earr)=>elem.id===lan)==-1)//distinct them
            languageNames.push({id:lan,text:lan});
      });
    });
   
    return languageNames;
    
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

}


