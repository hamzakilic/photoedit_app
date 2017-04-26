import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { Callback } from '../../lib/callback';
import { Message } from '../../lib/message'
import { MessageBus } from '../../lib/messageBus';


import { Proj } from './proj';
import { Workspace} from './workSpace';
import { Layer } from './layer';

describe('project', () => {


  it('should create', () => {
    let project = new Proj();
    expect(project).toBeTruthy();
  });
  it('should set name correctly', () => {
    let project = new Proj('hamza');
    expect(project.name).toEqual('hamza');

  });
   it('should default name correctly', () => {
    let project = new Proj();
    expect(project.name).toEqual('project');

  });

  it('should dispose correctly', () => {
    let project = new Proj();
    project.dispose();


  });

  it('should workspace count  must be zero', () => {
    let project = new Proj();
    expect(project.workspaces.length).toEqual(0);


  });

   it('should add a workspace', () => {
    let project = new Proj();
    let ws = new Workspace(1,1,'hamza');
    project.addWorkspace(ws);
    expect(project.workspaces.length).toEqual(1);


  });

   it('should active a workspace only', () => {
    let project = new Proj();
    let ws = new Workspace(1,1,'hamza');
    let ws2 = new Workspace(1,1,'hamza');
    let ws3 = new Workspace(1,1,'hamza');
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
    let project = new Proj();
    let ws = new Workspace(1,1,'hamza');
    let ws2 = new Workspace(1,1,'hamza');
    let ws3 = new Workspace(1,1,'hamza');
    project.addWorkspace(ws);
    project.addWorkspace(ws2);
    project.addWorkspace(ws3);
    expect(project.workspaces.length).toEqual(3);
    project.setActiveWorkspace(ws2);
    expect(project.activeWorkspace).toBeDefined();


  });

   it('should get active workspace must return undefined', () => {
    let project = new Proj();

    expect(project.activeWorkspace).toBeUndefined();


  });

   it('should remove aworkspace', () => {
    let project = new Proj();
    let ws = new Workspace(1,1,'hamza');
    let ws2 = new Workspace(1,1,'hamza');
    let ws3 = new Workspace(1,1,'hamza');
    project.addWorkspace(ws);
    project.addWorkspace(ws2);
    project.addWorkspace(ws3);
    expect(project.workspaces.length).toEqual(3);
    project.removeWorkspace(ws2);
    expect(project.workspaces.length).toEqual(2);


  });

});
