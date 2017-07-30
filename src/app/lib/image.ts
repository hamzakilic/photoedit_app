
import { Callback } from './callback';
import { HEventEmitter } from './eventEmitter';


/**
 * an image with a RGBA  pixel layout,
 * top to bottom, left to right
 */
export class HImage extends HEventEmitter {

    private _width: number;
    private _height: number;
    private _pixels: Uint8ClampedArray;
    public Pixels: Uint8ClampedArray;
    public PixelsView: DataView;

    /**
     *
     * @param width width of image in pixels
     * @param height height of image in pixels
     * @param pixels data of pixels as RGBA
     *
     * remarks pixel array does not copy buffer, only copies reference
     */
    public constructor(width: number, height: number, pixels?: Uint8ClampedArray) {
        super();


        //check width or height
        this._height = height;
        this._width = width;
        if (pixels){
            //check if pixels count is equal to buffer count

              this._pixels = pixels;

        }
        else{
            this._pixels =new Uint8ClampedArray(width * height * 4);
            this._pixels.fill(255);

        }
        this.Pixels = this._pixels;
        this.PixelsView= new DataView(this._pixels.buffer,0);
    }


    /**
     * @returns width of image in pixels
     */
    public get width(): number {
        return this._width;
    }
    /**
     * @returns height of image in pixels
     */
    public get height(): number {
        return this._height;
    }

    public processMutable(algorithm:IImageAlgorithmMutable):HImage{
        return algorithm.process(this);
    }

     public processImmutable(algorithm:IImageAlgorithmImmutable):HImage{
        return algorithm.process(this);
    }
    






}

export interface IImageAlgorithmMutable{
    process(img: HImage): HImage;
}
export interface IImageAlgorithmImmutable{
    process(img: HImage): HImage;
}







