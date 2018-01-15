import { Callback } from './../../../lib/callback';
import { Point } from './../../../lib/draw/point';
import { IWorkspace,WorkModes } from './../iworkspace';
import { WorkModeBase } from "./workModeBase";
import { Layer } from '../layer';
import { History } from '../history/history';
import { AppService } from '../../../services/app.service';

export class WorkModeDefault extends WorkModeBase {
    
    
      constructor(workspace: IWorkspace,appService:AppService) {
        super(workspace,appService);
        this.workspace.cssClasses = "mouseDefault";
        this.workspace.removeSelectionLayer();
        this.workspace.layers.forEach((item)=>item.canResizeOrRotate=true);
      }
      public get typeOf(): number {
        return WorkModes.WorkModeDefault;
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
                    let temp= this.workspace.layers.find((item)=>item.uuid==layer.uuid);
                    if(temp){
                      temp.width=findedPreviousData.width;
                      temp.height=findedPreviousData.height;
                      temp.rotateAngleDeg=findedPreviousData.angle;
                      temp.marginTop=findedPreviousData.topMargin;
                      temp.marginLeft=findedPreviousData.leftMargin;
                      temp.isMouseDown=false;
                      temp.createAgain=true;
                    }
                 }));

                 let currentData={uuid:layer.uuid,leftMargin:layer.marginLeft,topMargin:layer.marginTop,width:layer.width,height:layer.height,angle:layer.rotateAngleDeg };

                this.workspace.historyManager.add(history,Callback.from(()=>{
                  let temp= this.workspace.layers.find((item)=>item.uuid==layer.uuid);
                  if(temp){
                    temp.width=currentData.width;
                    temp.height=currentData.height;
                    temp.rotateAngleDeg=currentData.angle;
                    temp.marginTop=currentData.topMargin;
                    temp.marginLeft=currentData.leftMargin;
                    temp.isMouseDown=false;
                    temp.createAgain=true;
                  }
                  

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