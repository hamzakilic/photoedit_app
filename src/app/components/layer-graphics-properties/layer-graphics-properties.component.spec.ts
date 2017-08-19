import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { LayerGraphicsPropertiesComponent } from './layer-graphics-properties.component';

describe('LayerGraphicsPropertiesComponent', () => {
  let component: LayerGraphicsPropertiesComponent;
  let fixture: ComponentFixture<LayerGraphicsPropertiesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ LayerGraphicsPropertiesComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LayerGraphicsPropertiesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
