import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { Callback  } from '../../lib/callback';
import { Message } from '../../lib/message'
import { MessageBus } from '../../lib/messageBus';


import  { Workspace } from './workSpace';


describe('workspace', () => {


  it('should create', () => {
    let item = new Workspace(10,10);
    expect(item).toBeTruthy();
  });
  it('should have empty layers', () => {
    let item = new Workspace(10,10);
    expect(item.layers.length).toEqual(0);
  });


  it('should have a default name', () => {
    let item = new Workspace(10,10);
    expect(item.name).toEqual('image');

  });

  it('should have a name', () => {
    let item = new Workspace(10,10,'hamza');
    expect(item.name).toEqual('hamza');
    expect(item.width).toEqual(10);
    expect(item.height).toEqual(10);

  });

  it('should dispose', () => {
    let item = new Workspace(10,10,'hamza')
    item.dispose();


  });
  it('background and foreground layers must true', () => {
    let item = new Workspace(10,20,'hamza')
    expect(item.backgroundLayer.width).toEqual(10);
    expect(item.backgroundLayer.height).toEqual(20);
    expect(item.backgroundLayer.stwidth).toEqual(10);
    expect(item.backgroundLayer.stheight).toEqual(20);
     expect(item.foregroundLayer.width).toEqual(10*2);
    expect(item.foregroundLayer.height).toEqual(20*2);
    expect(item.foregroundLayer.stwidth).toEqual(10*2);
    expect(item.foregroundLayer.stheight).toEqual(20*2);


  });

  it('should resize must call', (done) => {
    let item = new Workspace(10,10,'hamza');

    let calledTest =false;
    let calledTest2= false;
    function test(callFunc: Callback){

        calledTest = true;
        callFunc.call(undefined);
    }
    function test2(){
        calledTest2 = true;
    }

    item.onEvent(Workspace.EVENTRESIZED,new Callback((call)=>{
        test(call);
    }));

    item.resize(4,6,new Callback(()=>{test2();}));
    setTimeout(()=>{
      expect(item.width).toEqual(4);
      expect(item.height).toEqual(6);
      while(!calledTest || !calledTest2);

      done();

    },100);


  });




});
