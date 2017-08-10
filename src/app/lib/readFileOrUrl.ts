
import { FileData } from  '../entities/fileData';
import { Callback } from '../lib/callback';

export class ReadFileOrUrl {
  public static readAsync(file: any,readType: number, onSuccess?: Callback, onError?: Callback, onProgress?: Callback) {

    var reader = new FileReader();
    reader.onprogress = function (oEvent) {
      if (oEvent.lengthComputable) {
        var percentComplete = oEvent.loaded / oEvent.total;
         if (onProgress)
              onProgress.call(percentComplete);
        // ...
      } else {
        // Unable to compute progress information since the total size is unknown
      }

    }
    reader.onload = function (e) {
      if (onSuccess) {

        var data = reader.result;
        let fileResult = new FileData();
        fileResult.result = reader.result;
        fileResult.fileName = file.name;

        onSuccess.call(fileResult);
     }

    }
    reader.onerror = function (e) {
      if (onerror)
        onError.call(e.message);
    }
    //start reading
    if(readType == 1)
    reader.readAsArrayBuffer(file);
    if(readType == 2)
    reader.readAsDataURL(file);
  }
}
