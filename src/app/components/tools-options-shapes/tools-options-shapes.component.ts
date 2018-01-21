import { WorkModes } from './../../models/photoedit/iworkspace';
import { WorkModeShape } from './../../models/photoedit/workmodes/workModeShape';

import { SvgShape } from './../../lib/draw/svgShape';
import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { ShapesService } from '../../services/shapes.service';
import { Observable } from 'rxjs/Rx';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';
import { ProjectService } from '../../services/project.service';

interface Type{
  name:string;
  shapes:Array<Item>
}

interface Item{
  shape:SvgShape;
  isSelected:boolean;
}

@Component({
  selector: 'tools-options-shapes-component',
  templateUrl: './tools-options-shapes.component.html',
  styleUrls: ['./tools-options-shapes.component.scss']
})
export class ToolsOptionsShapesComponent implements OnInit {
  @ViewChild('search')search:ElementRef;
 customClass="shapes-accordion";
 closeOthers=true;
 filteredItems:Array<Item>;
 shapes:Array<Item>;
 static recentItems:Array<Item>=[];
 constructor(private shapeService:ShapesService,private projectService:ProjectService) {
    this.shapes=shapeService.brands.reduce((accu,p)=>{      
      p.shapes.forEach(x=>{
        accu.push({shape:x,isSelected:false});
      });
      return accu     
    },[]);
    this.filteredItems=this.shapes;
    this.recentItems.forEach(p=>p.isSelected=false);
    
   }

  

  ngOnInit() {
  }

  ngAfterViewInit(){
    Observable.fromEvent(this.search.nativeElement,'input').delay(500).subscribe(()=>{
      
      if(this.search.nativeElement.value=='')
      this.filteredItems=this.shapes;
      else
      this.filteredItems= this.shapes.filter(p=>p.shape.name.includes(this.search.nativeElement.value));
    })

    Observable.fromEvent<KeyboardEvent>(this.search.nativeElement,'keydown').subscribe((e)=>{
      
      if(e.keyCode == 13){
      if(this.search.nativeElement.value=='')
      this.filteredItems=this.shapes;
      else
      this.filteredItems= this.shapes.filter(p=>p.shape.name.includes(this.search.nativeElement.value));
      }
    })
  
  }

  viewBox(shape:SvgShape){
    
    return "0 0 "+shape.viewportW+" "+shape.viewportH;
  }

  selectShape(item:Item){
    this.shapes.forEach(x=>x.isSelected=false);
    item.isSelected=true;
    if(ToolsOptionsShapesComponent.recentItems.findIndex(p=>p.shape.name==item.shape.name)<0)
    ToolsOptionsShapesComponent.recentItems.push(item);
    if(this.projectService.currentProject.activeWorkspace.workMode.typeOf==WorkModes.Shapes){
      (this.projectService.currentProject.activeWorkspace.workMode as WorkModeShape).setShape(item.shape);
    }
    
  }

  public onScroll(event:any,brandName:string){
    
    return this.filteredItems.slice(event.start,event.end);
    
  }

  get recentItemsLength(){
    if(ToolsOptionsShapesComponent.recentItems)
    return ToolsOptionsShapesComponent.recentItems.length;
    return 0;
  }
  get recentItems(){
    return ToolsOptionsShapesComponent.recentItems;
  }
}

 

