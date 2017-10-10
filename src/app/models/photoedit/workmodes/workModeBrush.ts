import { LayerEmpty } from './../layerEmpty';
import { Helper } from './../lib/helper';
import { Graphics } from './../../../lib/graphics';
import { Point } from './../../../lib/draw/point';
import { Polygon } from './../../../lib/draw/polygon';
import { LayerSelect } from './../layerSelect';
import { Workspace } from './../workSpace';
import { WorkModeBase } from "./workModeBase";
import { Layer } from '../layer';

export class WorkModeBrush extends WorkModeBase {
    
    private _isMouseDown = false;
    private _brush:Brush;
    constructor(workspace: Workspace) {
      //dont dispose previous workmode          
      super(workspace, false,true);
      this.workspace.workLayer = new LayerEmpty("brush layer",this.workspace.width,this.workspace.height);
      this.workspace.cssClasses = "default";
      this._brush=new Brush();
  
    }
    public get typeOf(): number {
      return Workspace.WorkModeBrush;
    }
    public get subTypeOf(): string {
      return "";
    }
    private lastMovePoint1:Point;
    
    public mouseMove(event: MouseEvent) {
      if (this._isMouseDown)
        {
          if(this.selectedLayer && this.selectedRegions.length>0){
              this.selectedLayer.graphics.save();
              this.selectedRegions.forEach((region)=>{
                 this.selectedLayer.graphics.drawPolygon(region,false);
                 this.selectedLayer.graphics.clip();
                 if(this.selectedLayer.hitMouseEvent(event)){
                   let normalizedEvent= this.selectedLayer.normalizeMouseEvent(event);
                   if(normalizedEvent)
                    {
                      if(this.hitRegionsMouseEvent(normalizedEvent,this.selectedRegions)){                       
                        
                           this._brush.render(this.selectedLayer.graphics,normalizedEvent,this.workspace.foregroundColor);
                        
                      }
                    }
                   
                 }
              });
             
              this.selectedLayer.graphics.restore();
          }
        }
    }
    private hitRegionsMouseEvent(point:Point,polygons:Array<Polygon>):boolean{
      return true;
    }

    selectedLayer:Layer;
    selectedRegions:Array<Polygon>;
    public mouseDown(event: MouseEvent, layer: Layer) {
      this._isMouseDown = true;
      //find selectedlayer
          this.selectedLayer = this.findSelectedLayer(event);

          if(this.selectedLayer){
            //find selectedRegions
            this.selectedRegions = this.findSelectedRegions(event);
            if(this.selectedRegions.length==0)//if there is no region, add a full layer
            {
              let points=[];
              points.push(new Point(0,0));
              points.push(new Point(0,this.selectedLayer.height));
              points.push(new Point(this.selectedLayer.width,this.selectedLayer.height));
              points.push(new Point(this.selectedLayer.width,0));
              this.selectedRegions.push(new Polygon(points));
            }
            
          }
      
  
    }
    public mouseUp(event: any) {
      this._isMouseDown = false;
      this._brush.mouseUp(event);
  
    }

    private 

    private findSelectedLayer(event:MouseEvent):Layer{
      let selectedLayer= this.workspace.layers.find((layer)=>layer.isSelected);
      if(selectedLayer)return selectedLayer;
      if(this.workspace.layers.length>0)
      return this.workspace.layers[this.workspace.layers.length-1];
      return undefined;

    }
    private findSelectedRegions(event:MouseEvent):Array<Polygon>{
      if(this.workspace.selectionLayer && this.workspace.selectionLayer instanceof LayerSelect){
        return (<LayerSelect>this.workspace.selectionLayer).polygons;
      }
      return [];
    }
  
    private findPointInLayers(event: MouseEvent) {
      for (let i = this.workspace.layers.length - 1; i > -1; --i) {
        let ly = this.workspace.layers[i];
        let hitPoint = ly.hitMouseEvent(event);
        if (hitPoint) {
          let color = ly.getColor(hitPoint.X, hitPoint.Y);
          if (color.a != 0) {
            this.workspace.foregroundColor = "rgb(" + color.r + "," + color.g + "," + color.b + ")";
            return;
          }
        }
      }
    }
  
  
  }


  class Brush{
    private lastMovePoint:Point;

    constructor() {      
      this.lastMovePoint=undefined;
    }
    render(graphics:Graphics,point:Point,brush:any){
      let points=[];
      if(this.lastMovePoint){
        points= Helper.calculateBetweenPoints([this.lastMovePoint,point]);        
      }else{
        points.push(point);
      }
      this.lastMovePoint=point;
      graphics.fillStyle(brush);
      points.forEach(element => {
        graphics.beginPath();
        graphics.ellipse(element.X,element.Y,5,5,0,0,2*Math.PI);
        graphics.closePath();  
        graphics.fill();
      });
            
      
      
    }
    mouseUp(event:MouseEvent){
      this.lastMovePoint=undefined;
    }
  }


