import { Component, OnInit, Input } from '@angular/core';
import { Workspace } from '../../shared/project/workSpace';
import { Callback } from "../../lib/callback";
@Component({
  selector: 'workspace-resize',
  templateUrl: './workspace-resize.component.html',
  styleUrls: ['./workspace-resize.component.scss']
})
export class WorkspaceResizeComponent implements OnInit {

  @Input()
  workspace: Workspace;

  constructor() { }

  ngOnInit() {
  }
  isMouseEnter: boolean = false;
  
  mouseDown(event: MouseEvent) {

  
    this.workspace.selectWorking(Workspace.WorkModeResizeWorkspace);
  }
  mouseOver(event: MouseEvent) {
    this.isMouseEnter = true;

  }

  mouseLeave(event: MouseEvent) {
    this.isMouseEnter = false;
  }
  
  


  selectedCss() {

  }

}
