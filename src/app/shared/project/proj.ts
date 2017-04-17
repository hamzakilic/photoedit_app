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
  public createWorkspace(name: string){
    let ws = new workspace(name);
    this._workspaces.push(ws);
    return ws;
  }
}
