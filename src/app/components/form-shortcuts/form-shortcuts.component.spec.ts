import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FormShortcutsComponent } from './form-shortcuts.component';

describe('FormShortcutsComponent', () => {
  let component: FormShortcutsComponent;
  let fixture: ComponentFixture<FormShortcutsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FormShortcutsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FormShortcutsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
