import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { callback as iskilip_callback } from 'iskilip/core/callback';

import { menuItemOpenImage } from './menuItemOpenImage';


class MockHTMLInput {
  files: Array<File>;
  constructor() {
    this.files = new Array<File>();
    let content = "Hello World";
    let data = new Blob([content], { type: 'text/plain' });
    let arrayOfBlob = new Array<Blob>();
    arrayOfBlob.push(data);
    let file = new File(arrayOfBlob, "Mock.csv");
    this.files.push(file);
  }
}
class MockFileReader{
  callError: boolean;
  constructor(callError: boolean = false) {
    this.callError = callError;
    //console.log('mock file reader called');
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


describe('menuItemOpenImage', () => {
  let item = new menuItemOpenImage();
  let onSuccessCalled:boolean = false;
  let onErrorCalled:boolean =false;
  item.onSuccess = function(data:any){
    onSuccessCalled = true;
  }
  item.onError = function (err:any){
    onErrorCalled = true;
  }

  beforeEach(() => {

  });

  it('should create menuItem', () => {
    expect(item).toBeTruthy();
    expect(item.acceptFileTypes).toBe('image/*');
    expect(item.name).toBe("Open Image");
  });

  it('should handleclick success', (done) => {
    var input = new MockHTMLInput();

    document.getElementById = jasmine.createSpy('getelementById').and.returnValue(input);
    item.handleFiles();
      setTimeout(()=>{
      while(!onSuccessCalled);
      done();
      },100);

  });

   it('should handleclick must error', (done) => {
    var input = new MockHTMLInput();

    document.getElementById = jasmine.createSpy('getelementById').and.returnValue(input);
    spyOn(window,"FileReader").and.returnValue(new MockFileReader(true));
    item.handleFiles();
setTimeout(()=>{
      while(!onErrorCalled);
      done();
      },100);

  });



});

