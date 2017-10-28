import { element } from 'protractor';
import { Rect } from './../../../lib/draw/rect';
import { Polygon } from './../../../lib/draw/polygon';
import { Point } from './../../../lib/draw/point';
import { Graphics } from './../../../lib/graphics';
export class Helper {

  static createStrokeStyle(graphics: Graphics, then: any) {

    let a = [255, 255, 255, 255]
    let b = [0, 0, 0, 255];
    let array = [];
    for (let i = 0; i < 6; ++i) {
      a.forEach(item => array.push(item));
      a.forEach(item => array.push(item));
      a.forEach(item => array.push(item));
      a.forEach(item => array.push(item));
      a.forEach(item => array.push(item));
      a.forEach(item => array.push(item));

      b.forEach(item => array.push(item));
      b.forEach(item => array.push(item));
      b.forEach(item => array.push(item));
      b.forEach(item => array.push(item));
      b.forEach(item => array.push(item));
      b.forEach(item => array.push(item));
    }
    for (let i = 0; i < 6; ++i) {
      b.forEach(item => array.push(item));
      b.forEach(item => array.push(item));
      b.forEach(item => array.push(item));
      b.forEach(item => array.push(item));
      b.forEach(item => array.push(item));
      b.forEach(item => array.push(item));

      a.forEach(item => array.push(item));
      a.forEach(item => array.push(item));
      a.forEach(item => array.push(item));
      a.forEach(item => array.push(item));
      a.forEach(item => array.push(item));
      a.forEach(item => array.push(item));
    }


    let data = new Uint8ClampedArray(array);

    let imageData = new ImageData(data, 12, 12);

    createImageBitmap(imageData).then((bitmap) => {

      then(bitmap);


    }).catch((ex) => {
      //TODO: exception durumu handle edilmeli
    });


  }
  public static distinctPoints(points:Array<Point>){
    let i=0;
    while(i<points.length-1){
      if(points[i].x==points[i+1].x && points[i].y == points[i+1].y)
      points.splice(i,1);
      else i++;
    }
  }




}