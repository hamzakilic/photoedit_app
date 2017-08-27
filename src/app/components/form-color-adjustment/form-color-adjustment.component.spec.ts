import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FormColorAdjustmentComponent } from './form-color-adjustment.component';

describe('FormColorAdjustmentComponent', () => {
  let component: FormColorAdjustmentComponent;
  let fixture: ComponentFixture<FormColorAdjustmentComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FormColorAdjustmentComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FormColorAdjustmentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
