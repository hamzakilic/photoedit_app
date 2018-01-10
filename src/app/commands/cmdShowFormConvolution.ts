import { IImageAlgorithmImmutable } from './../lib/image';

import { Command } from './command';
import {Message} from '../entities/message';
import {MessageBus} from '../lib/messageBus';
import {Constants} from '../lib/constants';




export class CmdShowFormConvolution extends Command {
    private _convolutions:IImageAlgorithmImmutable[];
    private _nameOfForm:string;
    private _isBusy:boolean;
  constructor(nameOfForm:string,isBusy:boolean, convolutions:IImageAlgorithmImmutable[]) {
    super();
    this._convolutions=convolutions;
    this._isBusy=isBusy;
    this._nameOfForm=nameOfForm;

  }
  protected execute(): void {

      MessageBus.publish(Message.ShowFormConvolution,{convolutions:this._convolutions,name:this._nameOfForm,isBusy:this._isBusy});
  }
}
