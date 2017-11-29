import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FormAboutComponent } from './form-about.component';

describe('FormAboutComponent', () => {
  let component: FormAboutComponent;
  let fixture: ComponentFixture<FormAboutComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FormAboutComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FormAboutComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
