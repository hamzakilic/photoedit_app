import { ImageAlgorithmConvolution } from './../lib/imagealgorithm/convolution/imageAlgorithmConvolution';
import { Command } from './command';
import {Message} from '../entities/message';
import {MessageBus} from '../lib/messageBus';
import {Constants} from '../lib/constants';




export class CmdShowFormConvolution extends Command {
    private _convolutions:ImageAlgorithmConvolution[];
  constructor(convolutions:ImageAlgorithmConvolution[]) {
    super();
    this._convolutions=convolutions;

  }
  protected execute(): void {

      MessageBus.publish(Message.ShowFormConvolution,this._convolutions);
  }
}
