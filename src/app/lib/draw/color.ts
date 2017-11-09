
/**
 * represents a RGBA color
 */
export class Color{
    public static readonly White:Color=new Color(255,255,255,255);
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
    public static fromStringRGBA(rgba:string):Color{
        
        let splitted= rgba.replace("rgba(","").replace("rgb(","").replace(")","").split(",");
        if(splitted.length>=3){
        let r=Number.parseInt(splitted[0]);
        let g=Number.parseInt(splitted[1]);
        let b=Number.parseInt(splitted[2]);
        let a=255;
        if(splitted.length==4)
          a=Math.round(Number.parseFloat(splitted[3])*255);
        return new Color(r,g,b,a);
        }
        return undefined;
    }
    public static fromString(val:string):Color{
        if(!val)
        return Color.White;
        if(val.startsWith("rg"))
        return this.fromStringRGBA(val);
        var shorthandRegex = /^#?([a-f\d])([a-f\d])([a-f\d])$/i;
        val = val.replace(shorthandRegex, function(m, r, g, b) {
            return r + r + g + g + b + b;
        });
        var result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(val);
        return result? new Color(
            parseInt(result[1], 16),
            parseInt(result[2], 16),
            parseInt(result[3], 16)
         ) : Color.White;

    }
    
    toRgba():string{
        return "rgba("+this.r+","+this.g+","+this.b+","+this.a/255+")";
    }
    toRgb():string{
        return "rgba("+this.r+","+this.g+","+this.b+",1)";
    }
    toHex():string{
        return "#" + this.componentToHex(this.r) + this.componentToHex(this.g) + this.componentToHex(this.b);
    }

    componentToHex(c) {
        var hex = c.toString(16);
        return hex.length == 1 ? "0" + hex : hex;
    }
    
    }