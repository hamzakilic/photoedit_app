
import { Rect2D } from './rect2D';
import { Rect } from './rect';



declare var ClipperLib:any;
import { Point } from './point';

export class Polygon{
    private _points:Array<Point>;
    
    constructor(points:Array<Point>=undefined) {
        if(points)
        this._points=points;
        else this._points=[];

        
        
    }

    public get points():Array<Point>{
        return this._points;
    }
    public getPaths():Array<any>{
        
        var path =[];
        this._points.forEach((item)=>path.push({"X":item.x,"Y":item.y}));
        return path;
    }

    public union(polygon:Polygon):Polygon{
        
        var out = new ClipperLib.Paths();
        var source = new ClipperLib.Clipper();
        source.AddPath(this.getPaths(), ClipperLib.PolyType.ptSubject, true);
        source.AddPath(polygon.getPaths(),ClipperLib.PolyType.ptClip,true);
        source.Execute(ClipperLib.ClipType.ctUnion,out);

        let points=[];
        if(out.length>0)
        out[0].forEach((item)=>points.push(new Point(item.X,item.Y)));
        return new Polygon(points);
    }

    public intersect(polygon:Polygon):Polygon{
        
        var out = new ClipperLib.Paths();
        var source = new ClipperLib.Clipper();
        source.AddPath(this.getPaths(), ClipperLib.PolyType.ptSubject, true);
        source.AddPath(polygon.getPaths(),ClipperLib.PolyType.ptClip,true);
        source.Execute(ClipperLib.ClipType.ctIntersection,out);

        let points=[];
        if(out.length>0)
        out[0].forEach((item)=>points.push(new Point(item.X,item.Y)));
        return new Polygon(points);
    }
    public exclude(polygon:Polygon):Polygon{
        
        var out = new ClipperLib.Paths();
        var source = new ClipperLib.Clipper();
        source.AddPath(this.getPaths(), ClipperLib.PolyType.ptSubject, true);
        source.AddPath(polygon.getPaths(),ClipperLib.PolyType.ptClip,true);
        source.Execute(ClipperLib.ClipType.ctDifference,out);

        let points=[];
        if(out.length>0)
        out[0].forEach((item)=>points.push(new Point(item.X,item.Y)));
        return new Polygon(points);
    }

    public xor(polygon:Polygon):Polygon{
        
        var out = new ClipperLib.Paths();
        var source = new ClipperLib.Clipper();
        source.AddPath(this.getPaths(), ClipperLib.PolyType.ptSubject, true);
        source.AddPath(polygon.getPaths(),ClipperLib.PolyType.ptClip,true);
        source.Execute(ClipperLib.ClipType.ctXor,out);

        let points=[];
        if(out.length>0)
        out[0].forEach((item)=>points.push(new Point(item.X,item.Y)));
        return new Polygon(points);
    }

    public get bounds():Rect{
        let paths=this.getPaths();
       
       var bound= ClipperLib.Clipper.GetBounds([paths]);
       return new Rect(bound.left,bound.top,bound.right-bound.left,bound.bottom-bound.top);
    }

    public isPointInPath(point:Point):boolean{
        var out = new ClipperLib.Paths();
        var source = new ClipperLib.Clipper();
        source.AddPath(this.getPaths(), ClipperLib.PolyType.ptSubject, true);
        let poly=new Polygon([point,new Point(point.x,point.y+1),new Point(point.x+1,point.y+1),new Point(point.x+1,point.y)]);
        let paths=poly.getPaths();
        source.AddPath(poly.getPaths(),ClipperLib.PolyType.ptClip,true);
        source.Execute(ClipperLib.ClipType.ctIntersection,out);
        
        if(out.length>0)
        return true;
        return false;
    }




    


    
}