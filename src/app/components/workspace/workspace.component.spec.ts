import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DropdownModule } from 'ng2-bootstrap';
import { TabsModule } from 'ng2-bootstrap';
import { ModalModule } from 'ng2-bootstrap';

import { ProjectService } from '../../shared/project.service';
import { KeyboardService } from '../../shared/keyboard.service';
import { workspace } from '../../shared/project/workSpace';
import { CanvasComponent } from '../canvas-target/canvas.component';


import { WorkspaceComponent } from './workspace.component';

import { callback as iskilip_callback } from 'iskilip/core/callback';



describe('WorkspaceComponent', () => {
  let component: WorkspaceComponent;
  let fixture: ComponentFixture<WorkspaceComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CanvasComponent, WorkspaceComponent  ],
      providers: [ ProjectService, KeyboardService ],
      imports: [ DropdownModule.forRoot(),TabsModule.forRoot(), ModalModule.forRoot() ]

    })
    .compileComponents();
  }));

  beforeEach(() => {

    fixture = TestBed.createComponent(WorkspaceComponent);
    component = fixture.componentInstance;
    component.ws = new workspace(100,200);

    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
    expect(component.Canvas).toBeTruthy();
    expect(component.ws.reInitCallback).toBeDefined();
  });

  it('should canvas width and height must be correct', () => {
      expect(component.Canvas.width).toEqual(100);
      expect(component.Canvas.height).toEqual(200);

  });

  it('should reinit canvas width and height must be correct', (done) => {

      component.ws.reInit(200,300,new iskilip_callback(()=>{
      expect(component.Canvas.width).toEqual(200);
      expect(component.Canvas.height).toEqual(300);
      done();
    }));
    fixture.detectChanges();//so important code, otherwise cannot detect


  });


});

