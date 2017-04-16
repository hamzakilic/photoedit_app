import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { DropdownModule } from 'ng2-bootstrap';
import { TabsModule } from 'ng2-bootstrap';
import { ModalModule } from 'ng2-bootstrap';

import { LayoutComponent } from './layout.component';
import { MenubarComponent } from '../components/menubar/menubar.component';
import { ToolbarComponent } from '../components/toolbar/toolbar.component';
import { StatusbarComponent } from '../components/statusbar/statusbar.component';

import { ProjectComponent } from '../components/project/project.component';
import { WorkspaceComponent } from '../components/workspace/workspace.component';
import { CanvasComponent } from '../components/canvas-target/canvas.component';

import { ProjectService } from '../shared/project.service';

describe('LayoutComponent', () => {
  let component: LayoutComponent;
  let fixture: ComponentFixture<LayoutComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ LayoutComponent,MenubarComponent,ToolbarComponent,StatusbarComponent,WorkspaceComponent, ProjectComponent, CanvasComponent  ],
       imports: [ DropdownModule.forRoot(),TabsModule.forRoot(), ModalModule.forRoot() ],
       providers:[ ProjectService ]

    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LayoutComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();

  });
});
