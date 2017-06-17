import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BsDropdownModule } from 'ngx-bootstrap';
import { TabsModule } from 'ngx-bootstrap';
import { ModalModule } from 'ngx-bootstrap';
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
      imports: [ BsDropdownModule.forRoot(),TabsModule.forRoot(), ModalModule.forRoot() ],
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
