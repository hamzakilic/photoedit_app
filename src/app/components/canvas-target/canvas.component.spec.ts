import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CanvasComponent } from './canvas.component';
import { callback as iskilip_callback} from 'iskilip/core/callback';

describe('CanvasComponent', () => {
  let component: CanvasComponent;
  let fixture: ComponentFixture<CanvasComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CanvasComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CanvasComponent);
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

     function test(component:CanvasComponent,done){
       expect(component.width).toEqual(10);
       expect(component.canvas.nativeElement.width).toEqual(10);
       done();
     }
     component.setWidthHeight(10,10,
     new iskilip_callback(()=>test(component,done)));
     fixture.detectChanges();

  });
 it('should scalePlus', (done) => {


     function test(component:CanvasComponent,fixture:ComponentFixture<CanvasComponent>,  done){
       component.scalePlus();
       fixture.detectChanges();
       expect(component.canvas.nativeElement.width).toEqual(10);
       expect(component.scale).toEqual(1.1);
      // console.log(component.canvas.nativeElement.style.width);
       expect(component.canvas.nativeElement.style.width).toEqual("11px");
       done();
     }
     component.setWidthHeight(10,10,
     new iskilip_callback(()=>test(component,fixture,done)));
     fixture.detectChanges();

  });
  it('should scaleMinus', (done) => {


     function test(component:CanvasComponent,fixture:ComponentFixture<CanvasComponent>,  done){
       component.scaleMinus();
       fixture.detectChanges();
       expect(component.canvas.nativeElement.width).toEqual(10);
       expect(component.scale).toEqual(0.9);
       //console.log(component.canvas.nativeElement.style.width);
       expect(component.canvas.nativeElement.style.width).toEqual("9px");
       done();
     }
     component.setWidthHeight(10,10,
     new iskilip_callback(()=>test(component,fixture,done)));
     fixture.detectChanges();

  });

});

