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
    
    addColorStop(color:string,value:number):void{
        this.colorStops.push(new TupleStringNumber(color,value));
    }

    
    
}

export class LineerGradient extends Gradient{
   
    /**
     *
     */
    constructor() {
        super();
        
    }

  
    
}

export class RadialGradient extends Gradient{
   
   /**
    *
    */
   constructor() {
       super();
       
   }
    
    
}