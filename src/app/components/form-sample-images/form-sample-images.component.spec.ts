import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FormSampleImagesComponent } from './form-sample-images.component';

describe('FormSampleImagesComponent', () => {
  let component: FormSampleImagesComponent;
  let fixture: ComponentFixture<FormSampleImagesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FormSampleImagesComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FormSampleImagesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
