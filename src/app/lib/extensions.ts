
/**
 * extensions for Number
 */
interface Number {
    extRound: () => number;
    extCeil: () => number;
    extFloor: () => number;
    extAbs: () => number;


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






