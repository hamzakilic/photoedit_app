import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SurfaceComponent } from './surface.component';
import { Callback } from '../../lib/callback';
import { SurfaceCanvas } from '../../lib/surface';

describe('SurfaceComponent', () => {
  let component: SurfaceComponent;
  let fixture: ComponentFixture<SurfaceComponent>;
  let surface: SurfaceCanvas;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SurfaceComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SurfaceComponent);
    component = fixture.componentInstance;
    surface = new SurfaceCanvas();
    component.surface = surface;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
    expect(component.surface.width).toEqual(0);
    expect(component.surface.height).toEqual(0);
    expect(component.grphics).toBeTruthy();
    expect(component.surface.scale).toEqual(1);


  });
   it('should setwidthHeight must call callback func', (done) => {

     function test(){
       expect(surface.width).toEqual(10);
       expect(component.canvas.nativeElement.width).toEqual(10);
       done();
     }
     surface.setWidthHeight(10,10,
     new Callback(()=>test()));
     fixture.detectChanges();

  });
 it('should scalePlus', (done) => {


     function test(component:SurfaceComponent,fixture:ComponentFixture<SurfaceComponent>,  done){
       surface.scalePlus();
       fixture.detectChanges();
       expect(component.canvas.nativeElement.width).toEqual(10);
       expect(surface.scale).toEqual(1.1);
      // console.log(component.canvas.nativeElement.style.width);
       expect(component.canvas.nativeElement.style.width).toEqual("11px");
       done();
     }
     surface.setWidthHeight(10,10,
     new Callback(()=>test(component,fixture,done)));
     fixture.detectChanges();

  });
  it('should scaleMinus', (done) => {


     function test(component:SurfaceComponent,fixture:ComponentFixture<SurfaceComponent>,  done){
       surface.scaleMinus();
       fixture.detectChanges();
       expect(component.canvas.nativeElement.width).toEqual(10);
       expect(surface.scale).toEqual(0.9);
       //console.log(component.canvas.nativeElement.style.width);
       expect(component.canvas.nativeElement.style.width).toEqual("9px");
       done();
     }
     surface.setWidthHeight(10,10,
     new Callback(()=>test(component,fixture,done)));
     fixture.detectChanges();

  });

});

