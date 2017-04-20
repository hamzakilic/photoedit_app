
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { callback as iskilip_callback } from 'iskilip/core/callback';
import { image as iskilip_image } from 'iskilip/img/image';
import { message } from '../../lib/message'
import { messageBus } from '../../lib/messageBus';



import { layer } from './layer';
import { layerImage } from './layerImage';

describe('layerImage', () => {
  let img =new iskilip_image(1,1);

  it('should create', () => {
    let item = new layerImage(img);
    expect(item).toBeTruthy();
  });
   it('should default name must be', () => {
    let item = new layerImage(img);
    expect(item.name).toEqual('layer');
  });

    it('should have a name like', () => {
    let item = new layerImage(img,'hamza');
    expect(item.name).toEqual('hamza');
  });



});
