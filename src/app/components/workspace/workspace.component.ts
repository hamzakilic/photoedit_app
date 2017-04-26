import { Component, OnInit, ViewChild, Input } from '@angular/core';

import { DropdownModule } from 'ng2-bootstrap';
import { TabsModule } from 'ng2-bootstrap';
import { ModalModule } from 'ng2-bootstrap';

import { ProjectService } from '../../shared/project.service';
import { KeyboardService } from '../../shared/keyboard.service';
import { SurfaceComponent } from '../surface/surface.component';
import { Workspace } from '../../shared/project/workSpace';

import { Image } from '../../lib/image' ;
import { Callback } from '../../lib/callback';

@Component({
  selector: 'workspace-component',
  templateUrl: './workspace.component.html',
  styleUrls: ['./workspace.component.scss']
})
export class WorkspaceComponent extends SurfaceComponent {
  private projectService: ProjectService;
  private keyboardService: KeyboardService;
  @Input()
  ws:Workspace;


  constructor(projectService: ProjectService, keyboardService: KeyboardService) {
    super();
    this.projectService = projectService;
    this.keyboardService = keyboardService;

   }


  ngOnInit() {
    if(this.ws){
       let call =new Callback((callFunc)=>{

       this.setWidthHeight(this.ws.width,this.ws.height,new Callback(()=>{
       this.ws.render(this.grphics);

      if(callFunc)
        callFunc.call(undefined);

      }));
    });
    this.ws.onEvent(Workspace.EVENTRESIZED,call);
    }




    this.setBackgroundImage();

  }
  ngOnDestroy(){


  }

  private setBackgroundImage(){
    if(this.ws && this.ws.width)
      this.setWidthHeight(this.ws.width,this.ws.height,new Callback(()=>{
     // this.ws.render(this.BackgroundCanvas.grphics);
    }));


  }


  onSelected(workspace: Workspace){
    alert(workspace.name);
  }


  mouseWheelUpFunc() {
    if(this.keyboardService.IsCtrlPressed)
      this.scalePlus();

  }

  mouseWheelDownFunc() {
    if(this.keyboardService.IsCtrlPressed)
      this.scaleMinus();

  }



}

