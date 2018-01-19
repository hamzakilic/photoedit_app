import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ToolsOptionsGradientComponent } from './tools-options-gradient.component';

describe('ToolsOptionsGradientComponent', () => {
  let component: ToolsOptionsGradientComponent;
  let fixture: ComponentFixture<ToolsOptionsGradientComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ToolsOptionsGradientComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ToolsOptionsGradientComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
