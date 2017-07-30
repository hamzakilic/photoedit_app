/**
 * represents a RGBA color
 */
export class Color{
    r: number;
    g: number;
    b: number;
    a: number;
    /**
     *initalize a new color with given values
     */
    constructor(r?:number,g?:number,b?:number,a?:number) {
        this.r=r;
        this.g=g;
        this.b=b;
        this.a=a;        
    }
}