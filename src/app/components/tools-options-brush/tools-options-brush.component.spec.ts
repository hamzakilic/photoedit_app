import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ToolsOptionsBrushComponent } from './tools-options-brush.component';

describe('ToolsOptionsBrushComponent', () => {
  let component: ToolsOptionsBrushComponent;
  let fixture: ComponentFixture<ToolsOptionsBrushComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ToolsOptionsBrushComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ToolsOptionsBrushComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
