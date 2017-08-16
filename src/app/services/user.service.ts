import { Injectable } from '@angular/core';
import { Font } from '../entities/font';
import { User} from '../entities/user';

import { Http, Response, Headers, RequestOptions } from '@angular/http';
import { Observable } from 'rxjs/Rx';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';

@Injectable()
export class UserService {

  
  private _user:User;
  constructor() {
    
    this.login("","");

   }

   public login(useremail:string,userpass:string):boolean{
      this._user=new User();
      this._user.userName = "hamza kılıç";
      return true;
   }
  public get currentUser():User{
    return this._user;
  }  

  public addFont(familyName:string,source:string){

    let font=new Font();
    font.familyName=familyName;
    font.source=source;
    let index=
    this._user.extraFonts.findIndex((value,index,arr)=> 
       value.familyName==familyName &&  value.source==source
    );
    if(index==-1)
      this._user.extraFonts.push(font);
  }
  public get extraFonts():Array<Font>{
    return this._user.extraFonts;
  }

   public removeFont(familyName:string,source:string){

    let font=new Font();
    font.familyName=familyName;
    font.source=source;
    let index=
    this._user.extraFonts.findIndex((value,index,arr)=> 
       value.familyName==familyName &&  value.source==source
    );
    if(index>-1)
      this._user.extraFonts.splice(index,1);
  }

  public  hasFont(familyName:string,source:string):boolean{
   let index=  this._user.extraFonts.findIndex((value,index,arr)=> 
       value.familyName==familyName &&  value.source==source
    );
    return index>-1
     
  }
}
