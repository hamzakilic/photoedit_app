import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { callback as iskilip_callback } from 'iskilip/core/callback';
import { message } from '../../lib/message'
import { messageBus } from '../../lib/messageBus';


import  { WorkSpace } from './workSpace';


describe('subTab', () => {


  it('should create', () => {
    let item = new WorkSpace()
    expect(item).toBeTruthy();
  });

  it('should have a default name', () => {
    let item = new WorkSpace()
    expect(item.Name).toEqual('image');

  });

  it('should have a name', () => {
    let item = new WorkSpace('hamza')
    expect(item.Name).toEqual('hamza');

  });

  it('should dispose', () => {
    let item = new WorkSpace('hamza')
    item.Dispose();


  });


});
