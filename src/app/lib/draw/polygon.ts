import { HMath } from './../hMath';

import { BUSY_CONFIG_DEFAULTS } from 'angular2-busy';



import { Rect2D } from './rect2D';
import { Rect } from './rect';



declare var ClipperLib:any;
declare var hull:any;
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
        
        let path =[];
        this._points.forEach((item)=>path.push({"X":item.x,"Y":item.y}));
        return path;
    }

    public union(polygon:Polygon):Polygon{
        
        let out = new ClipperLib.Paths();
        let source = new ClipperLib.Clipper();
        source.AddPath(this.getPaths(), ClipperLib.PolyType.ptSubject, true);
        source.AddPath(polygon.getPaths(),ClipperLib.PolyType.ptClip,true);
        source.Execute(ClipperLib.ClipType.ctUnion,out);

        let points=[];
        if(out.length>0)
        out[0].forEach((item)=>points.push(new Point(item.X,item.Y)));
        return new Polygon(points);
    }

    public intersect(polygon:Polygon):Polygon{
        
        let out = new ClipperLib.Paths();
        let source = new ClipperLib.Clipper();
        source.AddPath(this.getPaths(), ClipperLib.PolyType.ptSubject, true);
        source.AddPath(polygon.getPaths(),ClipperLib.PolyType.ptClip,true);
        source.Execute(ClipperLib.ClipType.ctIntersection,out);

        let points=[];
        if(out.length>0)
        out[0].forEach((item)=>points.push(new Point(item.X,item.Y)));
        return new Polygon(points);
    }
    public exclude(polygon:Polygon):Polygon{
        
        let out = new ClipperLib.Paths();
        let source = new ClipperLib.Clipper();
        source.AddPath(this.getPaths(), ClipperLib.PolyType.ptSubject, true);
        source.AddPath(polygon.getPaths(),ClipperLib.PolyType.ptClip,true);
        source.Execute(ClipperLib.ClipType.ctDifference,out);

        let points=[];
        if(out.length>0)
        out[0].forEach((item)=>points.push(new Point(item.X,item.Y)));
        return new Polygon(points);
    }

    public xor(polygon:Polygon):Polygon{
        
        let out = new ClipperLib.Paths();
        let source = new ClipperLib.Clipper();
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
       
       let bound= ClipperLib.Clipper.GetBounds([paths]);
       return new Rect(bound.left,bound.top,bound.right-bound.left,bound.bottom-bound.top);
    }

    public isPointInPath(point:Point):boolean{
        let out = new ClipperLib.Paths();
        let source = new ClipperLib.Clipper();
        source.AddPath(this.getPaths(), ClipperLib.PolyType.ptSubject, true);
        let poly=new Polygon([point,new Point(point.x,point.y+1),new Point(point.x+1,point.y+1),new Point(point.x+1,point.y)]);
        let paths=poly.getPaths();
        source.AddPath(poly.getPaths(),ClipperLib.PolyType.ptClip,true);
        source.Execute(ClipperLib.ClipType.ctIntersection,out);
        
        if(out.length>0)
        return true;
        return false;
    }

    public simplify():Polygon{
        let paths= this.getPaths();
        let pol= ClipperLib.Clipper.SimplifyPolygons(paths, ClipperLib.PolyFillType.pftNonZero);
        let points=[];
        
        pol.forEach((p)=>{ points.push(new Point(p[0].X,p[0].Y))});
        return new Polygon(points);
    }
    public clean(value=10):Polygon{
        let paths= this.getPaths();
        let pol= ClipperLib.JS.Clean(paths, value);
        let points=[];
        
        pol.forEach((p)=>{ points.push(new Point(p.X,p.Y))});
        return new Polygon(points);
    }

    public lighten(value=3):Polygon{
        let paths= this.getPaths();
        let pol= ClipperLib.JS.Lighten(paths, value);
        let points=[];
        
        pol.forEach((p)=>{ points.push(new Point(p.X,p.Y))});
        return new Polygon(points);
    }
    public translate(x:number,y:number):Polygon{
        let paths=this.getPaths();
        let points=[];
        paths.forEach((pol)=>points.push(new Point(pol.X+x,pol.Y+y)));
        return new Polygon(points);

        
    }
    
   

    public hull():Polygon{
        
        let  points=[];
        this._points.forEach((item)=>{
            points.push([item.x,item.y]);
        });
        let temp= hull(points,10);
        let newPoints=[];
        temp.forEach(element => {
            newPoints.push(new Point(element[0],element[1]));
        });
        return new Polygon(newPoints);

    }

    public static fromRect(rect:Rect):Polygon{
        return HMath.rectToPolygon(rect);

    }
    public static fromRect2D(rect:Rect2D):Polygon{
       return HMath.rect2DToPolygon(rect);

    }




    


    
}