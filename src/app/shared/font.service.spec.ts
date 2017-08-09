import { TestBed, inject } from '@angular/core/testing';

import { FontService } from './font.service';

describe('FontService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [FontService]
    });
  });

  it('should be created', inject([FontService], (service: FontService) => {
    expect(service).toBeTruthy();
  }));
});
