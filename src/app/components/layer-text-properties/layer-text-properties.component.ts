import { Component, OnInit, Input, ViewChild } from '@angular/core';

import { Layer } from "../../models/photoedit/layer";
import { LayerText } from "../../models/photoedit/layerText";

import { FontService } from "../../services/font.service";
import { UserService } from "../../services/user.service";
import {AutoCompleteItem} from "../../entities/autocompleteItem";
import { ColorPickerComponent } from '../../modulesext/color-picker/index';


@Component({
  selector: 'layer-text-properties',
  templateUrl: './layer-text-properties.component.html',
  styleUrls: ['./layer-text-properties.component.scss'],
  
})
export class LayerTextPropertiesComponent implements OnInit {

  @Input()
  layer: LayerText;
  @ViewChild('forecolorpicker')forecolorpicker:ColorPickerComponent;
  @ViewChild('strokecolorpicker')strokcolorpicker:ColorPickerComponent;

  
  private _fontService:FontService;
  private _userService:UserService;
  
  constructor(fontService:FontService,userService:UserService) {
    this._fontService=fontService;
    this._userService = userService;
   
    
   }

  ngOnInit() {
    
    
  }

  changeText(value: any, layer: LayerText){
    if(!value){     
      value="";
    }
    layer.setText(value);
    this.colorFore=this.calculateForegroundColor(layer.color);
    this.strokedcolorFore=this.calculateForegroundColor(layer.strokedColor);
  }

   public get fontList():Array<AutoCompleteItem>{
     let items=[];
    this._fontService.genericFonts.forEach((val,index,arr)=>{
      
      items.push({id:val,fontFamily:val, text: val});
    });
    this._userService.extraFonts.forEach((val,index,arr)=>{
      
      items.push({id:val.familyName,fontFamily:val.familyName, text: val.familyName});
      
    });
    this._fontService.loadGoogleFonts(this._userService.extraFonts.map((item)=>item.familyName));
     return items;
   }
 
  private value:any = {};
  private _disabledV:string = '0';
  public disabled:boolean = false;
 
  private get disabledV():string {
    return this._disabledV;
  }
 
  private set disabledV(value:string) {
    this._disabledV = value;
    this.disabled = this._disabledV === '1';
  }


  public currentLayerFontFamily(){
    let fonts=[];
    fonts.push(this.layer.fontFamily);
    return fonts;
  }
  public currentLayerFontSize():number{
    return this.layer.fontSize;
  }
 public currentLayerIsBold():boolean{
    return this.layer.isBold;
  }

  public currentLayerIsItalic():boolean{
    return this.layer.isItalic;
  }

public changeIsItalic(value:any){
  this.layer.setIsItalic(value.target.checked);
}
public changeIsStroked(value:any){
 
  this.layer.setIsStroked(value.target.checked);
}
public get isStroked():boolean{
  return this.layer.isStroked;
}

public changeIsBold(value:any){
  this.layer.setIsBold(value.target.checked);
}

public changeFontSize(value:any){
  if(parseInt(value))
  this.layer.setFontSize(parseInt(value));
}


  public fontSelected(value:any):void {
  
    this.layer.setFontFamily(value.id);
  }
 
  public fontRemoved(value:any):void {
   // console.log('Removed value is: ', value);
  }
 
  public fontTyped(value:any):void {
   // console.log('New search input: ', value);
  }
 
  public fontRefreshValue(value:any):void {
    
    this.value = value;
  }

  public  get color():string{
    return this.layer.color;
  }
   
  public colorFore:string;
   public set color(value:string){

     this.layer.setColor(value);
     this.colorFore=this.calculateForegroundColor(value);
  }

   public  get strokedColor():string{
    return this.layer.strokedColor;
  }

  public strokedcolorFore:string;
   public set strokedColor(value:string){

     this.layer.setStrokedColor(value);
     this.strokedcolorFore=this.calculateForegroundColor(value);
  }
  

  public colorChanging(value:string){
  
   this.color=value;
   
  }

   public strokedColorChanging(value:string){
  
   this.strokedColor=value;
   
  }
  calculateForegroundColor(color:string):string{
    
    let temp=color.replace("rgba(","").replace("rgb(","").replace(")","");
    let rgba= temp.split(/,/);
    if(rgba.length>=3){
      let temp="rgba(";
      let r=parseInt(rgba[0]);
      if(Number.isInteger(r)){
        temp+=(255-r);
        let g=parseInt(rgba[1]);
        if(Number.isInteger(g)){
          temp+=","+(255-g);
          let b=parseInt(rgba[2]);
          if(Number.isInteger(b)){
            temp+=","+(255-b);
            
          }
          return temp+=",1)";
        }
      }
    }
    
   
    return "rgba(255,0,255,1)";
     
  }
  public keyboardDown(event:KeyboardEvent){

    if(event.keyCode==13){
      this.layer.setText(this.layer.text+"\n");
      event.stopPropagation();
    }
  }

  

  public changeTextAlignmentH(val:string){
    //["left" , "right" , "center" , ]
    this.layer.setTextAlignH(val);
  }
  public isTextAlignmentH(val:string){
   
    return this.layer.textAlignH==val;
  }

  public changeTextAlignmentV(val:string){
    //["top" , "middle" , "bottom" ,]
    this.layer.setTextAlignV(val);
  }
  public isTextAlignmentV(val:string){
   
    return this.layer.textAlignV==val;
  }

  public openforecolorPicker(){
    this.forecolorpicker.openDialog(this.color,false);
  }
  public openstrokecolorPicker(){
    this.strokcolorpicker.openDialog(this.strokedColor,false);
  }

  



}
