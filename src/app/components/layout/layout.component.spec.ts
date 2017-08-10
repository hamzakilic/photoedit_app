import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { BsDropdownModule } from 'ngx-bootstrap';
import { TabsModule } from 'ngx-bootstrap';
import { ModalModule } from 'ngx-bootstrap';

import { LayoutComponent } from './layout.component';
import { MenubarComponent } from '../components/menubar/menubar.component';
import { ToolbarComponent } from '../components/toolbar/toolbar.component';
import { StatusbarComponent } from '../components/statusbar/statusbar.component';

import { ProjectComponent } from '../components/project/project.component';
import { WorkspaceComponent } from '../components/workspace/workspace.component';
import { LayerComponent } from '../components/layer/layer.component';
import { SurfaceComponent } from '../components/surface/surface.component';

import { ProjectService } from '../shared/project.service';

describe('LayoutComponent', () => {
  let component: LayoutComponent;
  let fixture: ComponentFixture<LayoutComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ LayoutComponent,MenubarComponent,ToolbarComponent,StatusbarComponent,WorkspaceComponent, ProjectComponent, SurfaceComponent, LayerComponent  ],
       imports: [ BsDropdownModule.forRoot(),TabsModule.forRoot(), ModalModule.forRoot() ],
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
