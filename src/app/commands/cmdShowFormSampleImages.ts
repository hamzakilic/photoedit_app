import { Command } from './command';
import {Message} from '../entities/message';
import {MessageBus} from '../lib/messageBus';
import {Constants} from '../lib/constants';






export class CmdShowFormSampleImages extends Command {
  private _openAsWorkspace:boolean;
  constructor(openAsWorkspace:boolean) {
   
    super();
    this._openAsWorkspace=openAsWorkspace;

  }
  protected execute(): void {
      MessageBus.publish(Message.ShowFormSampleImages,this._openAsWorkspace);
  }
}