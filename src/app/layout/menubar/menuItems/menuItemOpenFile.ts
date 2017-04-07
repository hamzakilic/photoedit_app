import {menu} from '../menu';
import {menuItem } from '../menu';
import {utility} from '../../../lib/utility';
import {readFileOrUrl} from '../../../lib/readFileOrUrl';
import {message} from '../../../lib/message';
import {messageBus} from '../../../lib/messageBus';
import {commandReadImageFromBuffer} from '../../../lib/commands/commandReadImageFromBuffer';
import {callback as iskilip_core_callback} from 'iskilip/core/callback';


export class menuItemOpenFile extends menuItem{
    public isOpenFile: boolean;
    public idOfInput: string;
    constructor(name: string,func:iskilip_core_callback){
      super(name,func);
      this.isOpenFile = true;
      this.idOfInput = utility.uuid();
    }
    handleFiles(): void{

      let filelist=(<HTMLInputElement>document.getElementById(this.idOfInput)).files;

      if(filelist.length>0){

         readFileOrUrl.readAsync(filelist[0],this.onProgress,this.onSuccess,this.onError);
      }

    }
    onProgress(data: any){

    }

    onSuccess(data: any){

      let cmd = new commandReadImageFromBuffer(data);
      cmd.executeAsync();

    }
    onError(err:any){

        messageBus.publish(message.ShowError,{msg:err});
    }

    onClick(parameters?:any): void{

      let fileElem = (<HTMLInputElement>document.getElementById(this.idOfInput));

      if(fileElem){
        fileElem.value = null;
      fileElem.click();
      }
  }
}
