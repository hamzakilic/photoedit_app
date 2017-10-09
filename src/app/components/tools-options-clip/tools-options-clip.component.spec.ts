import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ToolsOptionsClipComponent } from './tools-options-clip.component';

describe('ToolsOptionsClipComponent', () => {
  let component: ToolsOptionsClipComponent;
  let fixture: ComponentFixture<ToolsOptionsClipComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ToolsOptionsClipComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ToolsOptionsClipComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
