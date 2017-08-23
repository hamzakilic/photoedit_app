import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FormEffectsInstagramComponent } from './form-effects-instagram.component';

describe('FormEffectsInstagramComponent', () => {
  let component: FormEffectsInstagramComponent;
  let fixture: ComponentFixture<FormEffectsInstagramComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FormEffectsInstagramComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FormEffectsInstagramComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
