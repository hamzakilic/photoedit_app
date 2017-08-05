import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { LayerTextPropertiesComponent } from './layer-text-properties.component';

describe('LayerTextPropertiesComponent', () => {
  let component: LayerTextPropertiesComponent;
  let fixture: ComponentFixture<LayerTextPropertiesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ LayerTextPropertiesComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LayerTextPropertiesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
