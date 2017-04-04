declare var Modernizr: any;
import '../../assets/modernizr-custom.js';



export class checkBrowserCapabilities{
   static errMsg: string ="" ;
   static isOk(): boolean{
     let result = true;
    if(!Modernizr.canvas){
      checkBrowserCapabilities.errMsg +=" canvas not support";
      result =false;
    }



    if(!Modernizr.dataview){
      checkBrowserCapabilities.errMsg +=" dataview not support";
      result =false;
    }



    if(!Modernizr.es6collections){
      checkBrowserCapabilities.errMsg +=" es6collections not support";
      result =false;
    }

     if(!Modernizr.es6math){
      checkBrowserCapabilities.errMsg +=" es6math not support";
      result =false;
    }

     if(!Modernizr.es6number){
      checkBrowserCapabilities.errMsg +=" es6number not support";
      result =false;
    }

     if(!Modernizr.es6object){
      checkBrowserCapabilities.errMsg +=" es6object not support";
      result =false;
    }


     if(!Modernizr.promises){
      checkBrowserCapabilities.errMsg +=" promises not support";
      result =false;
    }

     if(!Modernizr.filereader){
      checkBrowserCapabilities.errMsg +=" filereader not support";
      result =false;
    }



    return result;
  }

}
