import { HMath } from './../../../lib/hMath';
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
    public abstract render(layer:Layer, point: Point, brushFG: any,brushBG:any);
    public abstract mouseUp(event: MouseEvent,scroll:Point,layer:Layer);
    public abstract mouseDown(event: MouseEvent,scroll:Point,layer:Layer);
    public selectedRegions: Array<Polygon>=undefined;
    

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
    
                    this._editType.render(this.selectedLayer, normalizedEvent, this.workspace.foregroundColor,this.workspace.backgroundColor);
    
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
            let selectedLayerRegion=Polygon.fromRect(this.selectedLayer.rect).translate(-this.selectedLayer.marginLeft,-this.selectedLayer.marginTop);
            this.selectedRegions=[selectedLayerRegion];
          }else{
            //selectedlayer ve selection region ile keşisen bölümü bul
            let selectedLayerRegion=Polygon.fromRect2D(this.selectedLayer.rectRotated2D);
        
            this.selectedRegions= this.selectedRegions.map((reg)=>{
              
              let centerPoint=new Point(this.selectedLayer.rectRotated.x+this.selectedLayer.rectRotated.width/2,this.selectedLayer.rectRotated.y+this.selectedLayer.rectRotated.height/2);
              let centerPoint2=new Point(this.selectedLayer.rectRotated.width/2,this.selectedLayer.rectRotated.height/2);
              let centerPoint3=new Point(this.selectedLayer.width/2,this.selectedLayer.height/2);
              let intersected= selectedLayerRegion.intersect(reg);
             
              let newPolygon=intersected;
              if(this.selectedLayer.rotateAngleDeg!=0){
                let temp=intersected.points.map(point=>{
                return HMath.rotatePoint(point,-this.selectedLayer.rotateAngleDeg, centerPoint);
              });
              newPolygon=new Polygon(temp);
            }
              
             
              return newPolygon.translate(-(this.selectedLayer.marginLeft),-(this.selectedLayer.marginTop));
             
            }).filter((reg)=>reg.points.length>0);
          }
    
        
          //set selected regions to edittype
         
        this._editType.selectedRegions=this.selectedRegions;
        this._editType.mouseDown(event,scroll,this.selectedLayer);
        
        this.process(event,scroll);
        }
        
    
      }
      public mouseUp(event: any,scroll:Point) {
        this._isMouseDown = false;
        if(this.selectedLayer)        
        this._editType.mouseUp(event,scroll,this.selectedLayer);
    
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
    
      /* protected findPointInLayers(event: MouseEvent,scroll:Point) {
        for (let i = this.workspace.layers.length - 1; i > -1; --i) {
          let ly = this.workspace.layers[i];
          let hitPoint = ly.hitMouseEvent(event,scroll);
          if (hitPoint) {
            let color = ly.getPixel(hitPoint.x, hitPoint.y);
            if (color.a != 0) {
              this.workspace.foregroundColor = "rgb(" + color.r + "," + color.g + "," + color.b + ")";
              return;
            }
          }
        }
      } */
    
    
    }
    