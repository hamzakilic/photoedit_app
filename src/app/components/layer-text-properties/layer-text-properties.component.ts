import { Component, OnInit, Input } from '@angular/core';

import { Layer } from "../../models/photoedit/layer";
import { LayerText } from "../../models/photoedit/layerText";

import { FontService } from "../../services/font.service";
import { UserService } from "../../services/user.service";
import {AutoCompleteItem} from "../../entities/autocompleteItem";


@Component({
  selector: 'layer-text-properties',
  templateUrl: './layer-text-properties.component.html',
  styleUrls: ['./layer-text-properties.component.scss'],
  
})
export class LayerTextPropertiesComponent implements OnInit {

  @Input()
  layer: LayerText;
  
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
  }

   public get fontList():Array<AutoCompleteItem>{
     let items=[];
    this._fontService.genericFonts.forEach((val,index,arr)=>{
      items.push({id:val,text: "<span style='font-family:"+val+"'>"+val+"</span>"});
    });
    this._userService.extraFonts.forEach((val,index,arr)=>{
      items.push({id:val.familyName,text: "<span style='font-family:"+val.familyName+"'>"+val.familyName+"</span>"});
    });
     return items;
   }
 
  private value:any = {};
  private _disabledV:string = '0';
  private disabled:boolean = false;
 
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
    console.log('Removed value is: ', value);
  }
 
  public fontTyped(value:any):void {
    console.log('New search input: ', value);
  }
 
  public fontRefreshValue(value:any):void {
    this.value = value;
  }

  public  get color():string{
    return this.layer.color;
  }

   public set color(value:string){

     this.layer.setColor(value);
  }

   public  get strokedColor():string{
    return this.layer.strokedColor;
  }

   public set strokedColor(value:string){

     this.layer.setStrokedColor(value);
  }
  

  public colorChanging(value:string){
  
   this.color=value;
   
  }

   public strokedColorChanging(value:string){
  
   this.strokedColor=value;
   
  }
  calculateForeground():string{
    let color= "#FF"+ this.color.substring(3,5)+"0F";
   
    return color;
  }
   calculateForegroundStrokedColor():string{
     if(this.strokedColor){
    let color= "#FF"+ this.strokedColor.substring(3,5)+"0F";
   
    return color;
     }else return "#000000";
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

  



}
