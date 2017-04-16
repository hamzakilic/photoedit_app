import { WorkSpace } from './workSpace';

export class Proj {
  private name: string;
  private workspaces: WorkSpace[];
  /**
   *
   */
  constructor(name?: string) {
    if(name)
    this.name = name;
    else this.name = "project";
    this.workspaces = [];

  }

  public get Name(): string{
    return this.name;
  }

  public get WorkSpaces(): WorkSpace[]{
    return this.workspaces;
  }

  public Dispose(): void {
    this.name = undefined;
    this.workspaces.forEach((item)=>item.Dispose());
    this.workspaces= [];
  }
}
