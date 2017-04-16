
import { message } from './message';
import { messageBus } from './messageBus';
import { constants } from './constants';
import {CanvasComponent} from '../components/canvas-target/canvas.component';

import { memoryStream as iskilip_memoryStream } from 'iskilip/io/memoryStream';
import { bmpDecoder as iskilip_bmpDecoder } from 'iskilip/img/bmpDecoder';
import { decoder as iskilip_decoder } from 'iskilip/img/decoder';
import { callback as iskilip_callback } from 'iskilip/core/callback';

export class someTestFuncs {

  static  canvasContainer :CanvasComponent;



  static TestCanvas1(): iskilip_callback {



    return new iskilip_callback(

      () => {


      }
    );

  }

  static TestCanvas2(): iskilip_callback {

    return new iskilip_callback(

      () => {

      }
    );

  }

  static TestCanvas3(): iskilip_callback {

    return new iskilip_callback(

      () => {

      }
    );

  }


}
