import { Injectable } from '@angular/core';
import { Proj} from './project/proj';

@Injectable()
export class ProjectService {
  private project: Proj;
  constructor() {
    this.createProject('default');
  }

  public get currentProject(): Proj{
      return this.project;
  }
  public createProject(name?: string){
    if(this.project)
      this.project.dispose();
      this.project = new Proj(name);
  }



}
