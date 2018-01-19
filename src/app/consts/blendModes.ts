
export interface BlendMode{
    id:number;
    name:string;
}

export class BlendModes{
    static  readonly _list=["normal","multiply","screen","overlay","darken","lighten","color-dodge","color-burn","hard-light",
    "soft-light","difference","exclusion","hue","saturation","color","luminosity"];
    public static orderedList():Array<BlendMode>{
        return BlendModes._list.slice(0).map((val,index,)=>{
            return {id:index+1,name:val}
        }).sort((a,b)=>a.name.localeCompare(b.name));
    }
    public static list():Array<BlendMode>{
        return BlendModes._list.slice(0).map((val,index)=>{
            return {id:index,name:val};
        });
    }
}