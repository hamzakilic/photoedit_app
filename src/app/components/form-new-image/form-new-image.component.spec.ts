import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By }              from '@angular/platform-browser';
import { DebugElement }    from '@angular/core';
import { Component, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ModalModule } from 'ng2-bootstrap';
import { ReactiveFormsModule } from '@angular/forms';

import { FormNewImageComponent } from './form-new-image.component';

describe('FormNewImageComponent', () => {
  let component: FormNewImageComponent;
  let fixture: ComponentFixture<FormNewImageComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FormNewImageComponent ],
       imports: [

    ModalModule.forRoot(),
    ReactiveFormsModule

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
    expect(component.Form.get('width').value).toEqual(100);
    expect(component.Form.get('height').value).toEqual(100);

  });

   it('should set width and height', () => {
    component.width = 200;
    component.height = 500;
    fixture.detectChanges();
    expect(component.Form.get('width').value).toEqual(200);
    expect(component.Form.get('height').value).toEqual(500);


  });

  it('should set width and height must not be valid', () => {
    component.width = -10;
    component.height = 100000;
    fixture.detectChanges();
    expect(component.Form.get('width').hasError('msg')).toEqual(true);
    expect(component.Form.get('height').hasError('msg')).toEqual(true);


  });

});

