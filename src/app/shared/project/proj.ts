import { workspace } from './workSpace';

export class proj {
  private _name: string;
  private _workspaces: workspace[];
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

  public get workspaces(): workspace[]{
    return this._workspaces;
  }

  public dispose(): void {
    this._name = undefined;
    this._workspaces.forEach((item)=>item.dispose());
    this._workspaces= [];
  }
  public addWorkspace(ws:workspace){
    this._workspaces.push(ws);
    if(this._workspaces.length==1)
        ws.isActive=true;
    return ws;
  }
  public setActiveWorkspace(ws:workspace){
    this._workspaces.forEach((item)=>{
      item.isActive=false;
      if(item === ws)
      item.isActive = true;
    });

  }

  public get activeWorkspace(): workspace{
    let index= this._workspaces.findIndex((item)=>{
      return item.isActive;
    });
    if(index==-1)
      return undefined;
      return this._workspaces[index];
  }

   public removeWorkspace(ws:workspace){
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
