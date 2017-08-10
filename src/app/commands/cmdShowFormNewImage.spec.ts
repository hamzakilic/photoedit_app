import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { Callback  } from '../../lib/callback';
import { Message } from '../../lib/message'
import { MessageBus } from '../../lib/messageBus';
import { CmdShowFormNewImage} from './cmdShowFormNewImage';

describe('cmdShowFormNewImage', () => {
  let called : boolean;
  function showForm(data : any){
    called = true;
  }
  let call =  new Callback((data)=>showForm(data));

  beforeEach(() => {
    MessageBus.subscribe(Message.ShowFormNewImage,call);
    called = false;
  });
  afterEach(()=>{
    MessageBus.unsubscribe(Message.ShowFormNewImage,call);
    called=false;
  });

  it('should execute correctly', (done) => {

    let cmd = new CmdShowFormNewImage();
    cmd.executeAsync();
      setTimeout(()=>{
        while(!called);
        expect(called).toEqual(true);
        done();
      },100);

  });


});
