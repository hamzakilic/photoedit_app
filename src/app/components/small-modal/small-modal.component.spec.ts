import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By }              from '@angular/platform-browser';
import { DebugElement }    from '@angular/core';

import { ModalModule } from 'ng2-bootstrap';


import { SmallModalComponent } from './small-modal.component';

describe('SmallModalComponent', () => {
  let component: SmallModalComponent;
  let fixture: ComponentFixture<SmallModalComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SmallModalComponent ],
       imports: [

    ModalModule.forRoot(),

  ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SmallModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should msg to be equal', () => {
    component.showError({msg:'error'});
    expect(component.msg).toBe('error');
  });
  it('should messages must concat', () => {
    component.showError({msg:'error'});
    component.showError({msg:'error2'});
    expect(component.msg).toBe('errorerror2');
  });
});
