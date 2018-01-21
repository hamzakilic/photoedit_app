export class SvgShape{  
   
    /**
     *
     */
    constructor(public name:string,  
      public unicode:string,
      public path:any,
      public viewportW:number,
      public viewportH:number) {
      
      
    }

    static cloneFrom(shape:SvgShape):SvgShape{
      if(!shape)return shape;
      return new SvgShape(shape.name,shape.unicode,shape.path,shape.viewportW,shape.viewportH);
    }

    
  }