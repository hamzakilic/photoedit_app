import {menu} from '../menu';
import {menuItem } from '../menu';
import {utility} from '../../../lib/utility';
import {readFileOrUrl} from '../../../lib/readFileOrUrl';
import {message} from '../../../lib/message';
import {messageBus} from '../../../lib/messageBus';
import {commandTest} from '../../../lib/commands/commandTest';
import {callback as iskilip_core_callback} from 'iskilip/core/callback';


export class menuItemTest extends menuItem{

    constructor(name: string,func:iskilip_core_callback){
      super(name,func);

    }



    onClick(parameters?:any): void{

      let cmd = new commandTest(this.clickFunc);
      cmd.executeAsync();
  }
}
