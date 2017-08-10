import { Injectable } from '@angular/core';

@Injectable()
export class AppService {
  public busyPromise: Promise<any>;
  constructor() {
    this.busyPromise = undefined;
   }

}
