

import { menu } from '../menu';
import { menuItem } from '../menu';
import { Utility } from '../../../lib/utility';
import { ReadFileOrUrl } from '../../../lib/readFileOrUrl';
import { Message } from '../../../entities/message';
import { MessageBus } from '../../../lib/messageBus';

import { Callback  } from '../../../lib/callback';


//a base class for open file actions
export class menuItemOpenFile extends menuItem {
  public isOpenFile: boolean;
  public idOfInput: string;
  public acceptFileTypes: string;
  public onProgressFunc: Callback;
  public onSuccessFunc: Callback;
  public onErrorFunc: Callback;

  constructor(name: string, acceptFileTypes: string, onSuccess?: Callback, onError?: Callback, onProgress?: Callback) {
    super(name, undefined);
    this.isOpenFile = true;
    this.idOfInput = Utility.uuid();
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

        ReadFileOrUrl.readAsync(fileList[0], 2, this.onSuccessFunc, this.onErrorFunc, this.onProgressFunc);
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
