export class Text{
    public data:string;
    public color:string;
    public isBold:boolean;
    public isItalic:boolean;
    public fontFamily:string;
    public fontSize:number;    
    public layout:TextLayout;

}

export enum TextLayout{
    Center,
    Justify,

}