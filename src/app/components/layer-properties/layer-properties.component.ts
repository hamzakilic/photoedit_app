import { Component, OnInit } from '@angular/core';

import { ProjectService } from '../../shared/project.service';
import { Proj } from '../../shared/project/proj';
import { Layer } from '../../shared/project/layer';
import { Callback } from '../../lib/callback';
import { Point } from '../../lib/draw/point';
import { Calc } from '../../lib/calc';

@Component({
  selector: 'layer-properties-component',
  templateUrl: './layer-properties.component.html',
  styleUrls: ['./layer-properties.component.scss']
})
export class LayerPropertiesComponent implements OnInit {

  projectService: ProjectService;
  public project: Proj;


  constructor(projectService: ProjectService) {
    this.projectService = projectService;

    this.project = this.projectService.currentProject;
  }

  ngOnInit() {
  }

  changeRotateAngle(value: any, layer: Layer) {

    if (parseInt(value) <= 180 && parseInt(value) >= -180) {
      layer.rotateByDegrees(parseInt(value));

    }

  }
  changeWidth(value: any, layer: Layer) {


    if (parseInt(value) > 10) {

      layer.setWidthHeight(parseInt(value), layer.height, new Callback(() => layer.render()))
    }
  }

  changeHeight(value: any, layer: Layer) {

    if (parseInt(value) > 10) {
      layer.setWidthHeight(layer.width, parseInt(value), new Callback(() => layer.render()))
    }
  }
  changeTop(value: any, layer: Layer) {

    let val = parseInt(value)
    let pointX1 = new Point(layer.marginLeft, layer.marginTop);//left top
    let pointX2 = new Point(layer.marginLeft + layer.width, layer.marginTop);//right top
    let pointX3 = new Point(layer.marginLeft + layer.width, layer.marginTop + layer.height); //right bottom
    let pointX4 = new Point(layer.marginLeft, layer.marginTop + layer.height);//left bottom

    let center = new Point(layer.marginLeft + layer.width  / 2, layer.marginTop + layer.height  / 2)
    let pointX1Rotated = Calc.rotatePoint(pointX1, layer.rotateAngleDeg, center);//left top
    let pointX2Rotated = Calc.rotatePoint(pointX2, layer.rotateAngleDeg, center);//right top
    let pointX3Rotated = Calc.rotatePoint(pointX3, layer.rotateAngleDeg, center);//right bottom
    let pointX4Rotated = Calc.rotatePoint(pointX4, layer.rotateAngleDeg, center);//left bottom

    let points = [pointX1Rotated, pointX2Rotated, pointX3Rotated, pointX4Rotated];
    points.sort(this.comparePointsY);

    let point = new Point(points[0].X, val);
    
    let rotatedPoint = Calc.rotatePoint(point, -layer.rotateAngleDeg, new Point(center.X, center.Y + point.Y - points[0].Y));

    //left top point
    if (points[0].X == pointX1Rotated.X && points[0].Y == pointX1Rotated.Y) {
      layer.setTop(rotatedPoint.Y, new Callback(() => layer.render()));
      layer.setLeft(rotatedPoint.X, new Callback(() => layer.render()));
    }
    //right top
    if (points[0].X == pointX2Rotated.X && points[0].Y == pointX2Rotated.Y) {
      layer.setTop(rotatedPoint.Y, new Callback(() => layer.render()));
      layer.setLeft(rotatedPoint.X-layer.width, new Callback(() => layer.render()));
    }
    //right bottom
    if (points[0].X == pointX3Rotated.X && points[0].Y == pointX3Rotated.Y) {
      layer.setTop(rotatedPoint.Y-layer.height, new Callback(() => layer.render()));
      layer.setLeft(rotatedPoint.X-layer.width, new Callback(() => layer.render()));
    }
     //left bottom
    if (points[0].X == pointX4Rotated.X && points[0].Y == pointX4Rotated.Y) {
      layer.setTop(rotatedPoint.Y-layer.height, new Callback(() => layer.render()));
      layer.setLeft(rotatedPoint.X, new Callback(() => layer.render()));
    }


  }
  private comparePointsY(a: Point, b: Point): number {
    if (a.Y < b.Y)
      return -1;
    if (a.Y > b.Y)
      return 1;
    if (a.X < b.X)
      return -1;
    if (a.X > b.X)
      return 1;
    return 0;

  }

    private comparePointsX(a: Point, b: Point): number {
       if (a.X < b.X)
      return -1;
    if (a.X > b.X)
      return 1;
    if (a.Y < b.Y)
      return -1;
    if (a.Y > b.Y)
      return 1;
   
    return 0;

  }



  changeLeft(value: any, layer: Layer) {

    let val = parseInt(value)
    let pointX1 = new Point(layer.marginLeft, layer.marginTop);//left top
    let pointX2 = new Point(layer.marginLeft + layer.width, layer.marginTop);//right top
    let pointX3 = new Point(layer.marginLeft + layer.width, layer.marginTop + layer.height); //right bottom
    let pointX4 = new Point(layer.marginLeft, layer.marginTop + layer.height);//left bottom

    let center = new Point(layer.marginLeft + layer.width  / 2, layer.marginTop + layer.height  / 2)
    let pointX1Rotated = Calc.rotatePoint(pointX1, layer.rotateAngleDeg, center);//left top
    let pointX2Rotated = Calc.rotatePoint(pointX2, layer.rotateAngleDeg, center);//right top
    let pointX3Rotated = Calc.rotatePoint(pointX3, layer.rotateAngleDeg, center);//right bottom
    let pointX4Rotated = Calc.rotatePoint(pointX4, layer.rotateAngleDeg, center);//left bottom

    let points = [pointX1Rotated, pointX2Rotated, pointX3Rotated, pointX4Rotated];
    points.sort(this.comparePointsX);

    let point = new Point(val,points[0].Y);
    let newCenter=new Point(center.X+point.X - points[0].X, center.Y);
    let rotatedPoint = Calc.rotatePoint(point, -layer.rotateAngleDeg,newCenter);

    //left top point
    if (points[0].X == pointX1Rotated.X && points[0].Y == pointX1Rotated.Y) {
      layer.setTop(rotatedPoint.Y, new Callback(() => layer.render()));
      layer.setLeft(rotatedPoint.X, new Callback(() => layer.render()));
    }
    //right top
    if (points[0].X == pointX2Rotated.X && points[0].Y == pointX2Rotated.Y) {
      layer.setTop(rotatedPoint.Y, new Callback(() => layer.render()));
      layer.setLeft(rotatedPoint.X-layer.width, new Callback(() => layer.render()));
    }
    //right bottom
    if (points[0].X == pointX3Rotated.X && points[0].Y == pointX3Rotated.Y) {
      layer.setTop(rotatedPoint.Y-layer.height, new Callback(() => layer.render()));
      layer.setLeft(rotatedPoint.X-layer.width, new Callback(() => layer.render()));
    }
     //left bottom
    if (points[0].X == pointX4Rotated.X && points[0].Y == pointX4Rotated.Y) {
      layer.setTop(rotatedPoint.Y-layer.height, new Callback(() => layer.render()));
      layer.setLeft(rotatedPoint.X, new Callback(() => layer.render()));
    }

  }

  round(value: number) {
    return Math.round(value);
  }



}
