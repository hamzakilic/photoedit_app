import { AlertItem } from './../../../entities/alertItem';
import { Callback } from './../../../lib/callback';
import { FormResizeComponent } from './../../../components/form-resize/form-resize.component';
import { History } from './../history/history';
import { RadialGradient, LineerGradient } from './../../../lib/draw/gradient';
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
      
     if(selectionRegions.length==0){
       this.appService.showAlert(new AlertItem('warning','Intersect with current selection'));
       return;
     }

     let clonedLayer=selectedLayer.clone();//for history operation

      selectionRegions.forEach((poly) => {
        let polyRect = poly.bounds;
        selectedLayer.graphics.save();
        selectedLayer.graphics.drawPolygon(poly);
        selectedLayer.graphics.clip();
        selectedLayer.graphics.lineWidth(5);
        selectedLayer.graphics.setBlendMode(this.workspace.gradient.blendMode);
        selectedLayer.graphics.setGlobalAlpha(this.workspace.gradient.opacity); 
        if(this.workspace.gradient instanceof LineerGradient){
          let gradient=selectedLayer.graphics.createLinearGradient(this.mouseDownPoint.x, this.mouseDownPoint.y, mouseUpPoint.x, mouseUpPoint.y);
          this.workspace.gradient.colorStops.sort((a,b)=> a.nmb-b.nmb).forEach(p=>gradient.addColorStop(p.nmb,p.str));
          selectedLayer.graphics.fillStyle(gradient);
        }   
        if(this.workspace.gradient instanceof RadialGradient){
          let x1=Math.min(this.mouseDownPoint.x,mouseUpPoint.x);
          let y1=Math.min(this.mouseDownPoint.y,mouseUpPoint.y);
          let x2=Math.max(this.mouseDownPoint.x,mouseUpPoint.x);
          let y2=Math.max(this.mouseDownPoint.y,mouseUpPoint.y);
          let w=x2-x1;
          let h=y2-y1;
          
          let gradient=selectedLayer.graphics.createRadialGradient(x1+w/2,y1+h/2,0,x1+w/2,y1+h/2,w<h?w/2:h/2);
          this.workspace.gradient.colorStops.sort((a,b)=> a.nmb-b.nmb).forEach(p=>gradient.addColorStop(p.nmb,p.str));
          selectedLayer.graphics.fillStyle(gradient);
        }   
        
          selectedLayer.graphics.drawPolygon(poly, true);
          selectedLayer.graphics.fill();
          selectedLayer.graphics.restore();
        

      })

      
      let history= History.create().setUndo(Callback.from(()=>{
        this.workspace.replaceHistoryLayer(clonedLayer.uuid,clonedLayer.clone());
      }));

      let clonedAfter= selectedLayer.clone();

      this.workspace.historyManager.add(history,Callback.from(()=>{
        this.workspace.replaceHistoryLayer(clonedAfter.uuid,clonedAfter.clone());
      }))




    }



  }




}

