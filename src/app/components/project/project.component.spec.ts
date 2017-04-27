import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DropdownModule } from 'ng2-bootstrap';
import { TabsModule } from 'ng2-bootstrap';
import { ModalModule } from 'ng2-bootstrap';

import { ProjectComponent } from './project.component';
import { WorkspaceComponent } from '../workspace/workspace.component';
import { LayerComponent } from '../layer/layer.component';
import { SurfaceComponent } from '../surface/surface.component';


import { ProjectService } from '../../shared/project.service';
import { KeyboardService } from '../../shared/keyboard.service';
import { Proj } from '../../shared/project/proj';
import { Workspace } from '../../shared/project/workSpace';





describe('ProjectComponent', () => {
  let component: ProjectComponent;
  let fixture: ComponentFixture<ProjectComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ProjectComponent,WorkspaceComponent,SurfaceComponent,LayerComponent ],

      providers: [ ProjectService, KeyboardService ],
      imports: [ DropdownModule.forRoot(),TabsModule.forRoot(), ModalModule.forRoot() ]

    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ProjectComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
    fixture.detectChanges();
    const compiled = fixture.debugElement.nativeElement;

    expect(compiled.querySelector("tabset")).not.toBeNull();
    expect(compiled.querySelector('tabset > ul')).not.toBeNull();
    expect(compiled.querySelector('tabset > ul > li')).toBeNull();
  });
  it('should project must be defined when default', () => {
    expect(component.project).toBeDefined();
  });

  it('should success html where project is undefined', () => {
    component.project = undefined;
    fixture.detectChanges();
    const compiled = fixture.debugElement.nativeElement;
    expect(compiled.querySelector("tabset")).toBeNull();
    expect(compiled.querySelector('tabset > ul')).toBeNull();
    expect(compiled.querySelector('tabset > ul > li')).toBeNull();
  });

  it('should create a tab after creating workspace', () => {
    let ws = new Workspace(10,10,'hamza');
    component.project.addWorkspace(ws);

    fixture.detectChanges();
    const compiled = fixture.debugElement.nativeElement;

    expect(compiled.querySelector("tabset")).not.toBeNull();
    expect(compiled.querySelector('tabset > ul')).not.toBeNull();
    expect(compiled.querySelector('tabset > ul > li')).not.toBeNull();
  });




});

