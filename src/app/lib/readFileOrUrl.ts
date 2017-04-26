
import { FileData } from  '../shared/entities/fileData';
import { Callback } from '../lib/callback';

export class ReadFileOrUrl {
  public static readAsync(file: any, onSuccess?: Callback, onError?: Callback, onProgress?: Callback) {

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
        fileResult.buffer = reader.result;
        fileResult.fileName = file.name;
        onSuccess.call(fileResult);
     }

    }
    reader.onerror = function (e) {
      if (onerror)
        onError.call(e.message);
    }
    //start reading
    reader.readAsArrayBuffer(file);
  }
}
