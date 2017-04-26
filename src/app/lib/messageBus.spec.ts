import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { Callback } from './callback';
import { MessageBus } from './messageBus';

describe('messageBus', () => {

let call=new Callback(onTest);
  var onTestArrived = false;

  function onTest(data: any) {
   // console.log('data called');
    onTestArrived = true;
  }


  beforeEach(() => {
      onTestArrived = false;
      MessageBus.unsubscribe('onTest',call);
  });

  it('should  subscribe', () => {

      MessageBus.subscribe('onTest',call);

      MessageBus.publish('onTest',{});

      while(!onTestArrived);
      MessageBus.unsubscribe('onTest',call);
  });

   it('should  subscribe and unsubsribe', () => {

      MessageBus.subscribe('onTest',call);

      MessageBus.publish('onTest',{});

      while(!onTestArrived);//spin
      onTestArrived=false;
      MessageBus.unsubscribe('onTest',call);
      MessageBus.publish('onTest',{});


      for(let i=0;i<10;++i);//wait a litte

      expect(onTestArrived).toEqual(false);
      MessageBus.unsubscribe('onTest',call);

  });

});
