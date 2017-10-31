
export class AlertItem{
    public  type:'success'|'info'|'danger'|'warning';
    public msg:string;
    public timeout:number;
    /**
     *
     */
    constructor(type,msg,timeout=1000) {
        
        this.type=type;
        this.msg=msg;
        this.timeout=timeout;
    }  
    public onClosed:any; 

}