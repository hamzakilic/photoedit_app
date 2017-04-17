import { Injectable } from '@angular/core';
import { proj} from './project/proj';

@Injectable()
export class ProjectService {
  private project: proj;
  constructor() {
    this.createProject('default');
  }

  public get currentProject(): proj{
      return this.project;
  }
  public createProject(name?: string){
    if(this.project)
      this.project.dispose();
      this.project = new proj(name);
  }



}
