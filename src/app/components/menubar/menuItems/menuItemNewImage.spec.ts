import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { callback as iskilip_callback } from 'iskilip/core/callback';

import { menuItemNewImage } from './menuItemNewImage';
import { message} from '../../../lib/message';
import { messageBus} from '../../../lib/messageBus';


class ProjectService {

}


describe('menuItemNewImage', () => {
  const projectService = new ProjectService();
 let variable = false;
    function test(){
      variable=true;
    };
    let func =new iskilip_callback(test);



    beforeEach(()=>{
      messageBus.subscribe(message.ShowFormNewImage,func);
      variable = false;
    });

  it('should create a menu', () => {
    let item =new menuItemNewImage(this.projectService);
    expect(item).toBeTruthy();
  });

  it('should click create a form', (done) => {


    let item =new menuItemNewImage(this.projectService);
    item.onClick();
    setTimeout(
      ()=>{
        while(!variable);
        done();
      }
    );
  });







});

