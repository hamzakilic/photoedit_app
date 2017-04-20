import { Component, OnInit, ViewChild, Input } from '@angular/core';

import { DropdownModule } from 'ng2-bootstrap';
import { TabsModule } from 'ng2-bootstrap';
import { ModalModule } from 'ng2-bootstrap';

import { ProjectService } from '../../shared/project.service';
import { CanvasComponent } from '../canvas-target/canvas.component';
import { workspace } from '../../shared/project/workSpace';

import { image as iskilip_image } from 'iskilip/img/image' ;
import { callback as iskilip_callback } from 'iskilip/core/callback';

@Component({
  selector: 'workspace',
  templateUrl: './workspace.component.html',
  styleUrls: ['./workspace.component.scss']
})
export class WorkspaceComponent implements OnInit {
  private projectService: ProjectService;
  @Input()
  ws:workspace;
  @ViewChild('canvas')
  public Canvas: CanvasComponent;
  constructor(projectService: ProjectService) {
    this.projectService = projectService;

   }


  ngOnInit() {
    if(this.ws)
    this.ws.reInitCallback = (callback)=>{
      console.log('3');
      this.Canvas.setWidthHeight(this.ws.width,this.ws.height,new iskilip_callback(()=>{
      this.ws.render(this.Canvas.grphics);
      console.log('4');
      if(callback)
        callback.call(undefined);

    }));
    };

    this.setBackgroundImage();

  }

  private setBackgroundImage(){
    if(this.ws && this.ws.width)
    this.Canvas.setWidthHeight(this.ws.width,this.ws.height,new iskilip_callback(()=>{
      this.ws.render(this.Canvas.grphics);
    }));


  }


  onSelected(workspace: workspace){
    alert(workspace.name);
  }



}
