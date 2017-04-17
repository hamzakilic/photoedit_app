import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MenubarComponent } from './menubar.component';
import { ProjectService } from '../../shared/project.service';

class MockProjectService {

}


describe('MenubarComponent', () => {
  let component: MenubarComponent;
  let fixture: ComponentFixture<MenubarComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MenubarComponent ],
      providers:[{provide:ProjectService, useValue:MockProjectService}]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MenubarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
   it('should have file menu', () => {
    expect(component.menus.findIndex((val)=>val.name=='File')).toBeGreaterThan(-1);
  });
   it('should have file menu and childmenu openimage', () => {
    expect(component.menus.find((val)=>val.name=='File').childs.findIndex(val=>val.name=='Open Image')).toBeGreaterThan(-1);
  });
});
