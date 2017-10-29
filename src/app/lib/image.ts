
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
    private _bytePerPixel:number;
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
    public constructor(width: number, height: number, pixels: Uint8ClampedArray=undefined,bytePerPixel:number=4,) {
        super();


        //check width or height
        this._height = height;
        this._width = width;
        this._bytePerPixel=bytePerPixel;
        if (pixels){
            //check if pixels count is equal to buffer count

              this._pixels = pixels;

        }
        else{
            this._pixels =new Uint8ClampedArray(width * height * bytePerPixel);
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

    public get bytePerPixel():number{
        return this._bytePerPixel;
    }

    public processMutable(algorithm:IImageAlgorithmMutable):HImage{
        return algorithm.process(this);
    }

     public processImmutable(algorithm:IImageAlgorithmImmutable):HImage{
        return algorithm.process(this);
    }

   
    






}

/**
 * executes an image algorithm on image
 */
export interface IImageAlgorithm{
    process(img: HImage): HImage;
}

/**
 * executes a mutable image algorithm on image
 */
export interface IImageAlgorithmMutable extends IImageAlgorithm{
    
}

/**
 * executes a immutable image algorithm on image
 */
export interface IImageAlgorithmImmutable extends IImageAlgorithm{
   
}







