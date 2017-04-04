
export class graphics{
  context : CanvasRenderingContext2D;
  /**
   * creates a graphics context from canvas element
   */
  constructor(element: any) {
     this.context = element.nativeElement.getContext("2d");
  }
}
