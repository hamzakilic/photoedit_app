import { Command } from './command';
import {Message} from '../entities/message';
import {MessageBus} from '../lib/messageBus';
import {Constants} from '../lib/constants';




export class CmdShowError extends Command {

  private msg: string;
  constructor(msg: string) {
    super();
    this.msg = msg;
  }
  protected execute(): void {
    if (!this.msg)
      return;
      MessageBus.publish(Message.ShowError,{msg:this.msg});
  }
}
