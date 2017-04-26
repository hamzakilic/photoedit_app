declare var Modernizr: any;
import '../../assets/modernizr-custom.js';



export class CheckBrowserCapabilities{
   static errMsg: string ="" ;
   static isOk(): boolean{
     let result = true;
    if(!Modernizr.canvas){
      CheckBrowserCapabilities.errMsg +=" canvas not support";
      result =false;
    }



    if(!Modernizr.dataview){
      CheckBrowserCapabilities.errMsg +=" dataview not support";
      result =false;
    }



    if(!Modernizr.es6collections){
      CheckBrowserCapabilities.errMsg +=" es6collections not support";
      result =false;
    }

     if(!Modernizr.es6math){
      CheckBrowserCapabilities.errMsg +=" es6math not support";
      result =false;
    }

     if(!Modernizr.es6number){
      CheckBrowserCapabilities.errMsg +=" es6number not support";
      result =false;
    }

     if(!Modernizr.es6object){
      CheckBrowserCapabilities.errMsg +=" es6object not support";
      result =false;
    }


     if(!Modernizr.promises){
      CheckBrowserCapabilities.errMsg +=" promises not support";
      result =false;
    }

     if(!Modernizr.filereader){
      CheckBrowserCapabilities.errMsg +=" filereader not support";
      result =false;
    }



    return result;
  }

}
