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


  }

  public setBackgroundImage(img:iskilip_image){
    alert('s');
    this.Canvas.setWidthHeight(img.width(),img.height(),new iskilip_callback((img)=>{
      alert('bla');
      this.drawImage(img);
    }));


  }
  public  drawImage(img: iskilip_image):void{
      this.Canvas.grphics.drawImage(img);
  }

  onSelected(workspace: workspace){
    alert(workspace.name);
  }



}
