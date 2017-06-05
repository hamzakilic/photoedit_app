import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { LayerSelectedComponent } from './layer-selected.component';

describe('LayerSelectedComponent', () => {
  let component: LayerSelectedComponent;
  let fixture: ComponentFixture<LayerSelectedComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ LayerSelectedComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LayerSelectedComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
