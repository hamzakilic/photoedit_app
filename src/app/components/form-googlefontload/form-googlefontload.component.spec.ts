import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FormFontloadComponent } from './form-fontload.component';

describe('FormFontloadComponent', () => {
  let component: FormFontloadComponent;
  let fixture: ComponentFixture<FormFontloadComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FormFontloadComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FormFontloadComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
