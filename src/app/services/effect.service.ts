import { Injectable } from '@angular/core';

import { Http, Response, Headers, RequestOptions } from '@angular/http';
import { Observable } from 'rxjs/Rx';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';
import { EffectArray } from '../entities/effect';

@Injectable()
export class EffectService {

    private _http: Http
    private _loaded=false;
    private _effects:EffectArray;
    private _running=false;
    constructor(http: Http) {
        this._http = http;
        this.loadEffects();
    }

    private loadEffects() {
        if(!this._loaded && !this._running){
            this._running=true;
        this._http.get("assets/json/effects.json").map((response) => { return response.json() }).subscribe(data => {
            
            this._loaded=true;
            this._effects=data;
            this._running=false;
           /*  console.log("loaded effects json"); */

        });
    }
    }
    public get effects():EffectArray{
        this.loadEffects();
        if(this._effects)
        return this._effects;
       
        //if not loaded
        let fake= new EffectArray();
        fake.items=[];
        return fake;
    }



  


}