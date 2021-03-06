import { Workspace } from './workSpace';

export class Project {
  private _name: string;
  private _workspaces: Workspace[];
  /**
   *
   */
  constructor(name?: string) {
    if(name)
    this._name = name;
    else this._name = "project";
    this._workspaces = [];

  }

  public get name(): string{
    return this._name;
  }

  public get workspaces(): Workspace[]{
    return this._workspaces;
  }

  public dispose(): void {
    this._name = undefined;
    this._workspaces.forEach((item)=>item.dispose());
    this._workspaces= [];
  }
  public addWorkspace(ws:Workspace){
    this._workspaces.push(ws);
   
    this.activeWorkspace=ws;
  }
  public set activeWorkspace(ws:Workspace){
    this._workspaces.forEach((item)=>{
      item.isActive=false;
      if(item === ws)
      item.isActive = true;
    });

  }

  public get activeWorkspace(): Workspace{
    let index= this._workspaces.findIndex((item)=>{
      return item.isActive;
    });
    if(index==-1)
      return undefined;
      return this._workspaces[index];
  }

   public removeWorkspace(ws:Workspace){
    let index= this._workspaces.findIndex((item)=>{
      return item === ws;
    });

    if(index>-1){
      let ws=this.workspaces[index];
      this._workspaces.splice(index,1);
       ws.dispose();
    }

  }
}
