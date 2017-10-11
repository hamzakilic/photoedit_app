import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ToolsOptionsEraseComponent } from './tools-options-erase.component';

describe('ToolsOptionsEraseComponent', () => {
  let component: ToolsOptionsEraseComponent;
  let fixture: ComponentFixture<ToolsOptionsEraseComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ToolsOptionsEraseComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ToolsOptionsEraseComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
