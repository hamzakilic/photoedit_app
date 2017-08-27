import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TrackbarComponent } from './trackbar.component';

describe('TrackbarComponent', () => {
  let component: TrackbarComponent;
  let fixture: ComponentFixture<TrackbarComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TrackbarComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TrackbarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
