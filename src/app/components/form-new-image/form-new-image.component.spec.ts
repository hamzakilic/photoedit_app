import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By }              from '@angular/platform-browser';
import { DebugElement }    from '@angular/core';
import { Component, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ModalModule } from 'ngx-bootstrap';
import { ReactiveFormsModule } from '@angular/forms';
import  { ProjectService } from '../../shared/project.service';

import { FormNewImageComponent } from './form-new-image.component';



class MockProjectService {
  public currentProject= {
    hasWorkspace: false,
    addWorkspace : function(ws: any){
      this.hasWorkspace = true;
    },

  }

  constructor() {


    }

  }


describe('FormNewImageComponent', () => {
  let component: FormNewImageComponent;
  let fixture: ComponentFixture<FormNewImageComponent>;
  let service: MockProjectService = new MockProjectService();
  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FormNewImageComponent ],
      providers: [{provide:ProjectService, useValue : service}],
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

  it('should submit must correct', () => {
    component.width = 250;
    component.height = 350;
    fixture.detectChanges();
    component.show();
    component.doSubmit(undefined);
    expect(service.currentProject.hasWorkspace).toBe(true);

  });

});

