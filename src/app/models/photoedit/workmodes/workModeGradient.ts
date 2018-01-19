import { RadialGradient } from './../gradient';
import { LayerGraphics } from './../layerGraphics';
import { LayerEmpty } from './../layerEmpty';
import { AppService } from './../../../services/app.service';
import { HMath } from './../../../lib/hMath';
import { Polygon } from './../../../lib/draw/polygon';

import { element } from 'protractor';
import { Helper } from './../lib/helper';
import { Point } from './../../../lib/draw/point';
import { Graphics } from './../../../lib/graphics';
import { IWorkspace, WorkModes } from './../iworkspace';
import { WorkModeBrush } from './workModeBrush';
import { WorkModeEdit, EditType } from './workModeEdit';
import { Color } from '../../../lib/draw/color';
import { Layer } from '../layer';
import { Rect } from '../../../lib/draw/rect';
import { WorkModeBase } from './workModeBase';
import { LineerGradient } from '../gradient';

export class WorkModeGradient extends WorkModeBase {
  private _isMouseDown = false;
  private mouseDownPoint: Point;
  private strokeStyle: any = undefined;
  constructor(workspace: IWorkspace, appService: AppService) {
    super(workspace, appService, false, true);

    this.workspace.cssClasses = "mouseCross";
    this.workspace.workLayer = new LayerGraphics("gradient layer", this.workspace.width, this.workspace.height);
    this.workspace.workLayer.scale = this.workspace.scale;

    Helper.createStrokeStyle(this.workspace.workLayer.graphics, (bitmap) => {
      let gradient = this.workspace.workLayer.graphics.createPattern(bitmap, "");
      this.strokeStyle = gradient;
    });
  }
  public get typeOf(): number {
    return WorkModes.WorkModeGradient;
  }
  public get subTypeOf(): string {
    return "";
  }

  public mouseMove(event: MouseEvent, scroll: Point) {
    if (this._isMouseDown) {
      this.workspace.workLayer.graphics.clearRect(new Rect(0, 0, this.workspace.workLayer.width, this.workspace.workLayer.height));
      let normalizedPoint = this.workspace.workLayer.normalizeMouseEvent(event, scroll, true);
      this.workspace.workLayer.graphics.drawRect(new Rect(this.mouseDownPoint.x - 2, this.mouseDownPoint.y - 2, 4, 4), this.strokeStyle);
      this.workspace.workLayer.graphics.drawLine(this.mouseDownPoint.x, this.mouseDownPoint.y, normalizedPoint.x, normalizedPoint.y, 1, this.strokeStyle);
      this.workspace.workLayer.graphics.drawRect(new Rect(normalizedPoint.x - 2, normalizedPoint.y - 2, 4, 4), this.strokeStyle);

    }


  }


  public mouseDown(event: MouseEvent, scroll: Point) {
    this._isMouseDown = true;
    this.mouseDownPoint = this.workspace.workLayer.normalizeMouseEvent(event, scroll, true);

  }
  public mouseUp(event: MouseEvent, scroll: Point) {
    if (this._isMouseDown) {
      this._isMouseDown = false;
      let selectedLayer = super.findSelectedLayer(event);
      let mouseUpPoint = selectedLayer.normalizeMouseEvent(event, scroll, true);
      let selectionLayer = super.findSelectionLayer(event);
      let selectionRegions = super.findInsectionOfSelectionRegions(event, selectedLayer);
      selectionRegions.forEach((poly) => {
        let polyRect = poly.bounds;
        selectedLayer.graphics.save();
        selectedLayer.graphics.drawPolygon(poly);
        selectedLayer.graphics.clip();
        selectedLayer.graphics.lineWidth(5);
        selectedLayer.graphics.setBlendMode(this.workspace.gradient.blendMode);
        selectedLayer.graphics.setGlobalAlpha(this.workspace.gradient.opacity);    
        let brush=this.workspace.gradient.createBrush(selectedLayer.graphics,[this.mouseDownPoint.x, this.mouseDownPoint.y, mouseUpPoint.x, mouseUpPoint.y]);
       
        
          

          selectedLayer.graphics.fillStyle(brush);
          selectedLayer.graphics.drawPolygon(poly, true);
          selectedLayer.graphics.fill();
          selectedLayer.graphics.restore();
        

      })



    }



  }




}

