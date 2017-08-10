import { TestBed, inject } from '@angular/core/testing';

import { ProjectService } from './project.service';

describe('projectService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [ProjectService]
    });
  });

  it('should create success', inject([ProjectService], (service: ProjectService) => {
    expect(service).toBeTruthy();
  }));
  it('should project must create a default project', inject([ProjectService], (service: ProjectService) => {
    expect(service.currentProject).toBeDefined();
  }));
});
