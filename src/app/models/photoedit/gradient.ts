import { TupleStringNumber } from './../../entities/tuples';
import { Graphics } from './../../lib/graphics';
export abstract class Gradient{
    public colorStops:Array<TupleStringNumber>;
    public blendMode: string;
    public opacity:number;
    /**
     *
     */
    constructor() {
        this.colorStops=[];
        this.colorStops.push(new TupleStringNumber("rgb(255,255,255)",0));
        this.colorStops.push(new TupleStringNumber("rgb(0,0,0)",1));
        this.blendMode="normal";
        this.opacity=1;

    }
    abstract createBrush(graphics:Graphics,options?:any):CanvasGradient;
    addColorStop(color:string,value:number):void{
        this.colorStops.push(new TupleStringNumber(color,value));
    }

    protected graphicsColorStops(brush:CanvasGradient){
        this.colorStops.sort((a, b) => { return a.nmb - b.nmb }).forEach((p) => {
            brush.addColorStop(p.nmb, p.str);
          });
    }
    
}

export class LineerGradient extends Gradient{
   
    /**
     *
     */
    constructor() {
        super();
        
    }

    createBrush(graphics: Graphics, options?: any): CanvasGradient {
        let brush=graphics.createLinearGradient(options[0],options[1],options[2],options[3]);
        super.graphicsColorStops(brush);
        return brush;
    }
    
}

export class RadialGradient extends Gradient{
   public radius1:number=100;
   public  radius2:number=0;
   /**
    *
    */
   constructor() {
       super();
       
   }
    createBrush(graphics: Graphics, options?: any): CanvasGradient {
        let brush=graphics.createRadialGradient(options[0],options[1],this.radius1, options[2],options[3],this.radius2);
        super.graphicsColorStops(brush);
        return brush;
    }
    
}