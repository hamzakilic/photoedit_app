

import { menu } from '../menu';
import { menuItem } from '../menu';
import { utility } from '../../../lib/utility';
import { readFileOrUrl } from '../../../lib/readFileOrUrl';
import { message } from '../../../lib/message';
import { messageBus } from '../../../lib/messageBus';
import { commandReadImageFromBuffer } from '../../../lib/commands/cmdReadImageFromBuffer';
import { callback as iskilip_callback } from 'iskilip/core/callback';


//a base class for open file actions
export class menuItemOpenFile extends menuItem {
  public isOpenFile: boolean;
  public idOfInput: string;
  public acceptFileTypes: string;
  public onProgressFunc: iskilip_callback;
  public onSuccessFunc: iskilip_callback;
  public onErrorFunc: iskilip_callback;

  constructor(name: string, acceptFileTypes: string, onSuccess?: iskilip_callback, onError?: iskilip_callback, onProgress?: iskilip_callback) {
    super(name, undefined);
    this.isOpenFile = true;
    this.idOfInput = utility.uuid();
    this.acceptFileTypes = acceptFileTypes;
    this.onProgressFunc = onProgress;
    this.onSuccessFunc = onSuccess;
    this.onErrorFunc = onError;
  }
  handleFiles(): void {
      let fileList: FileList = undefined;

      let input = (<HTMLInputElement>document.getElementById(this.idOfInput));
      if (input) {
        fileList = input.files;
      }


    if (fileList && fileList.length > 0) {

        readFileOrUrl.readAsync(fileList[0], this.onSuccessFunc, this.onErrorFunc, this.onProgressFunc);
    }
  }



onClick(parameters ?: any): void {

  let fileElem = (<HTMLInputElement>document.getElementById(this.idOfInput));

  if(fileElem) {
    fileElem.value = null;
    fileElem.click();
  }
}
}
