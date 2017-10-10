import { LayerSelect } from './../layerSelect';
import { Workspace } from './../workSpace';
import { WorkModeBase } from "./workModeBase";
import { Layer } from '../layer';


export class WorkModeSelection extends WorkModeBase {
    _shapeType: string;
    constructor(workspace: Workspace, shapeType: string) {
      super(workspace,false,true);
      this.workspace.cssClasses = "mouseCross";
      this._shapeType = shapeType;
      if(!this.workspace.selectionLayer){
      let selectionLayer = this.createLayer(this.workspace.width, this.workspace.height, 0, 0);      
      this.workspace.selectionLayer = selectionLayer;
      }
      (<LayerSelect>this.workspace.selectionLayer).shapeType = this._shapeType;
  
    }
    public get typeOf(): number {
      return Workspace.WorkModeSelection;
    }
    public get subTypeOf(): string {
      return this._shapeType;
    }
    public changeType(type: string) {
      (this.workspace.selectionLayer as LayerSelect).shapeType = type;
      this._shapeType = type;
      
    }
  
    public mouseMove(event: MouseEvent) {
      if (this.workspace.selectionLayer)
        this.workspace.selectionLayer.mouseMove(event);
  
    }
  
    public mouseDown(event: MouseEvent, layer: Layer) {
      console.log("x");
      this.workspace.selectionLayer.mouseDown(event);
  
    }
    public mouseUp(event: any) {
      if (this.workspace.selectionLayer)
        this.workspace.selectionLayer.mouseUp(event);
    }
  
    protected createLayer(width: number, height: number, left: number, top: number) {
      return new LayerSelect(width, height, left, top);
    }
  
  }
  