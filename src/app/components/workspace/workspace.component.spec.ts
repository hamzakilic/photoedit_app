import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DropdownModule } from 'ng2-bootstrap';
import { TabsModule } from 'ng2-bootstrap';
import { ModalModule } from 'ng2-bootstrap';

import { ProjectService } from '../../shared/project.service';
import { KeyboardService } from '../../shared/keyboard.service';
import { Workspace } from '../../shared/project/workSpace';
import { SurfaceComponent } from '../surface/surface.component';


import { WorkspaceComponent } from './workspace.component';

import { Callback  } from '../../lib/callback';



describe('WorkspaceComponent', () => {
  let component: WorkspaceComponent;
  let fixture: ComponentFixture<WorkspaceComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SurfaceComponent, WorkspaceComponent  ],
      providers: [ ProjectService, KeyboardService ],
      imports: [ DropdownModule.forRoot(),TabsModule.forRoot(), ModalModule.forRoot() ]

    })
    .compileComponents();
  }));

  beforeEach(() => {

    fixture = TestBed.createComponent(WorkspaceComponent);
    component = fixture.componentInstance;
    component.ws = new Workspace(10,20);
    component.ngOnInit();
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();

    expect(component.width).toEqual(10);
    expect(component.height).toEqual(20);

  });

  it('should canvas width and height must be correct', (done) => {
      component.ws.onEvent(Workspace.EVENTRESIZED,new Callback(()=>{
        expect(component.width).toEqual(100);
        expect(component.height).toEqual(200);
        done();
      }));
      component.ws.resize(100,200,undefined);

  });



});

