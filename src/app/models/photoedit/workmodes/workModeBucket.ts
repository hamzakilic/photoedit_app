
import { HMath } from './../../../lib/hMath';
import { ImageAlgorithmRgbToLab } from './../../../lib/imagealgorithm/imageAlgorithmRgbToLab';
import { ImageAlgorithmCrop } from './../../../lib/imagealgorithm/imageAlgorithmCrop';
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
import { ImageProcessSimilarColors } from '../../../lib/imageprocess/imageProcessSimilarColors';
import { HImage } from '../../../lib/image';
import { AppService } from '../../../services/app.service';

export class WorkModeBucket extends WorkModeEdit {

  constructor(workspace: Workspace,appService:AppService) {
    super(workspace,appService);
    
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
  private static _threshold:number=2;
  
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

  public get threshold(): number {
    return EditTypeBucket._threshold;
  }
  public set threshold(val: number) {
    EditTypeBucket._threshold = val;
  }

  
//tek bir defa render çalışacak, mousedown olduğunda sadece
  render(layer:Layer, point: Point, brushFG: any,brushBG:any) {
    
   // layer.graphics.save();
    //layer.graphics.setGlobalAlpha(layer.globalAlpha);
    //layer.graphics.setBlendMode(this.blendMode);
    if(this.selectType=="selection"){
      this.selectedRegions.forEach(region=>{
        
        layer.graphics.drawPolygon(region,false);
        layer.graphics.clip();
      //zaten graphics clip çalıştırığı için hepsini boyayabiliriz
      layer.graphics.fillStyle(this.fillType=="fg"?brushFG:brushBG);
      layer.graphics.fillRect(new Rect(0,0,layer.width,layer.height));
      
      });
      this.isSuccess=true;

    }
    if(this.selectType=="color"){
      
//debugger;
       let fullImage= layer.getImage();
       let color= layer.getPixel(point.x,point.y);
       this.selectedRegions.forEach(region=>{
            
            if(region.isPointInPath(point)){
              
              layer.graphics.drawPolygon(region,false);
              layer.graphics.clip();
               let selectedColor=new Color(255,255,255,255);
               if(this.fillType==="fg")
               selectedColor=Color.fromString(brushFG);
               else
               selectedColor=Color.fromString(brushBG);

               //console.log("is in path");
               let rect = region.bounds;
               let crop=new ImageAlgorithmCrop(rect);
               let cropedImage= crop.process(fullImage);               
               let translated = HMath.translatePoint(point,-rect.x,-rect.y);
               //console.log("translated point:"+point,translated);
               let colorRegions= ImageProcessSimilarColors.process(layer, cropedImage,color,translated,EditTypeBucket._threshold);
               colorRegions.forEach((item)=>{
                 let bound=item.bounds;
                 bound.width+=1;
                 bound.height+=1;
                
                    let h=bound.height;
                    let w=bound.width;
                    if(h==0)h+=1;
                    if(w==0)w+=1;
                 let imageData=new Uint8ClampedArray(w*h*4);
                 imageData.fill(0);
                 this.fillType=="fg"?brushFG:brushBG
                let img=new HImage(w,h,imageData,4);
                //console.log(item.points.length+" Adet pointfill");
                  item.points.forEach((p)=>{
                    let start=(p.y-bound.y)*img.width*4+(p.x-bound.x)*4;
                    img.Pixels[start]=selectedColor.r;
                    img.Pixels[start+1]=selectedColor.g;
                    img.Pixels[start+2]=selectedColor.b;
                    img.Pixels[start+3]=selectedColor.a;
                  });
                 // debugger;
                  layer.graphics.drawImageRect(img,new Rect(0,0,img.width,img.height),new Rect(bound.x+rect.x,bound.y+rect.y,img.width,img.height));
                

                 
               });
               this.isSuccess=true;
                  
              }
         
       });
    }
   // layer.graphics.restore();
    

  }


  
  mouseUp(event: MouseEvent, scroll: Point) {
    
  }
  mouseDown(event: MouseEvent, scroll: Point) {
    
    this.isSuccess=false;
  }
}
