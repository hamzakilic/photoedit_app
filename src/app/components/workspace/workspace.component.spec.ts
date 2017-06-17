import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BsDropdownModule } from 'ngx-bootstrap';
import { TabsModule } from 'ngx-bootstrap';
import { ModalModule } from 'ngx-bootstrap';

import { ProjectService } from '../../shared/project.service';
import { KeyboardService } from '../../shared/keyboard.service';
import { Workspace } from '../../shared/project/workSpace';
import { SurfaceComponent } from '../surface/surface.component';
import { LayerComponent } from '../layer/layer.component';


import { WorkspaceComponent } from './workspace.component';

import { Callback  } from '../../lib/callback';
import { LayersInfoComponent } from '../layers-info/layers-info.component';


describe('WorkspaceComponent', () => {
  let component: WorkspaceComponent;
  let fixture: ComponentFixture<WorkspaceComponent>;
  let workspace: Workspace;
  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SurfaceComponent, WorkspaceComponent,LayerComponent,LayersInfoComponent  ],
      providers: [ ProjectService, KeyboardService ],
      imports: [ BsDropdownModule.forRoot(),TabsModule.forRoot(), ModalModule.forRoot() ]

    })
    .compileComponents();
  }));

  beforeEach(() => {

    fixture = TestBed.createComponent(WorkspaceComponent);
    component = fixture.componentInstance;
    workspace = new Workspace(10,20);
    component.workspace = workspace;
    component.ngOnInit();
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();

  });

  it('should have canvas items', () => {
    var compiled= fixture.debugElement.nativeElement;
    expect(compiled.querySelector('layer-component')).toBeTruthy();


  });




});

