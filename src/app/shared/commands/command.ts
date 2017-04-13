
export abstract class command {
    public executeAsync():void {

      let promise = new Promise((resolve, reject) => {

                   this.execute();
                   resolve();

            });
    }
    protected abstract execute(): void;


}
