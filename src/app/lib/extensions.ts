
/**
 * extensions for Number
 */
interface Number {
    extRound: () => number;
    extCeil: () => number;
    extFloor: () => number;
    extAbs: () => number;
    extToInt32:()=>number;


}



Number.prototype.extRound = function (): number {
    return Math.round(this);
}
Number.prototype.extCeil = function (): number {
    return Math.ceil(this);
}
Number.prototype.extFloor = function (): number {
    return Math.floor(this);
}

Number.prototype.extAbs = function (): number {
    return Math.abs(this);
}


Number.prototype.extToInt32 = function (): number {
    
    return this | 0;
    
}




  
/*  
  Window.prototype.createImageBitmap = function(imageData):Promise<any>{
    debugger;
    return new Promise((resolve,reject)=>{

        let  canvas=document.createElement('canvas');
    canvas.width=imageData.width;
    canvas.height=imageData.height;
    let context= canvas.getContext("2d");
    context.putImageData(imageData,0,0);
        return resolve(canvas);

    });
    
    
    
} */






