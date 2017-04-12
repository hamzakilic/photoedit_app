import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By }              from '@angular/platform-browser';
import { DebugElement }    from '@angular/core';

import { ModalModule } from 'ng2-bootstrap';

import { FormNewImageComponent } from './form-new-image.component';

describe('FormNewImageComponent', () => {
  let component: FormNewImageComponent;
  let fixture: ComponentFixture<FormNewImageComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FormNewImageComponent ],
       imports: [

    ModalModule.forRoot(),

  ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FormNewImageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });




  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

