import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DropdownModule } from 'ng2-bootstrap';
import { TabsModule } from 'ng2-bootstrap';
import { ModalModule } from 'ng2-bootstrap';
import { ToolbarComponent } from './toolbar.component';

describe('ToolbarComponent', () => {
  let component: ToolbarComponent;
  let fixture: ComponentFixture<ToolbarComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ToolbarComponent ],
      imports: [ DropdownModule.forRoot(),TabsModule.forRoot(), ModalModule.forRoot() ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ToolbarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
  it('should have two tabs', () => {
    expect(component.tabs.length).toEqual(2);
  });
  it('should have a tab toolbar', () => {
    expect(component.tabs.findIndex(val=>val.name=='Toolbar')).toBeGreaterThan(-1);
  });
   it('should have a tab project', () => {
    expect(component.tabs.findIndex(val=>val.name=='Project')).toBeGreaterThan(-1);
  });
});
