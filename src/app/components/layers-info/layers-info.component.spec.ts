import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { LayersInfoComponent } from './layers-info.component';

describe('LayersInfoComponent', () => {
  let component: LayersInfoComponent;
  let fixture: ComponentFixture<LayersInfoComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ LayersInfoComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LayersInfoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
