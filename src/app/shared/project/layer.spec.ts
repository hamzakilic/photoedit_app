import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { callback as iskilip_callback } from 'iskilip/core/callback';
import { message } from '../../lib/message'
import { messageBus } from '../../lib/messageBus';



import { layer } from './layer';

describe('layer', () => {


  it('should create', () => {
    let item = new layer();
    expect(item).toBeTruthy();
  });
   it('should default name must be', () => {
    let item = new layer();
    expect(item.Name).toEqual('layer');
  });

    it('should have a name like', () => {
    let item = new layer('hamza');
    expect(item.Name).toEqual('hamza');
  });



});
