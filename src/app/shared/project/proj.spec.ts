import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { callback as iskilip_callback } from 'iskilip/core/callback';
import { message } from '../../lib/message'
import { messageBus } from '../../lib/messageBus';


import { proj } from './proj';
import { workspace} from './workSpace';
import { layer } from './layer';

describe('project', () => {


  it('should create', () => {
    let project = new proj();
    expect(project).toBeTruthy();
  });
  it('should set name correctly', () => {
    let project = new proj('hamza');
    expect(project.name).toEqual('hamza');

  });
   it('should default name correctly', () => {
    let project = new proj();
    expect(project.name).toEqual('project');

  });

  it('should dispose correctly', () => {
    let project = new proj();
    project.dispose();


  });

  it('should workspace count  must be zero', () => {
    let project = new proj();
    expect(project.workspaces.length).toEqual(0);


  });

   it('should add a workspace', () => {
    let project = new proj();
    let ws = new workspace('hamza');
    project.addWorkspace(ws);
    expect(project.workspaces.length).toEqual(1);


  });

});
