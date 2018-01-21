import { TestBed, inject } from '@angular/core/testing';

import { ShapesService } from './shapes.service';

describe('ShapesService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [ShapesService]
    });
  });

  it('should be created', inject([ShapesService], (service: ShapesService) => {
    expect(service).toBeTruthy();
  }));
});
