import { AppService } from './../../../services/app.service';
import { Point } from './../../../lib/draw/point';
import { LayerSelect } from './../layerSelect';
import { IWorkspace,WorkModes } from './../iworkspace';
import { WorkModeBase } from "./workModeBase";
import { Layer } from '../layer';


export class WorkModeSelection extends WorkModeBase {
    _shapeType: string;
    constructor(workspace: IWorkspace,appService:AppService,  shapeType: string) {
      super(workspace,appService, false,true);
      this.workspace.cssClasses = "mouseCross";
      this._shapeType = shapeType;
      this.checkSelectionLayer();
      (<LayerSelect>this.workspace.selectionLayer).shapeType = this._shapeType;
  
    }
    private checkSelectionLayer(){
      
      //check selection layer and also its type
      if(!this.workspace.selectionLayer || !(this.workspace.selectionLayer instanceof LayerSelect)){
        let selectionLayer = this.createLayer(this.workspace.width, this.workspace.height, 0, 0);      
        selectionLayer.scale=this.workspace.scale;
        this.workspace.selectionLayer = selectionLayer;
      }
    }
    public get typeOf(): number {
      return WorkModes.Selection;
    }
    public get subTypeOf(): string {
      return this._shapeType;
    }
    public changeType(type: string) {
      this.checkSelectionLayer();
      (this.workspace.selectionLayer as LayerSelect).shapeType = type;
      this._shapeType = type;
      
      
    }
  
    public mouseMove(event: MouseEvent,scroll:Point) {
      if (this.workspace.selectionLayer)
        this.workspace.selectionLayer.mouseMove(event,scroll);
  
    }
  
    public mouseDown(event: MouseEvent,scroll:Point) {
      if(this.workspace.selectionLayer)
      this.workspace.selectionLayer.mouseDown(event,scroll);
  
    }
    public mouseUp(event: MouseEvent,scroll:Point) {
      if (this.workspace.selectionLayer)
        this.workspace.selectionLayer.mouseUp(event,scroll);
    }

    public doubleClick(event: MouseEvent,scroll:Point) {
      if (this.workspace.selectionLayer)
        this.workspace.selectionLayer.doubleClick(event,scroll);
    }
    private findSeledtedWorkspaceLayer():Layer{
      
      let selectedLayer= this.workspace.layers.find((value)=>value.isSelected);
      if(selectedLayer)return selectedLayer;
      if(this.workspace.layers.length>0)
      return this.workspace.layers[0]
      return undefined;
    }
    protected createLayer(width: number, height: number, left: number, top: number) {
      return new LayerSelect(width, height, left, top,this.findSeledtedWorkspaceLayer());
    }
  
  }
  