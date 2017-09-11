import { LayerSelectLasso } from './layerSelectLasso';
import { Point } from './../../lib/draw/point';
import { Layer } from './layer';
import { LayerSelectRectangle } from './layerSelectRectangle';
import { Graphics } from '../../lib/graphics';
import { Callback } from '../../lib/callback';
import { HImage } from '../../lib/image';
import { Rect } from '../../lib/draw/rect';


import { RotationHelper, RotationMove } from './lib/rotationHelper';


export class LayerSelectPolygonal extends LayerSelectRectangle {


  private _isStarted: boolean = false;
  private _points: Array<Point>;
  constructor(width: number, height: number, left: number, top: number) {
    super(width, height, left, top);
    this._points = [];
    this.showSelected = false;
  }



  public mouseDown(event: MouseEvent) {

    this.isMouseDown = true;
    if (!this._isStarted)
      this._points = [];

    let point = this.calculatePoint(event);  
    
    this._points.push(point);
    if(!this._isStarted)//if not started path
    this._points.push(point);//push the same point again
    this._isStarted = true;
    this.render();
  }

  public mouseMove(event: MouseEvent) {
    if(this._isStarted){
      let temp=this.calculatePoint(event);
      if(temp)
      this._points[this._points.length-1]=temp;
      this.render();
    }
    event.preventDefault();
  }





  public mouseUp(event: MouseEvent) {

    this.render();
    this.isMouseDown = false;
    
  }

  public doubleClick(event:any){
    this._isStarted=false;
  }

  public render(): void {
    this.graphics.save();
    let rect = new Rect(0, 0, this.width, this.height);
    this.graphics.clearRect(rect);
    if (this._points.length > 1) {
      this.graphics.beginPath();
      this.graphics.strokeStyle("#FFF");
      this.graphics.fillStyle(this.fillStyle);
      this.graphics.lineWidth(2);
      this.graphics.beginPath();
      this.graphics.moveTo(this._points[0].X, this._points[0].Y);
      let i = 1;
      for (i = 1; i < this._points.length; ++i) {
        this.graphics.drawLine2(this._points[i].X,this._points[i].Y);
        
      }      
      this.graphics.closePath();
      this.graphics.stroke();
      this.graphics.fill();
    }



    this.graphics.restore();
  }

  
  public dispose() {
    super.dispose();
    this._points=[];
    this.render();
  }








}
