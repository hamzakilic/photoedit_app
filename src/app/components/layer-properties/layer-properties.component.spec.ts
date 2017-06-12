import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { LayerPropertiesComponent } from './layer-properties.component';

describe('LayerPropertiesComponent', () => {
  let component: LayerPropertiesComponent;
  let fixture: ComponentFixture<LayerPropertiesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ LayerPropertiesComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LayerPropertiesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
