import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { callback as iskilip_callback } from 'iskilip/core/callback';
import { message } from '../message'
import { messageBus } from '../messageBus';
import { cmdShowFormNewImage} from './cmdShowFormNewImage';

describe('cmdShowFormNewImage', () => {
  let called : boolean;
  function showForm(data : any){
    called = true;
  }
  let call =  new iskilip_callback((data)=>showForm(data));

  beforeEach(() => {
    messageBus.subscribe(message.ShowFormNewImage,call);
    called = false;
  });
  afterEach(()=>{
    messageBus.unsubscribe(message.ShowFormNewImage,call);
    called=false;
  });

  it('should execute correctly', (done) => {

    let cmd = new cmdShowFormNewImage();
    cmd.executeAsync();
      setTimeout(()=>{
        while(!called);
        expect(called).toEqual(true);
        done();
      },100);

  });


});
