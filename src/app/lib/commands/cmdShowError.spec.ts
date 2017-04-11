import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { callback as iskilip_callback } from 'iskilip/core/callback';
import { message } from '../message'
import { messageBus } from '../messageBus';
import { cmdShowError} from './cmdShowError';

describe('cmdShowError', () => {
  let msg: string ;
  function showError(data : any){
    msg = data.msg;
  }
  let call =  new iskilip_callback((data)=>showError(data));

  beforeEach(() => {
    messageBus.subscribe(message.ShowError,call);
    msg = undefined;
  });
  afterEach(()=>{
    messageBus.unsubscribe(message.ShowError,call);
    msg =undefined;
  });

  it('should execute correctly', (done) => {

    let cmd = new cmdShowError('hamza');
    cmd.executeAsync();
      setTimeout(()=>{
        while(!msg);
        expect(msg).toEqual('hamza');
        done();
      },100);

  });


});
