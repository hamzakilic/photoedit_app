import { AppService } from './../services/app.service';
import { AlertItem } from './../entities/alertItem';
import { Command } from './command';
import {Message} from '../entities/message';
import {MessageBus} from '../lib/messageBus';
import {Constants} from '../lib/constants';




export class CmdShowAlert extends Command {

  private alert:AlertItem;
  private appService:AppService;
  constructor(alert: AlertItem,appService:AppService) {
    super();
    this.alert = alert;
    this.appService=appService;
  }
  protected execute(): void {
    if (!this.alert)
      return;
      this.appService.showAlert(this.alert);
  }
}