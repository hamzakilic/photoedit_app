import { Callback } from './../../../lib/callback';
import { History } from './history';
import { retry } from 'rxjs/operator/retry';

export class HistoryManager{
    private _histories:Array<History>
    private _canRedo:boolean;
    private _state=-1;
    constructor() {
        this._histories=new Array<History>();        
        this._state=-1;
    }
    public add(state:History,redoCallback?:Callback){
        
        //console.log("adding history "+this._state);
        let spliced=this._histories.splice(this._state+1);
        spliced.forEach((item)=>item.dispose());        
        
        if(this._histories.length>=1)
        this._histories[this._histories.length-1].setRedo(redoCallback);
        this._histories.push(state);        
        this._state=this._histories.length-1;
        //console.log("added history "+this._histories.length);
    }
    public get canRedo(){
        return this._state>=0 &&this._state<this._histories.length-1;
    }
    public get canUndo(){
        return this._state>0 && this._state<this._histories.length;
    }
    public undo(){
        if(this.canUndo){
            //console.log("Undo before:"+this._state);
            this._histories[this._state].undo();
            this._state--;
            if(this._state<0)
            this._state=0;
            //console.log("Undo after:"+this._state);
        }
    }
    public redo(){
        if(this.canRedo){

           // console.log("Redo before:"+this._state);
            this._histories[this._state].redo();
            this._state++;
            if(this._state>=this._histories.length)
            this._state=this._histories.length-1;
           // console.log("Redo after:"+this._state);
        }
    }
}