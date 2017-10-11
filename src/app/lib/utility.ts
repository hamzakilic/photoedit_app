


export class Utility {
 static counter:number=0;
/**
 * creates an uuid string
 */
  public static uuid(): string {
    Utility.counter++;
    return "pe"+Utility.counter.toString();
    /* return 'PE'+'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function (c) {
      var r = Math.random() * 16 | 0, v = c == 'x' ? r : (r & 0x3 | 0x8);

      return v.toString(16);
    }).replace('-',''); */
  }

  
}
