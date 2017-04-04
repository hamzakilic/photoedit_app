


export class readFileOrUrl {
  public static readAsync(file: any, onprogress?: any, onload?: any, onerror?: any, onabort?: any) {

    var reader = new FileReader();
    reader.onprogress = function (oEvent) {
      if (oEvent.lengthComputable) {
        var percentComplete = oEvent.loaded / oEvent.total;
         if (onprogress)
              onprogress(percentComplete);
        // ...
      } else {
        // Unable to compute progress information since the total size is unknown
      }

    }
    reader.onload = function (e) {
      if (onload) {

        var data = reader.result;
        onload(data);
     }

    }
    reader.onerror = function (e) {
      if (onerror)
        onerror(e.message);
    }
    reader.readAsArrayBuffer(file);
  }
}
