import { Callback } from './../../../lib/callback';
import { Point } from './../../../lib/draw/point';
import { Workspace } from './../workSpace';
import { WorkModeBase } from "./workModeBase";
import { Layer } from '../layer';
import { History } from '../history/history';
import { AppService } from '../../../services/app.service';

export class WorkModeDefault extends WorkModeBase {
    
    
      constructor(workspace: Workspace,appService:AppService) {
        super(workspace,appService);
        this.workspace.cssClasses = "mouseDefault";
        this.workspace.removeSelectionLayer();
        this.workspace.layers.forEach((item)=>item.canResizeOrRotate=true);
      }
      public get typeOf(): number {
        return Workspace.WorkModeDefault;
      }
      public get subTypeOf(): string {
        return "";
      }

      //for createing history, store selectedlayers
      _undoredoDatas:Array<UndoRedoData>;
      //for creating history overrided
      public mouseDown(event: MouseEvent,scroll:Point) {
        super.mouseDown(event,scroll);
        //store previous values for history
        this._undoredoDatas=new Array<UndoRedoData>();
        this.workspace.layers.reduce((acc,layer)=>{
          if(layer.isSelected && layer.isMouseDown){
          
            acc.push({uuid:layer.uuid,leftMargin:layer.marginLeft,topMargin:layer.marginTop,width:layer.width,height:layer.height,angle:layer.rotateAngleDeg })
          }
          return acc;
        },this._undoredoDatas);
      }
      //for creating history, overrided 
      public mouseUp(event: any,scroll:Point) {

        this.createHistory();
        super.mouseUp(event,scroll);
        
      }
      private createHistory(){
        this.workspace.layers.forEach((layer)=>{
          if(layer.isSelected && layer.isMouseDown){
            let findedPreviousData= this._undoredoDatas.find((item)=>item.uuid==layer.uuid);
            if(findedPreviousData && !this.areEqual(findedPreviousData,layer)){
                 let history=History.create().setUndo(Callback.from(()=>{
                   layer.width=findedPreviousData.width;
                   layer.height=findedPreviousData.height;
                   layer.rotateAngleDeg=findedPreviousData.angle;
                   layer.marginTop=findedPreviousData.topMargin;
                   layer.marginLeft=findedPreviousData.leftMargin;
                   layer.isMouseDown=false;
                   layer.createAgain=true;
                 }));

                 let currentData={uuid:layer.uuid,leftMargin:layer.marginLeft,topMargin:layer.marginTop,width:layer.width,height:layer.height,angle:layer.rotateAngleDeg };

                this.workspace.historyManager.add(history,Callback.from(()=>{
                  layer.width=currentData.width;
                  layer.height=currentData.height;
                  layer.rotateAngleDeg=currentData.angle;
                  layer.marginTop=currentData.topMargin;
                  layer.marginLeft=currentData.leftMargin;
                  layer.isMouseDown=false;
                  layer.createAgain=true;

                }))

            }
            
          }
         
        });

      }

      private areEqual(data:UndoRedoData,layer:Layer):boolean{
        return data.uuid===layer.uuid && data.angle===layer.rotateAngleDeg
                && data.height===layer.height && data.width===layer.width 
                && data.leftMargin===layer.marginLeft && data.topMargin===layer.marginTop;
        
      }
    
    }

    interface UndoRedoData{
      uuid:string;
      leftMargin:number;
      topMargin:number;
      angle:number;
      width:number;
      height:number;
    }