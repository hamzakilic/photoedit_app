import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { Component, OnChanges, DoCheck, OnInit, ViewChild, ElementRef, Input } from '@angular/core';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';

import { image as iskilip_image } from 'iskilip/img/image';
import { callback as iskilip_callback } from 'iskilip/core/callback';
import { graphics } from './graphics';
import { utility } from './utility';


let width = 100;
let height = 100;

@Component({
  selector: 'bla',
  template: '<div><canvas [attr.id]="uuid" #renderCanvas class="canvas" [(attr.width)]="width" [(style.width.px)]="stwidth"   [(attr.height)]="height" [(style.height.px)]="stheight" ></canvas></div>',
  styleUrls: []
})
export class CanvasComponent {
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
  let comp: CanvasComponent;
  let fixture: ComponentFixture<CanvasComponent>;
  let canvas: HTMLCanvasElement;
  let img: iskilip_image;
  let context: CanvasRenderingContext2D;
  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [CanvasComponent], // declare the test component
    });

    fixture = TestBed.createComponent(CanvasComponent);

    comp = fixture.componentInstance; // BannerComponent test instance
    canvas = comp.canvas.nativeElement as HTMLCanvasElement;
    img = new iskilip_image(width, height);
    context = canvas.getContext("2d");
  });


  it('should  create a valid graphics ', () => {
    let grp: graphics = new graphics(comp.canvas, width, height);
    expect(grp.width).toEqual(width);
    expect(grp.height).toEqual(height);

  });

  it('should  drawImage ', () => {
    let grp = new graphics(comp.canvas, width, height);
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
