import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SurfaceComponent } from './surface.component';
import { Callback } from '../../lib/callback';

describe('SurfaceComponent', () => {
  let component: SurfaceComponent;
  let fixture: ComponentFixture<SurfaceComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SurfaceComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SurfaceComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
    expect(component.width).toEqual(0);
    expect(component.height).toEqual(0);
    expect(component.grphics).toBeUndefined();
    expect(component.scale).toEqual(1);


  });
   it('should setwidthHeight must call callback func', (done) => {

     function test(component:SurfaceComponent,done){
       expect(component.width).toEqual(10);
       expect(component.canvas.nativeElement.width).toEqual(10);
       done();
     }
     component.setWidthHeight(10,10,
     new Callback(()=>test(component,done)));
     fixture.detectChanges();

  });
 it('should scalePlus', (done) => {


     function test(component:SurfaceComponent,fixture:ComponentFixture<SurfaceComponent>,  done){
       component.scalePlus();
       fixture.detectChanges();
       expect(component.canvas.nativeElement.width).toEqual(10);
       expect(component.scale).toEqual(1.1);
      // console.log(component.canvas.nativeElement.style.width);
       expect(component.canvas.nativeElement.style.width).toEqual("11px");
       done();
     }
     component.setWidthHeight(10,10,
     new Callback(()=>test(component,fixture,done)));
     fixture.detectChanges();

  });
  it('should scaleMinus', (done) => {


     function test(component:SurfaceComponent,fixture:ComponentFixture<SurfaceComponent>,  done){
       component.scaleMinus();
       fixture.detectChanges();
       expect(component.canvas.nativeElement.width).toEqual(10);
       expect(component.scale).toEqual(0.9);
       //console.log(component.canvas.nativeElement.style.width);
       expect(component.canvas.nativeElement.style.width).toEqual("9px");
       done();
     }
     component.setWidthHeight(10,10,
     new Callback(()=>test(component,fixture,done)));
     fixture.detectChanges();

  });

});

