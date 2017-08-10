
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { Callback  } from '../../lib/callback';
import { HImage  } from '../../lib/image';
import { Message } from '../../lib/message'
import { MessageBus } from '../../lib/messageBus';



import { Layer } from './layer';
import { LayerImage } from './layerImage';

describe('layerImage', () => {
  let img =new HImage(1,1);

  it('should create', () => {
    let item = new LayerImage(img);
    expect(item).toBeTruthy();
  });
   it('should default name must be', () => {
    let item = new LayerImage(img);
    expect(item.name).toEqual('layer');
  });

    it('should have a name like', () => {
    let item = new LayerImage(img,'hamza');
    expect(item.name).toEqual('hamza');
  });



});
