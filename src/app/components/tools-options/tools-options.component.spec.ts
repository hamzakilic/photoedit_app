import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ToolsOptionsComponent } from './tools-options.component';

describe('ToolsOptionsComponent', () => {
  let component: ToolsOptionsComponent;
  let fixture: ComponentFixture<ToolsOptionsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ToolsOptionsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ToolsOptionsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
