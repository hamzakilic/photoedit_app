import { IBackgroundColor, IForegroundColor } from './iColor';
import { LayerGraphics } from './layerGraphics';
import { ProjectService } from './../../services/project.service';
import { SvgShape } from './../../lib/draw/svgShape';


import { Layer } from './layer';
import { Graphics } from '../../lib/graphics';

import { HImage } from '../../lib/image';
import { Rect } from '../../lib/draw/rect';
import arcToBezier from 'svg-arc-to-cubic-bezier'
import * as parseSvg from 'parse-svg-path';
import * as absSvg from 'abs-svg-path';
//import  * as normalizeSvg from 'normalize-svg-path';


export class LayerSvg extends LayerGraphics  {

  backgroundPattern:any;
  foregroundPattern:any;
  shape: SvgShape = undefined;
  parsedShape: any = undefined;
  constructor(name?: string, width?: number, height?: number, shape?: SvgShape, foregroundColor?: string,backgroundColor?:string) {
    super(name,width,height);

    
    this.canRotate = true;
    this.shape = shape;
    this._backgroundPattern = backgroundColor;
    this._foregroundPattern=foregroundColor;
    //this.parsedShape=svgParser.parseSVG(shape.path);

    if (shape && shape.path)
      this.parsedShape = this.normalize(absSvg(parseSvg(shape.path)));

  }
  public clone() {

    var instance = super.clone() as LayerSvg;    
    instance.shape=SvgShape.cloneFrom(this.shape);    
    return instance;
  }
  public createInstanceForClone(): LayerSvg {
    return new LayerSvg(this.name, this.width, this.height,SvgShape.cloneFrom(this.shape),this._foregroundPattern,this._backgroundPattern);
  }

  
  public render(): void {
    if (this.shape && this.parsedShape) {
      this.graphics.save();
      let rect = new Rect(0, 0, this.width, this.height);
      this.graphics.clearRect(rect);
      if(this._backgroundPattern)
      this.graphics.fillRect(rect,this._backgroundPattern);
      let scaleX = this.shape.viewportW / this.width;
      let scaleY = this.shape.viewportH / this.height;
      if(this._foregroundPattern)
      this.graphics.fillStyle(this._foregroundPattern);
      else this.graphics.fillStyle("#FFF");
      this.graphics.setScale(1 / scaleX, 1 / scaleY);

      this.parsedShape.forEach(p => {
        if (p[0] == 'M')
          this.graphics.moveTo(p[1], p[2]);
        else {

          this.graphics.bezierCurveTo(p[1], p[2], p[3], p[4], p[5], p[6]);
        }
      })

      this.graphics.fill();
      this.graphics.restore();
    }



  }
  public dispose() {


  }

   //burası ve aşağıdaki kod buradan https://github.com/jkroso/normalize-svg-path/blob/master/index.js
  //require dosyalarında bir problem oldu sanırım
  normalize(path) {
    // init state
    var prev
    var result = []
    var bezierX = 0
    var bezierY = 0
    var startX = 0
    var startY = 0
    var quadX = null
    var quadY = null
    var x = 0
    var y = 0

    for (var i = 0, len = path.length; i < len; i++) {
      var seg = path[i]
      var command = seg[0]

      switch (command) {
        case 'M':
          startX = seg[1]
          startY = seg[2]
          break
        case 'A':
          var curves = arcToBezier({
            px: x,
            py: y,
            cx: seg[6],
            cy: seg[7],
            rx: seg[1],
            ry: seg[2],
            xAxisRotation: seg[3],
            largeArcFlag: seg[4],
            sweepFlag: seg[5]
          })

          // null-curves
          if (!curves.length) continue

          for (var j = 0, c; j < curves.length; j++) {
            c = curves[j]
            seg = ['C', c.x1, c.y1, c.x2, c.y2, c.x, c.y]
            if (j < curves.length - 1) result.push(seg)
          }

          break
        case 'S':
          // default control point
          var cx = x
          var cy = y
          if (prev == 'C' || prev == 'S') {
            cx += cx - bezierX // reflect the previous command's control
            cy += cy - bezierY // point relative to the current point
          }
          seg = ['C', cx, cy, seg[1], seg[2], seg[3], seg[4]]
          break
        case 'T':
          if (prev == 'Q' || prev == 'T') {
            quadX = x * 2 - quadX // as with 'S' reflect previous control point
            quadY = y * 2 - quadY
          } else {
            quadX = x
            quadY = y
          }
          seg = this.quadratic(x, y, quadX, quadY, seg[1], seg[2])
          break
        case 'Q':
          quadX = seg[1]
          quadY = seg[2]
          seg = this.quadratic(x, y, seg[1], seg[2], seg[3], seg[4])
          break
        case 'L':
          seg = this.line(x, y, seg[1], seg[2])
          break
        case 'H':
          seg = this.line(x, y, seg[1], y)
          break
        case 'V':
          seg = this.line(x, y, x, seg[1])
          break
        case 'Z':
          seg = this.line(x, y, startX, startY)
          break
      }

      // update state
      prev = command
      x = seg[seg.length - 2]
      y = seg[seg.length - 1]
      if (seg.length > 4) {
        bezierX = seg[seg.length - 4]
        bezierY = seg[seg.length - 3]
      } else {
        bezierX = x
        bezierY = y
      }
      result.push(seg)
    }

    return result
  }

  line(x1, y1, x2, y2) {
    return ['C', x1, y1, x2, y2, x2, y2]
  }

  quadratic(x1, y1, cx, cy, x2, y2) {
    return [
      'C',
      x1 / 3 + (2 / 3) * cx,
      y1 / 3 + (2 / 3) * cy,
      x2 / 3 + (2 / 3) * cx,
      y2 / 3 + (2 / 3) * cy,
      x2,
      y2
    ]
  } 


}
