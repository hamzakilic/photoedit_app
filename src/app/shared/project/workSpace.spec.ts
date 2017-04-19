import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { callback as iskilip_callback } from 'iskilip/core/callback';
import { message } from '../../lib/message'
import { messageBus } from '../../lib/messageBus';


import  { workspace } from './workSpace';


describe('workspace', () => {


  it('should create', () => {
    let item = new workspace(10,10);
    expect(item).toBeTruthy();
  });
  it('should have empty layers', () => {
    let item = new workspace(10,10);
    expect(item.layers.length).toEqual(0);
  });

  it('should have a default name', () => {
    let item = new workspace(10,10);
    expect(item.name).toEqual('image');

  });

  it('should have a name', () => {
    let item = new workspace(10,10,'hamza');
    expect(item.name).toEqual('hamza');
    expect(item.width).toEqual(10);
    expect(item.height).toEqual(10);

  });

  it('should dispose', () => {
    let item = new workspace(10,10,'hamza')
    item.dispose();


  });




});
