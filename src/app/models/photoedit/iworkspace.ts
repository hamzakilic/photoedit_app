import { Callback } from './../../lib/callback';
import { HistoryManager } from './history/historyManager';
import { Layer } from "./layer";


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
    public static readonly WorkModeDefault = 1;
    public static readonly WorkModeSelection = 3;
    public static readonly WorkModeResizeWorkspace = 4;
    public static readonly WorkModeAddTextLayer = 5;
    public static readonly WorkModeCrop = 7;
    public static readonly WorkModeColorPicker = 12;
    public static readonly WorkModeBrush = 13;
    public static readonly WorkModeErase = 14;
    public static readonly WorkModeHand = 15;
    public static readonly WorkModeBucket = 16;
    public static readonly WorkModeMagicWand = 17;
}