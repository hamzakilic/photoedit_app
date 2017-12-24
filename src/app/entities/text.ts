export class Text{
    public data:string;
    public color:string;
    public isBold:boolean;
    public isItalic:boolean;
    public fontFamily:string;
    public fontSize:number;    
   
    public alignH:"left"|"center"|"right";
    public alignV:"top"|"middle"|"bottom";
    public isStroked:boolean;
    public strokedColor:string;

    public clone():Text{
        let text=new Text();
        text.data=this.data;
        text.color=this.color;
        text.isBold=this.isBold;
        text.isItalic=this.isItalic;
        text.fontFamily=this.fontFamily;
        text.fontSize=this.fontSize;
        text.alignH=this.alignH;
        text.alignV=this.alignV;
        text.isStroked=this.isStroked;
        text.strokedColor=this.strokedColor;
        return text;
    }

}

