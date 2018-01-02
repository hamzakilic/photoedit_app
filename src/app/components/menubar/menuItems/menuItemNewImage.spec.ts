import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { Callback  } from '../../../lib/callback';

import { menuItemNewImage } from './menuItemNewImage';
import { Message} from '../../../lib/message';
import { MessageBus} from '../../../lib/messageBus';


class ProjectService {

}


describe('menuItemNewImage', () => {
  const projectService = new ProjectService();
 let variable = false;
    function test(){
      variable=true;
    };
    let func =Callback.from(test);



    beforeEach(()=>{
      MessageBus.subscribe(Message.ShowFormNewImage,func);
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

