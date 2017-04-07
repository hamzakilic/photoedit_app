import { command } from './commands/command';
import { message } from './message';
import { messageBus } from './messageBus';
import { constants } from './constants';
import {CanvasTargetComponent} from '../components/canvas-target/canvas-target.component';
import { canvasTargetComponentsDictionary } from '../components/canvas-target/canvas-target.component';
import { memoryStream as iskilip_memoryStream } from 'iskilip/io/memoryStream';
import { bmpDecoder as iskilip_bmpDecoder } from 'iskilip/img/bmpDecoder';
import { decoder as iskilip_decoder } from 'iskilip/img/decoder';
import { callback as iskilip_callback } from 'iskilip/core/callback';

export class someTestFuncs {

  static  canvasContainer :CanvasTargetComponent;



  static TestCanvas1(): iskilip_callback {



    return new iskilip_callback(

      () => {
        someTestFuncs.canvasContainer= canvasTargetComponentsDictionary.get(constants.MAINCANVAS);

        someTestFuncs.canvasContainer.setWidthHeight(500, 500);
        someTestFuncs.canvasContainer.grphics.drawImage(undefined);
      }
    );

  }

  static TestCanvas2(): iskilip_callback {

    return new iskilip_callback(

      () => {
        someTestFuncs.canvasContainer= canvasTargetComponentsDictionary.get(constants.MAINCANVAS);
        someTestFuncs.canvasContainer.scalePlus();
      }
    );

  }

  static TestCanvas3(): iskilip_callback {

    return new iskilip_callback(

      () => {
        someTestFuncs.canvasContainer= canvasTargetComponentsDictionary.get(constants.MAINCANVAS);
        someTestFuncs.canvasContainer.scaleMinus();
      }
    );

  }


}
