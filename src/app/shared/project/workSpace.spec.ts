import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { callback as iskilip_callback } from 'iskilip/core/callback';
import { message } from '../../lib/message'
import { messageBus } from '../../lib/messageBus';


import  { workspace } from './workSpace';


describe('subTab', () => {


  it('should create', () => {
    let item = new workspace()
    expect(item).toBeTruthy();
  });

  it('should have a default name', () => {
    let item = new workspace()
    expect(item.name).toEqual('image');

  });

  it('should have a name', () => {
    let item = new workspace('hamza')
    expect(item.name).toEqual('hamza');

  });

  it('should dispose', () => {
    let item = new workspace('hamza')
    item.dispose();


  });


});
