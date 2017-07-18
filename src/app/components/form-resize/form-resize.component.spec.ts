import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FormResizeComponent } from './form-resize.component';

describe('FormResizeComponent', () => {
  let component: FormResizeComponent;
  let fixture: ComponentFixture<FormResizeComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FormResizeComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FormResizeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
