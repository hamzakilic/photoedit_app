
import { fileData } from  '../shared/entities/fileData';
import {callback as iskilip_callback} from 'iskilip/core/callback';

export class readFileOrUrl {
  public static readAsync(file: File, onSuccess?: iskilip_callback, onError?: iskilip_callback, onProgress?: iskilip_callback) {

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
        let fileResult = new fileData();
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
