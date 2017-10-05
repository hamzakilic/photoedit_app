
declare var ClipperLib:any;
import { Point } from './point';

export class Polygon{
    private _points:Array<Point>;
    private cpr:any;
    constructor(points:Array<Point>=undefined) {
        if(points)
        this._points=points;
        else this._points=[];

        this.cpr = new ClipperLib.Clipper();
        var path =[];
        this._points.forEach((item)=>path.push({"X":item.X,"Y":item.Y}));
        this.cpr.AddPath(path, ClipperLib.PolyType.ptSubject, true);
        
    }

    public get Points():Array<Point>{
        return this._points;
    }


    


    
}