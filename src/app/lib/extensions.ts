
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






