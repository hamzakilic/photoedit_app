import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { callback as iskilip_callback } from 'iskilip/core/callback';

import { menuItemOpenFile } from './menuItemOpenFile';





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

describe('menuItemOpenFile', () => {

  let item = new menuItemOpenFile('test', 'image/*',
  new iskilip_callback((data)=>onSuccess(data)),
  new iskilip_callback((err)=>onError(err)));
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

  it('should create a menu', () => {
    expect(item).toBeTruthy();
    expect(item.acceptFileTypes).toBe('image/*');
  });

  it('should handleclick success', (done) => {
    var input = new MockHTMLInput();

    document.getElementById = jasmine.createSpy('getelementById').and.returnValue(input);
    item.handleFiles();
      setTimeout(()=>{
      while(!successOccured);
      done();},100
      );



  });

   it('should handleclick must error', (done) => {
    var input = new MockHTMLInput();

    document.getElementById = jasmine.createSpy('getelementById').and.returnValue(input);
    spyOn(window,"FileReader").and.returnValue(new MockFileReader(true));
    item.handleFiles();
      setTimeout(()=>{
      while(!errorOccured);
      done();},100
      );


  });





});

