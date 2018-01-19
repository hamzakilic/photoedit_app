
export class TupleStringNumber{
    /**
     *
     */
    constructor(private _str:string,private _nmb:number) {
                
    }

    get str():string{
        return this._str;
    }
    get nmb():number{
        return this._nmb;
    }

    set nmb(val:number){
        this._nmb=val;
    }

    set str(val:string){
        this._str=val;
    }
}