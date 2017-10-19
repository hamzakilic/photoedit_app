import { Polygon } from './draw/polygon';
import { Color } from './draw/color';
import { HImage } from './image';
import { Rect } from '../lib/draw/rect'
import { CanvasTextWrapper } from 'canvas-text-wrapper';
     



export class Graphics {
  private _context: CanvasRenderingContext2D;
  public readonly width: number;
  public readonly height: number;
  public scale: number;
  private _canvas:HTMLCanvasElement;
  /**
   * creates a graphics context from canvas element
   */
  constructor(element: any, width: number, height: number, scale: number) {

    this._context = element.nativeElement.getContext("2d");
    this.width = width;
    this.height = height;
    this.scale = scale;
    this._canvas = element.nativeElement;
   

  }
  public dispose() {

  }
  public setGlobalAlpha(value: number){
    this._context.globalAlpha=value;
  }
  public putImage(img: HImage,rect:Rect=undefined) {
    if(rect){
      let imageData = this._context.getImageData(rect.x,rect.y,rect.width,rect.height);
      var data = imageData.data;
      data.set(img.Pixels);
      this._context.putImageData(imageData, rect.x, rect.y);  

    }else{
    let imageData = this._context.getImageData(0, 0, this.width, this.height);
    var data = imageData.data;
    data.set(img.Pixels);
    this._context.putImageData(imageData, 0, 0);
    }
  }

   

  /**
   * allways creates a deep copy HImage
   * @returns HImage
   */
  public getImage(rect:Rect=undefined):HImage{
    if(rect){
      let imageData = this._context.getImageData(rect.x, rect.y, rect.width, rect.height);    
      let arr = new Uint8ClampedArray(imageData.data);
      let img = new HImage(rect.width,rect.height,arr);
      return img;

    } else{ 
    let imageData = this._context.getImageData(0, 0, this.width, this.height);    
    let arr = new Uint8ClampedArray(imageData.data);
    let img = new HImage(this.width,this.height,arr);
    return img;
    }


  }

  
  public getPixel(x:number,y:number):Color{
    let arr= this._context.getImageData(x,y,1,1).data;
    return new Color(arr[0],arr[1],arr[2],arr[3]);

  }
  public setPixel(x,y,color:Color){
    let arr= this._context.createImageData(1,1);
    arr.data[0]=color.r;
    arr.data[1]=color.g;
    arr.data[2]=color.b;
    arr.data[3]=color.a;
    this._context.putImageData(arr,x,y);
  }

  
public drawImageRect(img: HImage, sourceRect: Rect,destRect:Rect) {
   
    let imageData =new ImageData(img.Pixels,img.width,img.height);
    
    createImageBitmap(imageData).then((bitmap)=>{
      
       this._context.drawImage(bitmap, sourceRect.x,sourceRect.y,sourceRect.width,sourceRect.height,destRect.x,destRect.y,destRect.width,destRect.height);
       
    }).catch((ex)=>{
      //TODO: exception durumu handle edilmeli
    });
  }

  public drawHtmlImageFit(img: HTMLImageElement, x: number, y: number) {

    this._context.drawImage(img, x, y, img.naturalWidth, img.naturalHeight, 0, 0, this.width, this.height);

  }

 
  public drawHtmlImageRect(img: HTMLImageElement, sourceRect: Rect,destRect:Rect) {
   
    this._context.drawImage(img, sourceRect.x,sourceRect.y,sourceRect.width,sourceRect.height,destRect.x,destRect.y,destRect.width,destRect.height);

  }
 


 public fillRectRGBA(rect: Rect, r: number,g: number,b: number,a: number): void {
    this._context.fillStyle ="rgba("+r+","+g+","+b+","+(a/255)+")";
    this._context.fillRect(rect.x, rect.y, rect.width, rect.height);
  }

  public fillRect(rect: Rect, brush?: string|any): void {    
    if(brush)
    this._context.fillStyle = brush;
    this._context.fillRect(rect.x, rect.y, rect.width, rect.height);
    

  }

  public drawRect(rect: Rect, brush: string): void {
    this._context.strokeStyle = brush;
    this._context.strokeRect(rect.x, rect.y, rect.width, rect.height);
  }
  public rect(rect: Rect): void {
    
    this._context.rect(rect.x, rect.y, rect.width, rect.height);
  }

  public clearRect(rect: Rect){
    this._context.clearRect(rect.x,rect.y,rect.width,rect.height);
  }

  public drawLine(x1: number, y1: number, x2: number, y2: number, lineWidth: number = 1, brush?: string) {
    if (brush)
      this._context.fillStyle = brush;
    if(brush)
      this._context.strokeStyle=brush;
    this._context.lineWidth = lineWidth;
    this._context.beginPath();
    this._context.moveTo(x1, y1);
    this._context.lineTo(x2, y2);
    
    
    this._context.stroke();
  }

  public drawPolygon(polygon:Polygon,closePath:boolean=true){
    this._context.beginPath();
    this._context.moveTo(polygon.points[0].X,polygon.points[0].Y);
    for(let i=1;i<polygon.points.length;++i){
      this._context.lineTo(polygon.points[i].X,polygon.points[i].Y);
    }
    if(closePath)
    this._context.closePath();
  }

  public drawLine2(x1: number, y1: number) {
    
    this._context.lineTo(x1, y1);
    
  }

  public drawString(text: string,color:string,isStroked:boolean,strokedColor:string,fontFamily: string, fontSize: number,isBold: boolean,isItalic:boolean,alignH: "left" | "center" | "right",alignV:"top" | "middle" | "bottom"){
    let style="";
    if(isBold)
      style+="Bold ";
    if(isItalic)
      style+="Italic ";


    this._context.fillStyle=color;
    if(isStroked)
      this._context.strokeStyle=strokedColor;
    
   // this.context.font=style+fontSize+"px "+fontFamily;
   // this.context.textBaseline="top";
   // this.context.textAlign="left";
    
      

    let options={ 
        font: style+fontSize+"px "+fontFamily,
        lineHeight: 1,
        textAlign: alignH,
        verticalAlign: alignV,
        paddingX: 0,
        paddingY: 0,
        fitParent: false,
      
        strokeText: isStroked,
        sizeToFill: false,
        maxFontSizeToFill: 0,
        allowNewLine: true,
        justifyLines: true,
        renderHDPI: true,
        
    };
     CanvasTextWrapper(this._canvas, text, options);
    
  }

  public fillStyle(brush:string|CanvasGradient){
    this._context.fillStyle=brush;
  }

  public strokeStyle(brush:string|CanvasGradient){
    this._context.strokeStyle=brush;
  }
  public beginPath(){
    this._context.beginPath();
  }
  public drawArc(centerX:number,centerY:number,radius:number,startAngle:number,endAngle:number){
    this._context.arc(centerX,centerY,radius,startAngle,endAngle);
  }
  public closePath(){
    this._context.closePath();
  }
  public lineWidth(width:number){
    this._context.lineWidth=width;
  }

  public fill(){
    this._context.fill();
  }
  public stroke(){
    this._context.stroke();
  }
  


    
  
  public save(){
    this._context.save();
  }
  public restore(){
    this._context.restore();
  }
  public translate(w: number,h: number){
    this._context.translate(w,h);
  }
  public rotate(angleDeg: number) {
      this._context.rotate(angleDeg*Math.PI/180);
  }
  public setScale(x:number,y:number){
    this._context.scale(x,y);
  }

  public moveTo(x: number, y: number)  {
    this._context.moveTo(x,y);
  }

  public bezierCurveTo(cp1x:number, cp1y:number, cp2x:number, cp2y:number, x:number, y:number){
    this._context.bezierCurveTo(cp1x, cp1y, cp2x, cp2y, x, y);
    
  }
  public quadraticCurveTo(cpx:number, cpy:number, x:number, y:number) {
    this._context.quadraticCurveTo(cpx, cpy, x, y);
  }


  public ellipse(x:number, y:number, radiusX:number, radiusY:number, rotation:number, startAngle:number, endAngle:number){
    this._context.ellipse(x, y, radiusX, radiusY, rotation, startAngle, endAngle);
  }

  public createLinearGradient(x0:number,y0:number,x1:number,y1:number):CanvasGradient{
    return this._context.createLinearGradient(x0,y0,x1,y1);
  }

  public createPattern(image:any,repetion:any):CanvasPattern{
    return this._context.createPattern(image,repetion);
  }

  public clip(fillrule?:any):void{
    this._context.clip(fillrule);
  }

  public setBlendMode(val:string){
    this._context.globalCompositeOperation=val;
    
  }

  public createRadialGradient(x0:number,y0:number,r0:number,x1:number,y1:number,r1:number):CanvasGradient{
    return this._context.createRadialGradient(x0,y0,r0,x1,y1,r1);
  }
  public isPointInPath(x:number,y:number):boolean{
      return this._context.isPointInPath(x,y);
  }

  

 

  
}
