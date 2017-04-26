
export abstract class Command {
    public executeAsync():void {

      let promise = new Promise((resolve, reject) => {

                   this.execute();
                   resolve();

            });
    }
    protected abstract execute(): void;


}
