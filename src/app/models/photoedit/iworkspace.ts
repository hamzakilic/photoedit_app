import { Callback } from './../../lib/callback';
import { HistoryManager } from './history/historyManager';
import { Layer } from "./layer";
import { Gradient } from '../../lib/draw/gradient';


export interface IWorkspace{

    selectionLayer:Layer;
    workLayer:Layer;
    layers: Layer[];
    readonly scale:number;
    cssClasses:string;
    readonly width:number;
    readonly height:number;
   foregroundColor: string;
   backgroundColor: string;
   readonly historyManager: HistoryManager;
   readonly htmlElement: any;
   readonly gradient:Gradient;

    removeSelectionLayer();
    removeWorkLayer();
    replaceLayer(source: Layer, destination: Layer, marginLeft?: number, marginTop?: number);
    replaceHistoryLayer(sourceuuid: string, destination: Layer);
    makeLayerSelected(layer: Layer);
    replaceSelectionLayer(selectionLayer: Layer);
    scrollBy(x: number, y: number);
    resize(width: number, height: number, afterResized: Callback);
    selectWorking(working: number, parameter: string)
    //setWorkingMode(working: WorkModeBase)

    
    
}

export class WorkModes{
    public static readonly Default = 1;
    public static readonly Selection = 3;
    public static readonly ResizeWorkspace = 4;
    public static readonly AddTextLayer = 5;
    public static readonly Crop = 7;
    public static readonly ColorPicker = 12;
    public static readonly Brush = 13;
    public static readonly Erase = 14;
    public static readonly Hand = 15;
    public static readonly Bucket = 16;
    public static readonly MagicWand = 17;
    public static readonly Gradient = 19;
    public static readonly Shapes = 21;
}