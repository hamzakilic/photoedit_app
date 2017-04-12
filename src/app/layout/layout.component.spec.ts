import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { DropdownModule } from 'ng2-bootstrap';
import { TabsModule } from 'ng2-bootstrap';
import { ModalModule } from 'ng2-bootstrap';

import { LayoutComponent } from './layout.component';
import { MenubarComponent } from '../components/menubar/menubar.component';
import { ToolbarComponent } from '../components/toolbar/toolbar.component';
import { StatusbarComponent } from '../components/statusbar/statusbar.component';
import {CanvasTargetComponent} from '../components/canvas-target/canvas-target.component';

describe('LayoutComponent', () => {
  let component: LayoutComponent;
  let fixture: ComponentFixture<LayoutComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ LayoutComponent,MenubarComponent,ToolbarComponent,StatusbarComponent,CanvasTargetComponent  ],
       imports: [ DropdownModule.forRoot(),TabsModule.forRoot(), ModalModule.forRoot() ]
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
