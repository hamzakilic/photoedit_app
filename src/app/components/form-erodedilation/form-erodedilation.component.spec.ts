import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FormGrayscaleComponent } from './form-grayscale.component';

describe('FormGrayscaleComponent', () => {
  let component: FormGrayscaleComponent;
  let fixture: ComponentFixture<FormGrayscaleComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FormGrayscaleComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FormGrayscaleComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
