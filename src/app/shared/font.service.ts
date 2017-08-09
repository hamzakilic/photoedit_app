import { Injectable } from '@angular/core';

@Injectable()
export class FontService {
  private _fonts:Array<string>
  constructor() { 
    this._fonts=[];
    this.addGenericFonts();
    //sort with locale and lowercase
    this._fonts=this._fonts.sort((item1,item2):number=>{
       return item1.toLocaleLowerCase().localeCompare(item2.toLocaleLowerCase());
        
    })
  }
  
  /**
   * adds source collection to destination collection if item does not exits
   */
  private  addIfNotExits(source:Array<string>,destination:Array<string>){
     source.forEach((value,index,coll)=>{
      if(destination.findIndex((element,index,array)=>{return element===value;})==-1)
         destination.push(value);
      })
  }
  private addGenericFonts(){
    //serif
    let latin=["Times New Roman", "Bodoni", "Garamond", "Minion Web", "ITC Stone Serif", "MS Georgia"];
    
    let cyrillic=["Adobe Minion Cyrillic", "Excelsior Cyrillic Upright", "Monotype Albion 70",  "ER Bukinist"];
    let hebrew =["New Peninim", "Raanana", ];
    let japanese=["Ryumin Light-KL", "Kyokasho ICA", "Futo Min A101"];
   
    let cherokee=["Lo Cicero Cherokee"];
    this.addIfNotExits(latin,this._fonts);
   
    this.addIfNotExits(cyrillic,this._fonts);
    this.addIfNotExits(hebrew,this._fonts);
    this.addIfNotExits(japanese,this._fonts);
   
    this.addIfNotExits(cherokee,this._fonts);
   
  }

  public get fonts():Array<string>{
    return this._fonts;
  }

}
