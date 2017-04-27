import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { LayerComponent } from './layer.component';
import { LayerEmpty} from '../../shared/project/layerEmpty';

describe('LayerComponent', () => {
  let component: LayerComponent;
  let fixture: ComponentFixture<LayerComponent>;
 let layer: LayerEmpty;
  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ LayerComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LayerComponent);
    component = fixture.componentInstance;
    layer = new LayerEmpty();
    layer.width = 10;
    layer.height = 20;
    layer.scale = 1;
    component.surface = layer;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
  it('should canvas have right width height ', () => {
    var compiled = fixture.debugElement.nativeElement;

    expect(compiled.querySelector('canvas').width).toEqual(10);
    expect(compiled.querySelector('canvas').height).toEqual(20);
  });

 it('should canvas scale ', () => {
    layer.scalePlus();
    fixture.detectChanges();
    var compiled = fixture.debugElement.nativeElement;
    console.log(compiled);
    expect(compiled.querySelector('canvas').style.width).toEqual('11px');
    expect(compiled.querySelector('canvas').style.height).toEqual('22px');
  });

});
