import { Layer } from './layer';
import { Graphics } from '../../lib/graphics';

import { Image  } from '../../lib/image';

export class LayerEmpty extends Layer{



  constructor(name?: string) {
    super(name);

  }
  public render(grp: Graphics): void{

  }
  public dispose(){

  }
}
