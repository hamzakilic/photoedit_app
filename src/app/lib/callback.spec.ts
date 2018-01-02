
import {Callback} from './callback';


describe('callback', function() {
  it('must call our void function and result must be valid', function() {
      var testVariable = 0;
       function testfunc(){
             testVariable = 1;
        }

    var callFunc = Callback.from(testfunc);
    callFunc.call(undefined);
    expect(testVariable).toEqual(1);

  });
  it('must not call our void function and result must be valid', function() {
      var testVariable = 0;
       function testfunc(){
             testVariable = 1;
        }

    var callFunc = Callback.from(()=>{});
    callFunc.call(undefined);
    expect(testVariable).toEqual(0);

  });
   it('must  call our return function and result must be valid', function() {

       function testfunc(variable){
             return variable + 6;
        }

    var callFunc = Callback.from(testfunc);

    expect(callFunc.call(5)).toEqual(11);

  });

  it('must  call our return function with an object and result must be valid', function() {

       function testfunc(variable){
             variable.x += 10;
             variable.y += 20;
        }

    var callFunc = Callback.from(testfunc);
    var obj = { x: 1,y: 2};
    callFunc.call(obj);
    expect(obj.x).toEqual(11);
    expect(obj.y).toEqual(22);

  });

});
