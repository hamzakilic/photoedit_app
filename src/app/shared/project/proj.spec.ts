import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { callback as iskilip_callback } from 'iskilip/core/callback';
import { message } from '../../lib/message'
import { messageBus } from '../../lib/messageBus';


import { Proj } from './proj';
import { Layer } from './layer';

describe('project', () => {


  it('should create', () => {
    let project = new Proj();
    expect(project).toBeTruthy();
  });
  it('should set name correctly', () => {
    let project = new Proj('hamza');
    expect(project.Name).toEqual('hamza');

  });
   it('should default name correctly', () => {
    let project = new Proj();
    expect(project.Name).toEqual('project');

  });

  it('should dispose correctly', () => {
    let project = new Proj();
    project.Dispose();


  });

  it('should workspace count  must be zero', () => {
    let project = new Proj();
    expect(project.WorkSpaces.length).toEqual(0);


  });

});
