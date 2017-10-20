import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ToolsOptionsBucketfillComponent } from './tools-options-bucketfill.component';

describe('ToolsOptionsBucketfillComponent', () => {
  let component: ToolsOptionsBucketfillComponent;
  let fixture: ComponentFixture<ToolsOptionsBucketfillComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ToolsOptionsBucketfillComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ToolsOptionsBucketfillComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
