
export class AlertItem{
    public  type:'success'|'info'|'danger'|'warning';
    public msg:string;
    public timeout:number;
    /**
     * 
     * @param type sucess info danger warning
     * @param msg  text message
     * @param timeout in miliseconds
     */
    constructor(type,msg,timeout=1000) {
        
        this.type=type;
        this.msg=msg;
        this.timeout=timeout;
    }  
    public onClosed:any; 

}