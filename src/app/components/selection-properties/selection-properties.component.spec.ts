import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SelectionPropertiesComponent } from './selection-properties.component';

describe('SelectionPropertiesComponent', () => {
  let component: SelectionPropertiesComponent;
  let fixture: ComponentFixture<SelectionPropertiesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SelectionPropertiesComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SelectionPropertiesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
