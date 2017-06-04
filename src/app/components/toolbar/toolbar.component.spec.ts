import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DropdownModule } from 'ng2-bootstrap';
import { TabsModule } from 'ng2-bootstrap';
import { ModalModule } from 'ng2-bootstrap';
import { ToolbarComponent } from './toolbar.component';
import { LayersInfoComponent } from '../layers-info/layers-info.component';

import { ProjectService } from '../../shared/project.service';
import { KeyboardService } from '../../shared/keyboard.service';

describe('ToolbarComponent', () => {
  let component: ToolbarComponent;
  let fixture: ComponentFixture<ToolbarComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ToolbarComponent, LayersInfoComponent ],
      imports: [ DropdownModule.forRoot(),TabsModule.forRoot(), ModalModule.forRoot() ],
      providers: [ ProjectService, KeyboardService ],
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
    expect(component.tabs.length).toEqual(1);
  });
  it('should have a tab tools', () => {
    expect(component.tabs.findIndex(val=>val.name=='Tools')).toBeGreaterThan(-1);
  });

});
