import { Point } from './../../../lib/draw/point';
import { Graphics } from './../../../lib/graphics';
export class Helper {

  static createStrokeStyle(graphics: Graphics, then: any) {

    let a = [255, 0, 0, 255]
    let b = [0, 0, 255, 255];
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


  public static calculateBetweenPoints(points: Array<Point>,dif:number=5): Array<Point> {
    let pTemps = [];
    if (points.length >= 1) {
      for (let i = 0; i < points.length - 1; ++i) {
        let prevPoint = points[i];
        let curPoint = points[i + 1];
        pTemps.push(prevPoint);
        while (true) {

          let d = Math.sqrt((curPoint.X - prevPoint.X) * (curPoint.X - prevPoint.X) + (curPoint.Y - prevPoint.Y) * (curPoint.Y - prevPoint.Y));
          if (d > dif) {
            let t = dif / d;
            let temp = new Point((1 - t) * prevPoint.X + t * curPoint.X, (1 - t) * prevPoint.Y + t * curPoint.Y);
            pTemps.push(temp);
            prevPoint = temp;
          } else break;
        }
      }

      let prevPoint = points[points.length - 1];
      let curPoint = points[0];
      pTemps.push(prevPoint);
      while (true) {

        let d = Math.sqrt((curPoint.X - prevPoint.X) * (curPoint.X - prevPoint.X) + (curPoint.Y - prevPoint.Y) * (curPoint.Y - prevPoint.Y));
        if (d > dif) {
          let t = dif / d;
          let temp = new Point((1 - t) * prevPoint.X + t * curPoint.X, (1 - t) * prevPoint.Y + t * curPoint.Y);
          pTemps.push(temp);
          prevPoint = temp;
        } else break;

      }

    }
    return pTemps;
  }


}