
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
    public static from(rgba:string):Color{
        
        let splitted= rgba.replace("rgba(","").replace("rgb(","").replace(")","").split(",");
        if(splitted.length>=3){
        let r=Number.parseInt(splitted[0]);
        let g=Number.parseInt(splitted[1]);
        let b=Number.parseInt(splitted[2]);
        let a=255;
        if(splitted.length==4)
          a=Number.parseInt(splitted[3])*255;
        return new Color(r,g,b,a);
        }
    }
    toRgba():string{
        return "rgba("+this.r+","+this.g+","+this.b+","+this.a/255+")";
    }
    toRgb():string{
        return "rgba("+this.r+","+this.g+","+this.b+",1)";
    }
}