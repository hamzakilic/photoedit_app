import { Injectable } from '@angular/core';
import { Project} from '../models/photoedit/project';

@Injectable()
export class ProjectService {
  private project: Project;
  constructor() {
    this.createProject('default');
  }

  public get currentProject(): Project{

      return this.project;
  }
  public createProject(name?: string){
    if(this.project)
      this.project.dispose();
      this.project = new Project(name);
  }



}
