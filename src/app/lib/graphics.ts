import { HImage } from './image';
import { Rect } from '../lib/draw/rect'

export class Graphics {
  private context: CanvasRenderingContext2D;
  public readonly width: number;
  public readonly height: number;
  public scale: number;
  /**
   * creates a graphics context from canvas element
   */
  constructor(element: any, width: number, height: number, scale: number) {

    this.context = element.nativeElement.getContext("2d");
    this.width = width;
    this.height = height;
    this.scale = scale;
   

  }
  public dispose() {

  }
  public setGlobalAlpha(value: number){
    this.context.globalAlpha=value;
  }
  public putImage(img: HImage) {
    
    let imageData = this.context.getImageData(0, 0, this.width, this.height);
    var data = imageData.data;
    data.set(img.Pixels);
    this.context.putImageData(imageData, 0, 0);
  }

   

  /**
   * allways creates a deep copy HImage
   * @returns HImage
   */
  public getImage():HImage{
    let imageData = this.context.getImageData(0, 0, this.width, this.height);    
    let arr = new Uint8ClampedArray(imageData.data);
    let img = new HImage(this.width,this.height,arr);
    return img;


  }

  
public drawImageRect(img: HImage, sourceRect: Rect,destRect:Rect) {
  
  
  
    let imageData =new ImageData(img.Pixels,img.width,img.height);
    
    createImageBitmap(imageData).then((bitmap)=>{
      
       this.context.drawImage(bitmap, sourceRect.x,sourceRect.y,sourceRect.width,sourceRect.height,destRect.x,destRect.y,destRect.width,destRect.height);
       
    }).catch((ex)=>{
      //TODO: exception durumu handle edilmeli
    });
  }

  public drawHtmlImageFit(img: HTMLImageElement, x: number, y: number) {

    this.context.drawImage(img, x, y, img.naturalWidth, img.naturalHeight, 0, 0, this.width, this.height);

  }

 
  public drawHtmlImageRect(img: HTMLImageElement, sourceRect: Rect,destRect:Rect) {
   
    this.context.drawImage(img, sourceRect.x,sourceRect.y,sourceRect.width,sourceRect.height,destRect.x,destRect.y,destRect.width,destRect.height);

  }
 


 public fillRectRGBA(rect: Rect, r: number,g: number,b: number,a: number): void {
    this.context.fillStyle ="rgba("+r+","+g+","+b+","+(a/255)+")";
    this.context.fillRect(rect.x, rect.y, rect.width, rect.height);
  }

  public fillRect(rect: Rect, brush: string): void {
    this.context.fillStyle = brush;
    this.context.fillRect(rect.x, rect.y, rect.width, rect.height);
  }
  public clearRect(rect: Rect){
    this.context.clearRect(rect.x,rect.y,rect.width,rect.height);
  }

  public drawLine(x1: number, y1: number, x2: number, y2: number, lineWidth: number = 1, brush?: string) {
    this.context.beginPath();
    this.context.moveTo(x1, y1);
    this.context.lineTo(x2, y2);
    this.context.lineWidth = lineWidth;
    if (brush)
      this.context.strokeStyle = brush;
    this.context.stroke();
  }
  public save(){
    this.context.save();
  }
  public restore(){
    this.context.restore();
  }
  public translate(w: number,h: number){
    this.context.translate(w,h);
  }
  public rotate(angleDeg: number) {
      this.context.rotate(angleDeg*Math.PI/180);
  }
}
