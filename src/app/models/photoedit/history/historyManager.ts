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
        for(let i=this._state+1;i<this._histories.length;++i){
            this._histories[i].dispose();
            
        }
        this._histories.splice(this._state+1);
        this._state=this._histories.length-1;
        if(this._histories.length>=1)
        this._histories[this._histories.length-1].setRedo(redoCallback);
        this._histories.push(state);        
        this._state++;
    }
    public get canRedo(){
        return this._state>=0 &&this._state<this._histories.length-1;
    }
    public get canUndo(){
        return this._state>0 && this._state<=this._histories.length;
    }
    public undo(){
        if(this.canUndo){
            console.log("Undo before:"+this._state);
            this._histories[this._state].undo();
            this._state--;
            console.log("Undo after:"+this._state);
        }
    }
    public redo(){
        if(this.canRedo){

            console.log("Redo before:"+this._state);
            this._histories[this._state].redo();
            this._state++;
            console.log("Redo after:"+this._state);
        }
    }
}