import { SvgShape } from './../lib/draw/svgShape';
import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import { Observable } from 'rxjs/Observable';

 interface Data{
  items:Array<Section>
}

 interface Section{
    type:string;
    icons:Icon
}

interface Icon{
   
}




export interface  Brand{
  name:string
  shapes:Array<SvgShape>;
}











@Injectable()
export class ShapesService {
  private _isLoaded: boolean;
  private _brands:Array<Brand>;
  
  constructor(private _http:Http) {
    this._isLoaded=false;
    this._brands=[];
    this.startLoading();
    
   }

   public get brands(){
     if(this._isLoaded)
     this.startLoading();
     return this._brands;
   }

   private startLoading(){
     
     if(this._isLoaded)
     return;
    
     this._http.get('assets/json/shapes.json').map((response)=>response.json() as Data).subscribe((data)=>{
       this._isLoaded=true;
        this._brands=data.items.map(p=>p.type).filter((value,index,arr)=>  arr.indexOf(value)===index).map(p=>{
          return {name:p,shapes:[]};
        });

        data.items.forEach(p=>{
          let brand=this._brands.find(x=>x.name==p.type);
          if(brand){
            
             for (const iterator of Object.getOwnPropertyNames(p.icons)) {

                  let shape={name:iterator} as SvgShape;
                  shape.viewportW=p.icons[iterator][0];
                  shape.viewportH=p.icons[iterator][1];
                  shape.unicode=p.icons[iterator][3];
                  shape.path=p.icons[iterator][4];
                  
                  brand.shapes.push(shape);

             }
          }
        });
        
     });
   }

}
