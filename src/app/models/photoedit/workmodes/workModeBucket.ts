import { Polygon } from './../../../lib/draw/polygon';
import { BUSY_CONFIG_DEFAULTS } from 'angular2-busy';
import { element } from 'protractor';
import { Helper } from './../lib/helper';
import { Point } from './../../../lib/draw/point';
import { Graphics } from './../../../lib/graphics';
import { Workspace } from './../workSpace';
import { WorkModeBrush } from './workModeBrush';
import { WorkModeEdit, EditType } from './workModeEdit';
import { Color } from '../../../lib/draw/color';
import { Layer } from '../layer';
import { Rect } from '../../../lib/draw/rect';

export class WorkModeBucket extends WorkModeEdit {

  constructor(workspace: Workspace) {
    super(workspace);
    
  }

  protected createEditType(): EditType {
    return new EditTypeBucket();
  }
  public get typeOf(): number {
    return Workspace.WorkModeBucket;
  }
  public get subTypeOf(): string {
    return "";
  }


  public mouseMove(event: MouseEvent, scroll: Point) {
    
    
  }


}


export class EditTypeBucket extends EditType {



  private static _blendMode: string="normal";
  private static _fillType: string="fg";
  private static _selectType:string="selection";
  constructor() {
    super();
  
  }
  
  public get blendMode(): string {
    return EditTypeBucket._blendMode;
  }
  public set blendMode(val: string) {
    EditTypeBucket._blendMode = val;
  }
  public get fillType(): string {
    return EditTypeBucket._fillType;
  }
  public set fillType(val: string) {
    EditTypeBucket._fillType = val;
  }
  public get selectType(): string {
    return EditTypeBucket._selectType;
  }
  public set selectType(val: string) {
    EditTypeBucket._selectType = val;
  }

  

  render(layer:Layer, point: Point, brushFG: any,brushBG:any) {
    
    layer.graphics.setBlendMode(this.blendMode);
    if(this.selectType=="selection"){
      layer.graphics.fillStyle(this.fillType=="fg"?brushFG:brushBG);
      layer.graphics.fillRect(new Rect(0,0,layer.width,layer.height));
    }
    if(this.selectType=="color"){
      
    }

  }
  mouseUp(event: MouseEvent, scroll: Point) {
    
  }
  mouseDown(event: MouseEvent, scroll: Point) {
    //boş olmalı
  }
}
