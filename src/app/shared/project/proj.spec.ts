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
    let ws = new workspace(1,1,'hamza');
    project.addWorkspace(ws);
    expect(project.workspaces.length).toEqual(1);


  });

   it('should active a workspace only', () => {
    let project = new proj();
    let ws = new workspace(1,1,'hamza');
    let ws2 = new workspace(1,1,'hamza');
    let ws3 = new workspace(1,1,'hamza');
    project.addWorkspace(ws);
    project.addWorkspace(ws2);
    project.addWorkspace(ws3);
    expect(project.workspaces.length).toEqual(3);
    project.setActiveWorkspace(ws2);
    expect(ws.isActive).not.toBe(true);
    expect(ws2.isActive).toBe(true);
    expect(ws3.isActive).not.toBe(true);


  });

   it('should get active workspace', () => {
    let project = new proj();
    let ws = new workspace(1,1,'hamza');
    let ws2 = new workspace(1,1,'hamza');
    let ws3 = new workspace(1,1,'hamza');
    project.addWorkspace(ws);
    project.addWorkspace(ws2);
    project.addWorkspace(ws3);
    expect(project.workspaces.length).toEqual(3);
    project.setActiveWorkspace(ws2);
    expect(project.activeWorkspace).toBeDefined();


  });

   it('should get active workspace must return undefined', () => {
    let project = new proj();

    expect(project.activeWorkspace).toBeUndefined();


  });

   it('should remove aworkspace', () => {
    let project = new proj();
    let ws = new workspace(1,1,'hamza');
    let ws2 = new workspace(1,1,'hamza');
    let ws3 = new workspace(1,1,'hamza');
    project.addWorkspace(ws);
    project.addWorkspace(ws2);
    project.addWorkspace(ws3);
    expect(project.workspaces.length).toEqual(3);
    project.removeWorkspace(ws2);
    expect(project.workspaces.length).toEqual(2);


  });

});
