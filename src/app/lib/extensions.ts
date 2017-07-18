

    interface Number {
        extRound: () => number;

    }
 


   Number.prototype.extRound = function (): number {
        return Math.round(this);
    }






