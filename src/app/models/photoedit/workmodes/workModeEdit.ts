import { LayerImage } from './../layerImage';
import { HImage } from './../../../lib/image';
import { Graphics } from './../../../lib/graphics';
import { LayerSelect } from './../layerSelect';
import { Polygon } from './../../../lib/draw/polygon';
import { Point } from './../../../lib/draw/point';
import { LayerEmpty } from './../layerEmpty';
import { Workspace } from './../workSpace';
import { WorkModeBase } from "./workModeBase";
import { Layer } from '../layer';

export abstract class EditType{
    public abstract render(layer:Layer, point: Point, brush: any);
    public abstract mouseUp(event: MouseEvent,scroll:Point);
    

}

export abstract class WorkModeEdit extends WorkModeBase {
    
      protected _isMouseDown = false;
      protected _editType: EditType;
      constructor(workspace: Workspace) {
        //dont dispose previous workmode          
        super(workspace, false, true);
        this.workspace.workLayer = new LayerEmpty("brush layer", this.workspace.width, this.workspace.height);
        this.workspace.workLayer.scale=this.workspace.scale;
        this.workspace.cssClasses = "default";
        this._editType = this.createEditType();
    
      }
      protected abstract createEditType():EditType;
      public get editType(): EditType {
        return this._editType;
      }
      public abstract get typeOf(): number ;

      public abstract get subTypeOf(): string;
      protected lastMovePoint1: Point;
    
      public mouseMove(event: MouseEvent,scroll:Point) {
       this.process(event,scroll);
      }

      protected process(event: MouseEvent,scroll:Point){
        if (this._isMouseDown) {
          if (this.selectedLayer && this.selectedRegions.length > 0) {
            this.selectedLayer.graphics.save();
            this.selectedRegions.forEach((region) => {
              this.selectedLayer.graphics.drawPolygon(region, false);
              this.selectedLayer.graphics.clip();
              if (this.selectedLayer.hitMouseEvent(event,scroll)) {
                let normalizedEvent = this.selectedLayer.normalizeMouseEvent(event,scroll);
                if (normalizedEvent) {
                  if (this.hitRegionsMouseEvent(normalizedEvent, this.selectedRegions)) {
    
                    this._editType.render(this.selectedLayer, normalizedEvent, this.workspace.foregroundColor);
    
                  }
                }
    
              }
            });
    
            this.selectedLayer.graphics.restore();
          }
        }
      }
      protected hitRegionsMouseEvent(point: Point, polygons: Array<Polygon>): boolean {
        return true;
      }
    
      selectedLayer: Layer;
      selectedRegions: Array<Polygon>;
      
      public mouseDown(event: MouseEvent,scroll:Point) {

        this._isMouseDown = true;
        //find selectedlayer
        this.selectedLayer = this.findSelectedLayer(event);
    
        if (this.selectedLayer) {
          //find selectedRegions
          this.selectedRegions = this.findSelectedRegions(event);
          if (this.selectedRegions.length == 0)//if there is no region, add a full layer
          {
            let points = [];
            points.push(new Point(0, 0));
            points.push(new Point(0, this.selectedLayer.height));
            points.push(new Point(this.selectedLayer.width, this.selectedLayer.height));
            points.push(new Point(this.selectedLayer.width, 0));
            this.selectedRegions.push(new Polygon(points));
          }
    
        }
        
        this.process(event,scroll);
        
    
      }
      public mouseUp(event: any,scroll:Point) {
        this._isMouseDown = false;
        
        this._editType.mouseUp(event,scroll);
    
      }
    
      
    
      private findSelectedLayer(event: MouseEvent): Layer {
        let selectedLayer = this.workspace.layers.find((layer) => layer.isSelected);
        if (selectedLayer) return selectedLayer;
        if (this.workspace.layers.length > 0)
          return this.workspace.layers[this.workspace.layers.length - 1];
        return undefined;
    
      }
      protected findSelectedRegions(event: MouseEvent): Array<Polygon> {
        if (this.workspace.selectionLayer && this.workspace.selectionLayer instanceof LayerSelect) {
          return (<LayerSelect>this.workspace.selectionLayer).polygons;
        }
        return [];
      }
    
      protected findPointInLayers(event: MouseEvent,scroll:Point) {
        for (let i = this.workspace.layers.length - 1; i > -1; --i) {
          let ly = this.workspace.layers[i];
          let hitPoint = ly.hitMouseEvent(event,scroll);
          if (hitPoint) {
            let color = ly.getPixel(hitPoint.X, hitPoint.Y);
            if (color.a != 0) {
              this.workspace.foregroundColor = "rgb(" + color.r + "," + color.g + "," + color.b + ")";
              return;
            }
          }
        }
      }
    
    
    }
    