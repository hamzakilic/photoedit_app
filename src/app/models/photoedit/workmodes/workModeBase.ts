import { Polygon } from './../../../lib/draw/polygon';
import { LayerSelect } from './../layerSelect';
import { AppService } from './../../../services/app.service';
import { Point } from './../../../lib/draw/point';
import { IWorkspace } from './../iworkspace';
import { Layer } from '../layer';
import { HMath } from '../../../lib/hMath';

export abstract class WorkModeBase {
  protected workspace: IWorkspace;
  protected canvasElement: any;
  protected appService: AppService;
  constructor(workspace: IWorkspace, appService: AppService, disposeSelect: boolean = true, disposeWork: boolean = true) {
    this.appService = appService;
    this.workspace = workspace;
    if (this.workspace.selectionLayer && disposeSelect) {
      this.canvasElement = this.workspace.selectionLayer.htmlElement;
      this.workspace.removeSelectionLayer();

    }

    if (this.workspace.workLayer && disposeWork) {
      this.canvasElement = this.workspace.workLayer.htmlElement;
      this.workspace.removeWorkLayer();

    }
    this.workspace.layers.forEach((item) => item.canResizeOrRotate = false);

  }

  public mouseMove(event: MouseEvent, scroll: Point) {

    this.workspace.layers.forEach((item) => {
      if (item.isSelected)
        item.mouseMove(event, scroll);
    });

  }
  public abstract get typeOf(): number;
  public abstract get subTypeOf(): string;


  public mouseDown(event: MouseEvent, scroll: Point) {

    this.workspace.layers.forEach((item) => {
      if (item.isSelected && item.hitMouseEvent(event, scroll))
        item.mouseDown(event, scroll);
    });

    //önemli, event stoplanmalı
    event.stopPropagation();
  }
  public mouseUp(event: any, scroll: Point) {

    this.workspace.layers.forEach((item) => { if (item.isSelected) item.mouseUp(event, scroll); });
  }

  public doubleClick(event: MouseEvent, scroll: Point) {

    this.workspace.layers.forEach((item) => {
      if (item.isSelected && item.hitMouseEvent(event, scroll))
        item.doubleClick(event, scroll);
    });

    //önemli, event stoplanmalı
    event.stopPropagation();
  }

  protected findSelectedLayer(event: MouseEvent): Layer {

    let selectedLayer = this.workspace.layers.find((layer) => layer.isSelected);
    if (selectedLayer) return selectedLayer;
    if (this.workspace.layers.length > 0)
      return this.workspace.layers[this.workspace.layers.length - 1];
    return undefined;

  }
  protected findSelectionLayer(event: MouseEvent): LayerSelect {
    if (this.workspace.selectionLayer && this.workspace.selectionLayer instanceof LayerSelect) {
      return (<LayerSelect>this.workspace.selectionLayer)
    }
    return undefined;
  }
  private findSelectionLayerRegions(event: MouseEvent): Array<Polygon> {
    let selectionlayer = this.findSelectionLayer(event);
    if (selectionlayer) return selectionlayer.polygons;
    
    return [];
  }

  protected findInsectionOfSelectionRegions(event:MouseEvent,selectedLayer:Layer){
    let selectedRegions=this.findSelectionLayerRegions(event);
    
    
    if (selectedRegions.length == 0)//if there is no region, add a full layer
    {
      let selectedLayerRegion = HMath.rectToPolygon(selectedLayer.rect).translate(-selectedLayer.marginLeft, -selectedLayer.marginTop);
      return [selectedLayerRegion];
    } else {
      //selectedlayer ve selection region ile keşisen bölümü bul
      let selectedLayerRegion = HMath.rect2DToPolygon(selectedLayer.rectRotated2D);

      return selectedRegions.map((reg) => {

        let centerPoint = new Point(selectedLayer.rectRotated.x + selectedLayer.rectRotated.width / 2, selectedLayer.rectRotated.y + selectedLayer.rectRotated.height / 2);
        let centerPoint2 = new Point(selectedLayer.rectRotated.width / 2, selectedLayer.rectRotated.height / 2);
        let centerPoint3 = new Point(selectedLayer.width / 2,selectedLayer.height / 2);
        let intersected = selectedLayerRegion.intersect(reg);

        let newPolygon = intersected;
        if (selectedLayer.rotateAngleDeg != 0) {
          let temp = intersected.points.map(point => {
            return HMath.rotatePoint(point, -selectedLayer.rotateAngleDeg, centerPoint);
          });
          newPolygon = new Polygon(temp);
        }


        return newPolygon.translate(-(selectedLayer.marginLeft), -(selectedLayer.marginTop));

      }).filter((reg) => reg.points.length > 0);
    }
  }


}