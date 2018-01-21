
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
import { LayerSvg } from '../layerSvg';
import { Rect } from '../../../lib/draw/rect';
import { WorkModeBase } from './workModeBase';
import { SvgShape } from '../../../lib/draw/svgShape';

export class WorkModeShape extends WorkModeBase {
    
  private _isMouseDown = false;
  private mouseDownPoint: Point;  
  private shape:SvgShape;
  constructor(workspace: IWorkspace, appService: AppService) {
    super(workspace, appService, false, true);

    this.workspace.cssClasses = "mouseCross";
    this.workspace.workLayer = new LayerEmpty("shape layer", this.workspace.width, this.workspace.height);
    this.workspace.workLayer.scale=this.workspace.scale;
   
  }
  public get typeOf(): number {
    return WorkModes.Shapes;
  }
  public get subTypeOf(): string {
    return "";
  }

  public setShape(shape:SvgShape){
    this.shape=shape;
  }

  public mouseMove(event: MouseEvent, scroll: Point) {
    if (this._isMouseDown) {     

    }


  }


  public mouseDown(event: MouseEvent, scroll: Point) {
    this._isMouseDown = true;
    this.mouseDownPoint = this.workspace.workLayer.normalizeMouseEvent(event, scroll, true);
    let layer=new LayerSvg(this.shape.name,100,100,this.shape,this.workspace.backgroundColor);
    this.workspace.layers.push(layer);
    this.workspace.makeLayerSelected(layer);
    

  }
  public mouseUp(event: MouseEvent, scroll: Point) {
    this._isMouseDown=false;
  }
}