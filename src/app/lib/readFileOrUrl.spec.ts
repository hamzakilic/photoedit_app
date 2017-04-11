import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { callback as iskilip_callback } from 'iskilip/core/callback';
import { readFileOrUrl } from './readFileOrUrl';

class MockFileReader{
  callError: boolean;
  constructor(callError: boolean = false) {
    this.callError = callError;
    console.log('mock file reader called');
  }
  onerror(err:any){
    console.log('wrong onerror');
  }
  onload(data:any){
    console.log('yaanlis onload');
  }
  readAsArrayBuffer(data:any){
    if(this.callError)
    this.onerror('err');
    else this.onload('data');
  }
}

describe('readFileOrUrl', () => {

  let errorOccured = false;
  let successOccured = false;
  function onError(err: any) {
    errorOccured = true;
  };
  function onSuccess(data: any) {
    successOccured = true;
  }


  beforeEach(() => {
    errorOccured=false;
    successOccured =false;

  });



  it('should handleclick success', (done) => {

    spyOn(window,"FileReader").and.returnValue(new MockFileReader(false));
    readFileOrUrl.readAsync({},new iskilip_callback((data)=>onSuccess(data)));

      setTimeout(()=>{
      while(!successOccured);
      done();},100);

  });

   it('should handleclick error', (done) => {

    spyOn(window,"FileReader").and.returnValue(new MockFileReader(true));
    readFileOrUrl.readAsync({},new iskilip_callback((data)=>onSuccess(data)),new iskilip_callback(err=>onError(err)));

    setTimeout(()=>{
      while(!errorOccured);
      done();
    },100);

  });


