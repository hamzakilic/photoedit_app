import { Callback } from './../../../lib/callback';

export class History{
    private _undocallback:Callback;
    private _redocallback:Callback;
    private _disposecallback:Callback;
    private constructor() {                    
    }
    public static create():History{
        return new History();
    }
    public dispose(){
        if(this._disposecallback){
            this._disposecallback.call(undefined);
        }
    }    

    public setUndo(callback:Callback):History{
        this._undocallback=callback;
        return this;

    }
    public setRedo(callback:Callback):History{
        this._redocallback=callback;
        return this;
    }
    public setDispose(callback:Callback):History{
        this._disposecallback=callback;
        return this;
    }
    public undo(){
        if(this._undocallback){
            this._undocallback.call(undefined);            
        }
    }
    public redo(){
        if(this._redocallback){
            this._redocallback.call(undefined);
        }
    }



    

    
}