import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ToolsOptionsShapesComponent } from './tools-options-shapes.component';

describe('ToolsOptionsShapesComponent', () => {
  let component: ToolsOptionsShapesComponent;
  let fixture: ComponentFixture<ToolsOptionsShapesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ToolsOptionsShapesComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ToolsOptionsShapesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
