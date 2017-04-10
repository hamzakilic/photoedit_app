import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { callback as iskilip_callback } from 'iskilip/core/callback';
import { messageBus } from './messageBus';

describe('messageBus', () => {

let call=new iskilip_callback(onTest);
  var onTestArrived = false;

  function onTest(data: any) {
    console.log('data called');
    onTestArrived = true;
  }


  beforeEach(() => {
      onTestArrived = false;
      messageBus.unsubscribe('onTest',call);
  });

  it('should  subscribe', () => {

      messageBus.subscribe('onTest',call);

      messageBus.publish('onTest',{});

      while(!onTestArrived);
      messageBus.unsubscribe('onTest',call);
  });

   it('should  subscribe and unsubsribe', () => {

      messageBus.subscribe('onTest',call);

      messageBus.publish('onTest',{});

      while(!onTestArrived);//spin
      onTestArrived=false;
      messageBus.unsubscribe('onTest',call);
      messageBus.publish('onTest',{});
      for(let i=0;i<10;++i);//wait a litte
      console.log("onTestArived:"+onTestArrived);
      expect(onTestArrived).toEqual(false);
      messageBus.unsubscribe('onTest',call);

  });

});
