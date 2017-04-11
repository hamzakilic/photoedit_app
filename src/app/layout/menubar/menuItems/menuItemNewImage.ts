import { menu } from '../menu';
import { menuItem } from '../menu';
import { utility } from '../../../lib/utility';
import { readFileOrUrl } from '../../../lib/readFileOrUrl';
import { message } from '../../../lib/message';
import { messageBus } from '../../../lib/messageBus';
import { cmdShowFormNewImage } from '../../../lib/commands/cmdShowFormNewImage';
import { callback as iskilip_callback } from 'iskilip/core/callback';


//a base class for new image
export class menuItemNewImage extends menuItem {

    constructor() {
      super('New',undefined);

    }

    onClick(parameters?:any): void{
      let cmd = new cmdShowFormNewImage();
      cmd.executeAsync();
  }


}
