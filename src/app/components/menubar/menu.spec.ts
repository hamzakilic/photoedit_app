import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { menu, MenuItem } from './menu';
import {Callback } from '../../lib/callback';

describe('menu', () => {
    it('should create a menu', () => {
      let m = new menu('amenu');
    expect(m).toBeTruthy();

  });
   it('should name equal', () => {
      let m = new menu('amenu');
      expect(m.name).toBe('amenu');
  });
  it('should disabled initialized false', () => {
      let m = new menu('amenu');
      expect(m.disabled).toBe(false);
  });
  it('should childs initialized to zero lenght array', () => {
      let m = new menu('amenu');
      expect(m.childs.length).toBe(0);
  });
});


describe('menuItem', () => {
    let counter=0;
   function test(){
      counter++;
   }
   let callfunc = Callback.from(test);

   beforeEach(()=>{
     counter=0;
   });

    it('should create a menuItem', () => {
      let m = new MenuItem('amenuItem',callfunc);
      expect(m).toBeTruthy();
      expect(m.disabled).toBe(false);
      expect(m.clickFunc).toBeTruthy();

  });

  it('should call func ', () => {
      let m = new MenuItem('amenuItem',callfunc);
      m.onClick(undefined);
      expect(counter).toBe(1);

  });

});
