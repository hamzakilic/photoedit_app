import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { Callback  } from './callback';
import { ReadFileOrUrl } from './readFileOrUrl';

class MockFileReader{
  callError: boolean;
  constructor(callError: boolean = false) {
    this.callError = callError;
   // console.log('mock file reader called');
  }
  onerror(err:any){
    //console.log('wrong onerror');
  }
  onload(data:any){
    //console.log('yaanlis onload');
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
    ReadFileOrUrl.readAsync({},Callback.from((data)=>onSuccess(data)));

      setTimeout(()=>{
      while(!successOccured);
      done();},100);

  });

   it('should handleclick error', (done) => {

    spyOn(window,"FileReader").and.returnValue(new MockFileReader(true));
    ReadFileOrUrl.readAsync({},Callback.from((data)=>onSuccess(data)),Callback.from(err=>onError(err)));

    setTimeout(()=>{
      while(!errorOccured);
      done();
    },100);

  });


