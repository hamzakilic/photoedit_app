import { Point } from './../../lib/draw/point';
import { Layer } from './layer';
import { LayerSelectRectangle } from './layerSelectRectangle';
import { Graphics } from '../../lib/graphics';
import { Callback } from '../../lib/callback';
import { HImage } from '../../lib/image';
import { Rect } from '../../lib/draw/rect';


import { RotationHelper, RotationMove } from './lib/rotationHelper';


export class LayerSelectLasso extends LayerSelectRectangle {

  protected points: Array<Point>;


  constructor(width: number, height: number, left: number, top: number) {
    super(width, height, left, top);
    this.showSelected = false;
    this.points = [];
  }

  public mouseDown(event: MouseEvent) {

    this.isMouseDown = true;
    this.points = [];
    this.stopAnimation();
  }

  public mouseMove(event: MouseEvent) {
    if (this.isMouseDown) {
      let point = this.calculatePoint(event);
      if (point) {

        this.calculateBetweenPoints(point).forEach(item => this.points.push(item));
        this.points.push(point);
        this.render();
      }
    }
    event.preventDefault();
  }


  protected calculateBetweenPoints(curPoint: Point): Array<Point> {
    let pTemps = [];
    if (this.points.length >= 1) {

      let prevPoint = this.points[this.points.length - 1];
      while (true) {

        let d = Math.sqrt((curPoint.X - prevPoint.X) * (curPoint.X - prevPoint.X) + (curPoint.Y - prevPoint.Y) * (curPoint.Y - prevPoint.Y));
        if (d > 5) {
          let t = 5 / d;
          let temp = new Point((1 - t) * prevPoint.X + t * curPoint.X, (1 - t) * prevPoint.Y + t * curPoint.Y);
          pTemps.push(temp);
          prevPoint = temp;
        } else break;
      }

    }
    return pTemps;
  }

  public mouseUp(event: MouseEvent) {
    if (this.points.length > 1)
      this.calculateBetweenPoints(this.points[0]).forEach(item => this.points.push(item));
    this.render();
    this.isMouseDown = false;
    this.startAnimation();
  }




  public render(): void {
    this.graphics.save();
    let rect = new Rect(0, 0, this.width, this.height);
    this.graphics.clearRect(rect);
    if (this.points.length > 2) {
      this.graphics.beginPath();
      this.graphics.strokeStyle("#FFF");
      this.graphics.fillStyle(this.fillStyle);
      this.graphics.lineWidth(2);
      this.graphics.moveTo(this.points[0].X, this.points[0].Y);
      let i = 1;
      for (i = 1; i < this.points.length - 2; ++i) {

        var xc = (this.points[i].X + this.points[i + 1].X) / 2;
        var yc = (this.points[i].Y + this.points[i + 1].Y) / 2;
        this.graphics.quadraticCurveTo(this.points[i].X, this.points[i].Y, xc, yc);
      }

      this.graphics.quadraticCurveTo(this.points[i + 1].X, this.points[i + 1].Y, this.points[0].X, this.points[0].Y);//close curve
      this.graphics.closePath();
      this.graphics.stroke();
      this.graphics.fill();
    }



    this.graphics.restore();
  }

  protected renderAnimation(): void {

    if (this.graphics && this.points.length > 2) {
      this.graphics.save();
      let rect = new Rect(0, 0, this.width, this.height);
      this.graphics.clearRect(rect);



      let totalParts = this.points.length;
      this.graphics.lineWidth(2);

      this.frameCounter++;
      let dividen = this.frameCounter % totalParts;
      this.graphics.strokeStyle(this.strokeStyle);
      this.graphics.moveTo(this.points[0].X, this.points[0].Y);
      let counter = 0;
      let x = 1;
      for (x = 1; x < totalParts - 1; x += 1) {
        if ((x + dividen) % 2 == 0) {

          this.graphics.beginPath();
          this.graphics.moveTo(this.points[x].X, this.points[x].Y);

          var xc = (this.points[x].X + this.points[x + 1].X) / 2;
          var yc = (this.points[x].Y + this.points[x + 1].Y) / 2;
          this.graphics.quadraticCurveTo(this.points[x].X, this.points[x].Y, xc, yc);
          this.graphics.closePath();

          this.graphics.stroke();

        }

      }
      this.graphics.beginPath();

      //this.graphics.quadraticCurveTo(this.points[x].X, this.points[x].Y, this.points[x + 1].X, this.points[x + 1].Y);
      this.graphics.quadraticCurveTo(this.points[x].X, this.points[x].Y, this.points[0].X, this.points[0].Y);
      this.graphics.closePath();
      this.graphics.stroke();
      this.scheduleAnimation();
    }


  }

  public dispose() {
    super.dispose();
    this.points = [];
    this.render();
  }



}
