import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CanvasTargetComponent } from './canvas-target.component';

describe('CanvasTargetComponent', () => {
  let component: CanvasTargetComponent;
  let fixture: ComponentFixture<CanvasTargetComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CanvasTargetComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CanvasTargetComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
    expect(component.grphics).toBeTruthy();
  });
});
