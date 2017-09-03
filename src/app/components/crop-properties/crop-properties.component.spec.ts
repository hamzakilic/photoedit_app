import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CropPropertiesComponent } from './crop-properties.component';

describe('CropPropertiesComponent', () => {
  let component: CropPropertiesComponent;
  let fixture: ComponentFixture<CropPropertiesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CropPropertiesComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CropPropertiesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
