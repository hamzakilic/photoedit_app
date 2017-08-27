export abstract class ImageColorMath{
    public abstract calc(val:number):number;
}

export class ImageColorMathBrightness extends ImageColorMath{
    private _brightness:number
    constructor(brightness:number) {
        super();
        this._brightness=brightness;
        
    }
    public calc(val:number):number{
        let temp=val+this._brightness;
        if(temp<0)return 0;
        if(temp>255) return 255;
        return temp;
    }
   
    
}

export class ImageColorMathContract extends ImageColorMath{
    private _contrast:number
    private _factor:number;
    constructor(constrat:number) {
        super();
        this._contrast=constrat;
        
        this._factor = (259 * (this._contrast + 255)) / (255 * (259 - this._contrast))
    }
    public calc(val:number):number{
        let temp=this._factor * (val   - 128) + 128
        if(temp<0)return 0;
        if(temp>255) return 255;
        return temp;
    }
   
    
}
