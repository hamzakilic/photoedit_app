import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { Callback } from '../../lib/callback';
import { Message } from '../../lib/message'
import { MessageBus } from '../../lib/messageBus';
import { CmdShowError} from './cmdShowError';

describe('cmdShowError', () => {
  let msg: string ;
  function showError(data : any){
    msg = data.msg;
  }
  let call =  new Callback((data)=>showError(data));

  beforeEach(() => {
    MessageBus.subscribe(Message.ShowError,call);
    msg = undefined;
  });
  afterEach(()=>{
    MessageBus.unsubscribe(Message.ShowError,call);
    msg =undefined;
  });

  it('should execute correctly', (done) => {

    let cmd = new CmdShowError('hamza');
    cmd.executeAsync();
      setTimeout(()=>{
        while(!msg);
        expect(msg).toEqual('hamza');
        done();
      },100);

  });


});
