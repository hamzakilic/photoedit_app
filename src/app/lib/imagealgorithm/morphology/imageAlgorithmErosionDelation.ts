


import { IImageAlgorithmImmutable, HImage } from './../../image';
import { } from '../../extensions';

export enum MorphologyType {
    Erosion,
    Dilation,
    
}
export enum MorphologyProcessType{
    Erosion,
    Dilation,
    Open,
    Closed
}


export class ImageAlgorithmErosionDelation implements IImageAlgorithmImmutable {
    

    public processType:MorphologyProcessType;
    public applyBlue: boolean;
    public applyRed: boolean;
    public applyGreen: boolean;
    public matrixSize: number = 0;

    constructor( type: MorphologyProcessType, matrixSize: number, applyRed: boolean = true, applyGree: boolean = true, applyBlue: boolean = true) {
        
        this.processType = type;
        this.applyBlue = applyBlue;
        this.applyGreen = applyGree;
        this.applyRed = applyRed;
        this.matrixSize = matrixSize;


    }
    

    process(img: HImage): HImage {
        let preparedImage = this.prepareImage(img);
        if(this.processType==MorphologyProcessType.Erosion)
        return this.processErosionDilation(preparedImage,MorphologyType.Erosion,this.matrixSize,this.applyBlue,this.applyRed,this.applyGreen);
        if(this.processType==MorphologyProcessType.Dilation)
        return this.processErosionDilation(preparedImage,MorphologyType.Dilation,this.matrixSize,this.applyBlue,this.applyRed,this.applyGreen);
        if(this.processType==MorphologyProcessType.Open){
          let temp= this.processErosionDilation(preparedImage,MorphologyType.Erosion,this.matrixSize,this.applyBlue,this.applyRed,this.applyGreen);
          return this.processErosionDilation(temp,MorphologyType.Dilation,this.matrixSize,this.applyBlue,this.applyRed,this.applyGreen);
        }
        if(this.processType==MorphologyProcessType.Closed){
            let temp= this.processErosionDilation(preparedImage,MorphologyType.Dilation,this.matrixSize,this.applyBlue,this.applyRed,this.applyGreen);
            return this.processErosionDilation(temp,MorphologyType.Erosion,this.matrixSize,this.applyBlue,this.applyRed,this.applyGreen);
          }
        return new HImage(preparedImage.width,preparedImage.height,new Uint8ClampedArray(preparedImage.Pixels),preparedImage.bytePerPixel);


        
    }

    private processErosionDilation(preparedImage:HImage,morphologyType:MorphologyType,matrixSize:number,applyBlue:boolean,applyRed:boolean,applyGreen:boolean):HImage{

        let pixels = new Uint8ClampedArray(preparedImage.Pixels);
        let imgTemp = new HImage(preparedImage.width, preparedImage.height, pixels, preparedImage.bytePerPixel);

        let filterOffset = ((matrixSize - 1) / 2).extToInt32();
        let calcOffset = 0;

        let byteOffset = 0;
        let morphResetValue = 0;

        if (morphologyType == MorphologyType.Erosion)
            morphResetValue = 255;

        for (let offsetY = filterOffset; offsetY < preparedImage.height - filterOffset; ++offsetY)
            for (let offsetX = filterOffset; offsetX < preparedImage.width - filterOffset; ++offsetX) {
                let blue = morphResetValue, green = morphResetValue, red = morphResetValue;

                byteOffset = offsetY * preparedImage.width * preparedImage.bytePerPixel + offsetX * preparedImage.bytePerPixel;

                if (morphologyType == MorphologyType.Dilation) {

                    for (let filterY = -filterOffset; filterY <= filterOffset; ++filterY)
                        for (let filterX = -filterOffset; filterX <= filterOffset; ++filterX) {
                            calcOffset=(offsetY+filterY) * preparedImage.width * preparedImage.bytePerPixel + (offsetX+filterX) * preparedImage.bytePerPixel;
                            if (preparedImage.Pixels[calcOffset + 0] > red)
                                red = preparedImage.Pixels[calcOffset + 0];
                            if (preparedImage.Pixels[calcOffset + 1] > green)
                                green = preparedImage.Pixels[calcOffset + 1];
                            if (preparedImage.Pixels[calcOffset + 2] > blue)
                                blue = preparedImage.Pixels[calcOffset + 2];

                        }
                }
                if (morphologyType == MorphologyType.Erosion) {

                    for (let filterY = -filterOffset; filterY <= filterOffset; ++filterY)
                        for (let filterX = -filterOffset; filterX <= filterOffset; ++filterX) {
                            calcOffset=(offsetY+filterY) * preparedImage.width * preparedImage.bytePerPixel + (offsetX+filterX) * preparedImage.bytePerPixel;
                            if (preparedImage.Pixels[calcOffset + 0] < red)
                                red = preparedImage.Pixels[calcOffset + 0];
                            if (preparedImage.Pixels[calcOffset + 1] < green)
                                green = preparedImage.Pixels[calcOffset + 1];
                            if (preparedImage.Pixels[calcOffset + 2] < blue)
                                blue = preparedImage.Pixels[calcOffset + 2];

                        }

                }
                if(!applyRed)
                red=preparedImage.Pixels[byteOffset];
                if(!applyGreen)
                green=preparedImage.Pixels[byteOffset+1];

                if(!applyBlue)
                blue=preparedImage.Pixels[byteOffset+2];

                imgTemp.Pixels[byteOffset]=red;
                imgTemp.Pixels[byteOffset+1]=green;
                imgTemp.Pixels[byteOffset+2]=blue;
            }




        return imgTemp;

    }

    protected prepareImage(img: HImage): HImage {

        return img;
    }


}






