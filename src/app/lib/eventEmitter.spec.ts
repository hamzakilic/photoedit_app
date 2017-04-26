
import {HEventEmitter } from './eventEmitter';
import {Callback} from './callback';


class testEventEmitter extends HEventEmitter {
  constructor() {
    super();

  }
  callsomething(thenfunc: any , done?:any) {
    var promiseList = super.callEvent('on');

    Promise.all(promiseList).then(
      values => {
        thenfunc();
      }).catch(err => {
      done(err);
    });




  }

}



describe('eventemiter', function () {
  it('must call our void function and result must be valid', (done) => {
    var testVariable = 0;

    function testfunc() {
      testVariable += 1;
    }
    //create a callback
    var callbackFunc = new Callback(testfunc);
    var testForEvent = new testEventEmitter();
    //add an event
    testForEvent.onEvent('on', callbackFunc);

    //test on event

    testForEvent.callsomething(() => {
      expect(testVariable).toEqual(1);
      done();
    });



  });



  it('add event, call, then remove event, and call again', function (done) {
    var testVariable = 0;

    function testfunc() {
      testVariable += 1;
    }
    //create a callback
    var callbackFunc = new Callback(testfunc);
    var testForEvent = new testEventEmitter();
    //add an event
    testForEvent.onEvent('on', callbackFunc);
    //test on event
    testForEvent.callsomething(() => {
      expect(testVariable).toEqual(1);
      testForEvent.offEvent('on', callbackFunc);
      testForEvent.callsomething(() => {
        expect(testVariable).toEqual(1);
        done();
      });

    });




  });

  it('add event twice', function (done) {
    var testVariable = 0;

    function testfunc() {
      testVariable += 1;
    }
    //create a callback
    var callbackFunc = new Callback(testfunc);
    var testForEvent = new testEventEmitter();
    //add an event
    testForEvent.onEvent('on', callbackFunc);
    //add again the same function
    testForEvent.onEvent('on', callbackFunc);
    //test on event
    testForEvent.callsomething(() => {
      expect(testVariable).toEqual(2);
      done();
    }, done);




  });

  it('add event twice and call twice', function (done) {
    var testVariable = 0;

    function testfunc() {
      testVariable += 1;
    }
    //create a callback
    var callbackFunc = new Callback(testfunc);
    var testForEvent = new testEventEmitter();
    //add an event
    testForEvent.onEvent('on', callbackFunc);
    //add again the same function
    testForEvent.onEvent('on', callbackFunc);
    //test on event
    testForEvent.callsomething(() => {

      expect(testVariable).toEqual(2);
      testForEvent.callsomething(() => {
        expect(testVariable).toEqual(4);
        done();
      });
    });


  });


  it('add event twice, call, then remove one of them and call again', function (done) {
    var testVariable = 0;

    function testfunc() {
      testVariable += 1;
    }
    //create a callback
    var callbackFunc = new Callback(testfunc);
    var testForEvent = new testEventEmitter();
    //add an event
    testForEvent.onEvent('on', callbackFunc);
    //add again the same function
    testForEvent.onEvent('on', callbackFunc);
    //test on event
    testForEvent.callsomething(()=>{
      expect(testVariable).toEqual(2);
      testForEvent.offEvent('on', callbackFunc);
      testForEvent.callsomething(()=>{
        expect(testVariable).toEqual(3);
        done();
      });

    });


  });

  it('add different callbacks and remove one of them', function(done) {
      var testVariable = 0;
       function testfunc(){
             testVariable += 1;
        }

       var testVariable2 = 0;
       function testfunc2(){
             testVariable2 += 1;
        }

    //create a callback
    var callbackFunc = new Callback(testfunc);
    var callbackFunc2 = new Callback(testfunc2);

    var testForEvent = new testEventEmitter();
    //add an event
    testForEvent.onEvent('on',callbackFunc);
    //add again the same function
    testForEvent.onEvent('on',callbackFunc2);
    //test on event
    testForEvent.callsomething(()=>{

      expect(testVariable).toEqual(1);
      expect(testVariable2).toEqual(1);

      testForEvent.offEvent('on',callbackFunc);
      testForEvent.callsomething(()=>{
          expect(testVariable).toEqual(1);
          expect(testVariable2).toEqual(2);
          done();
      });

    });



  });




});
