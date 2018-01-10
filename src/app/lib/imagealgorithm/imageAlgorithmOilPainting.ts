import { IImageAlgorithmMutable } from '../image';
import { IImageAlgorithmImmutable } from '../image';
import { HImage } from '../image';
import { Color } from '../draw/color';



export class ImageAlgorithmOilPainting implements IImageAlgorithmImmutable {
    private _levels:number;
    private _filterSize:number;
     constructor(levels:number,filterSize:number) {
        this._filterSize=filterSize;
        this._levels=levels;

     }
    process(img: HImage): HImage {
          let tempImage=new HImage(img.width,img.height,new Uint8ClampedArray(img.Pixels),img.bytePerPixel);
          let intensityBin = new Array(this._levels);
          let blueBin = new Array(this._levels);
          let greenBin = new Array(this._levels);
          let redBin = new Array(this._levels);
          let levels=this._levels-1;
          let filterOffset=((this._filterSize-1)/2).extToInt32();
          let byteOffset=0;
          let calcOffset=0;
          let currentIntensity=0;
          let maxIntensity=0;
          let maxIndex=0;

          let blue=0;
          let green=0;
          let red=0;

          for(let offsetY=filterOffset;offsetY<img.height-filterOffset;++offsetY)
          for(let offsetX=filterOffset;offsetX<img.width-filterOffset;++offsetX){
              blue=green=red=0;
              currentIntensity=maxIntensity=maxIndex=0;
              intensityBin.fill(0,0,this._levels);
              
              blueBin.fill(0,0,this._levels);
              greenBin.fill(0,0,this._levels);
              redBin.fill(0,0,this._levels);

              byteOffset=offsetY*img.width*img.bytePerPixel+offsetX*img.bytePerPixel;
              
              for(let filterY=-filterOffset;filterY<=filterOffset;++filterY)
              for(let filterX=-filterOffset;filterX<=filterOffset;++filterX){

                calcOffset=(offsetY+filterY)*img.width*img.bytePerPixel+(offsetX+filterX)*img.bytePerPixel;
                currentIntensity=((img.Pixels[calcOffset]+img.Pixels[calcOffset+1]+img.Pixels[calcOffset+2])/3*levels/255).extRound().extToInt32();

                intensityBin[currentIntensity] += 1;
                redBin[currentIntensity] += img.Pixels[calcOffset+0];
                greenBin[currentIntensity] += img.Pixels[calcOffset+1];
                blueBin[currentIntensity] += img.Pixels[calcOffset+2];

                if(intensityBin[currentIntensity]>maxIntensity){
                    maxIntensity=intensityBin[currentIntensity];
                    maxIndex=currentIntensity;
                }

              }

              red=(redBin[maxIndex]/maxIntensity).extToInt32();
              green=(greenBin[maxIndex]/maxIntensity).extToInt32();
              blue=(blueBin[maxIndex]/maxIntensity).extToInt32();

              tempImage.Pixels[byteOffset]=red;
              tempImage.Pixels[byteOffset+1]=green;
              tempImage.Pixels[byteOffset+2]=blue;
              


          }


         return tempImage;
    }

}