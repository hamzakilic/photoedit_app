import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { Component, OnChanges, DoCheck, OnInit, ViewChild, ElementRef, Input } from '@angular/core';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';

import { Image  } from './image';
import { Callback } from './callback';
import { Graphics } from './graphics';
import { Utility } from './utility';


let width = 100;
let height = 100;

@Component({
  selector: 'bla',
  template: '<div><canvas [attr.id]="uuid" #renderCanvas class="canvas" [(attr.width)]="width" [(style.width.px)]="stwidth"   [(attr.height)]="height" [(style.height.px)]="stheight" ></canvas></div>',
  styleUrls: []
})
export class SurfaceComponent {
  width: number;
  height: number;
  stwidth: number;
  stheight: number;

  @ViewChild("renderCanvas") canvas: ElementRef;
  /**
   *
   */
  constructor() {
    this.width = width;
    this.height = height;

  }
}


describe('graphics', () => {
  let comp: SurfaceComponent;
  let fixture: ComponentFixture<SurfaceComponent>;
  let canvas: HTMLCanvasElement;
  let img: Image;
  let context: CanvasRenderingContext2D;
  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [SurfaceComponent], // declare the test component
    });

    fixture = TestBed.createComponent(SurfaceComponent);

    comp = fixture.componentInstance; // BannerComponent test instance
    canvas = comp.canvas.nativeElement as HTMLCanvasElement;
    img = new Image(width, height);
    context = canvas.getContext("2d");
  });


  it('should  create a valid graphics ', () => {
    let grp: Graphics = new Graphics(comp.canvas, width, height,1);
    expect(grp.width).toEqual(width);
    expect(grp.height).toEqual(height);
    expect(grp.scale).toEqual(1);

  });

  it('should  drawImage ', () => {
    let grp = new Graphics(comp.canvas, width, height,1);
    grp.drawImage(img);

     let result = true;
      var data = context.getImageData(0, 0, width, height).data;
      data.forEach(
        (val, index) => {
          if (img.Pixels[index] != val)
            result = false;
        });

    expect(result).toBe(true);


  });



});
