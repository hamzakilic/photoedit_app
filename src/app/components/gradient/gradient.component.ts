import { ColorPickerComponent } from './../../modulesext/color-picker/color-picker.directive';
import { TupleStringNumber } from './../../entities/tuples';
import { RadialGradient } from './../../models/photoedit/gradient';
import { Rect } from './../../lib/draw/rect';
import { Graphics } from './../../lib/graphics';
import { AppService } from './../../services/app.service';
import { ProjectService } from './../../services/project.service';
import { CmdShowFormGradient } from './../../commands/cmdShowFormGradient';
import { MessageBus } from './../../lib/messageBus';
import { BlendModes,BlendMode } from './../../consts/blendModes';
import { Component, OnInit, ViewChild, ElementRef, Input, Output, ViewChildren, QueryList } from '@angular/core';
import { Gradient, LineerGradient } from '../../models/photoedit/gradient';
import { EventEmitter } from '@angular/core';



const w=10;

@Component({
  selector: 'gradient-component',
  templateUrl: './gradient.component.html',
  styleUrls: ['./gradient.component.scss']
})
export class GradientComponent implements OnInit {

  blendModes:Array<BlendMode>;
  
  @ViewChild('render')canvas:ElementRef;
  graphics:Graphics;
  @Input('bindObject') ws:any;
  @Output() modelChanged=new EventEmitter();

  @ViewChildren(ColorPickerComponent) colorpickerComponents: QueryList<ColorPickerComponent>;
  
  _blendMode:number=1;
 
  backgroundpattern:any;
  renderAgain:boolean=true;
  previousModel:Gradient=undefined;
  model:Gradient=undefined;
  constructor(private projectService: ProjectService,private appService: AppService) {  
    
    this.blendModes=BlendModes.list();
    

   }

   ngOnInit() {
    this.graphics=new Graphics(this.canvas.nativeElement,this.canvas.nativeElement.width,this.canvas.nativeElement.height,1);
    this.createPattern();  
    

  }
 
  ngAfterViewInit(){
    
  }
  

  ngDestroy(){
   
  }
  ngDoCheck(){
    
    if(this.colorpickerComponents)
    this.colorpickerComponents.forEach((item)=>{
      if(!item['isMouseAttached']){
        item.directiveElementRef.addEventListener('click',()=>{
          item.openDialog(item.directiveElementRef.style.backgroundColor);
        });
        item['isMouseAttached']=true;

      }
    })
    if(this.model!=this.ws.gradient)    
     this.model=this.ws.gradient;
    this.render();
    
  }

  


  get blendMode(){
    return this._blendMode;    
  }

 
  private createGradientType(val:number){
    let gradient:Gradient =undefined;
    if(val==1)
    gradient=new LineerGradient();
    if(val==2)
    gradient=new RadialGradient();
    
    return gradient;    
    
  }



  set blendMode(value:number){
    this._blendMode=value;
    this.renderAgain=true;
    this.render();
  }

  

  private createPattern(){
    let p=[255,255,255,255,180,180,180,255]
    let a = [p[0], p[1], p[2], p[3]]
    let b = [p[4],p[5],p[6],p[7]];

    let array = [];

   
    
    let count=Math.round((1<5?(5-1):0)+1);
    
    for(let xt=0;xt<count;++xt){
    for(let x=0;x<count;++x){
      a.forEach(item => array.push(item));      
    }
    for(let x=0;x<count;++x){
      b.forEach(item => array.push(item));      
    }
  }
  for(let xt=0;xt<count;++xt){
    for(let x=0;x<count;++x){
      b.forEach(item => array.push(item));      
    }
    for(let x=0;x<count;++x){
      a.forEach(item => array.push(item));      
    }
  }
 
    let data = new Uint8ClampedArray(array);

    let imageData = new ImageData(data, Math.sqrt(array.length/4), Math.sqrt(array.length/4));

    window.createImageBitmap(imageData).then((bitmap) => {

      this.backgroundpattern = this.graphics.createPattern(bitmap, "");
      this.render();


    }).catch((ex) => {
     
    });
  }

 
  render(){
    if(!this.model)
    return;
    if(this.renderAgain){
      this.renderAgain=false;
      let w=this.canvas.nativeElement.width;
      let h=this.canvas.nativeElement.height;
    this.graphics.clearRect(new Rect(0,0,w,h));
    if(this.backgroundpattern)
    this.graphics.fillRect(new Rect(0,0,w,h),this.backgroundpattern);
    
    let gradient=this.model;
    this.graphics.setBlendMode(gradient.blendMode);
    this.graphics.setGlobalAlpha(gradient.opacity);
    let brush=gradient.createBrush(this.graphics,[0,h/2,w,h/2]);
    /* if(gradient instanceof LineerGradient){
      let brush=this.graphics.createLinearGradient(0,h/2,w,h/2);
      gradient.colorStops.sort((a,b)=>{return a.nmb-b.nmb}).forEach((cs)=>{
        brush.addColorStop(cs.nmb,cs.str);
      });
      this.graphics.fillStyle(brush);
    } */ 
    this.graphics.fillStyle(brush);    

     this.graphics.fillRect(new Rect(0,0,w,h));
    }
  }

 

  showFormGradient(){    
    let cmd=new CmdShowFormGradient();
    cmd.executeAsync();
  }

  gradientTypeChanged(event:any){
    let gradienttype=parseInt(event.target.value);
    if(this.previousModel){
      let temp=this.model;
      this.model=this.previousModel;
      this.previousModel=temp;
      this.modelChanged.emit(this.model);      
    }else{
      this.previousModel=this.model;
      this.model=this.createGradientType(gradienttype);
      this.modelChanged.emit(this.model);
    }
    this.renderAgain=true;
    
    
  }

  blendModeChanged(event:any){
    let blendmode=parseInt(event.target.value);
    this.blendMode=blendmode;
    this.model.blendMode=this.blendModes.find(p=>p.id==blendmode).name;
    this.renderAgain=true;
    this.render();

  }
  opacityChanged(event:any){
    
    let opacity=parseInt(event.target.value);
   
    this.projectService.currentProject.activeWorkspace.gradient.opacity=opacity/100;
    this.renderAgain=true;
    this.render();
  }

  isgradientTypeSelected(val:number){
    switch(val){
      case 1:return this.model instanceof LineerGradient;
      case 2:return this.model instanceof RadialGradient;
    }
    return false;
  }

  isBlendModeSelected(item:BlendMode){
    if(!this.model)
    return false;
    return item.name==this.model.blendMode;
  }

  colorstopValueChanged(event:any,item:TupleStringNumber){
    let value=parseInt(event.target.value);
    item.nmb=value/100;
    this.renderAgain=true;
    this.render();
  }

  calculateStopValue(item:TupleStringNumber){
    return item.nmb*100;
  }

  get colorStops():Array<TupleStringNumber>{
    if(!this.model || !this.model.colorStops)
    return [];
    return this.model.colorStops;
  }

  removeColorStop(item:TupleStringNumber){
    let index=this.model.colorStops.findIndex(p=>p.str==item.str);
    if(index>-1)
      this.model.colorStops.splice(index,1);
      this.renderAgain=true;

  }
   
  addNewStopColor(){
    this.model.colorStops.push(new TupleStringNumber('rgb(255,255,255)',0));
  }

  changeColorStopValue(event:any,item:TupleStringNumber){
    item.str=event;
    this.renderAgain=true;
    this.render();
  }

  isRadial():boolean{
    return  this.model instanceof RadialGradient;
  }

  radius1Changed(event:any,item:TupleStringNumber){
    let value=parseInt(event.target.value);
    (this.model as RadialGradient).radius1=value;
    this.renderAgain=true;
    this.render();
  }

  radius2Changed(event:any,item:TupleStringNumber){
    let value=parseInt(event.target.value);
    (this.model as RadialGradient).radius2=value;
    this.renderAgain=true;
    this.render();
  }


  

  

}
