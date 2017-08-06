import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { WorkspaceResizeComponent } from './workspace-resize.component';

describe('WorkspaceResizeComponent', () => {
  let component: WorkspaceResizeComponent;
  let fixture: ComponentFixture<WorkspaceResizeComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ WorkspaceResizeComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(WorkspaceResizeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
