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
  it('should reInit must call', (done) => {
    let item = new workspace(10,10,'hamza')
    let calledTest =false;
    let calledTest2= false;
    function test(callback: iskilip_callback){

        calledTest = true;
        callback.call(undefined);
    }
    function test2(){
        calledTest2 = true;
    }
    item.reInitCallback = (call)=>{test(call)};
    item.reInit(4,6,new iskilip_callback(test2));
    setTimeout(()=>{
      expect(item.width).toEqual(4);
      expect(item.height).toEqual(6);
      while(!calledTest || !calledTest2);

      done();

    },100);


  });




});
