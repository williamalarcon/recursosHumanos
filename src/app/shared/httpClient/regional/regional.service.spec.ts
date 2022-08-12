import { TestBed } from '@angular/core/testing';

import { RegionalService } from './regional.service';

describe('RegionalService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: RegionalService = TestBed.get(RegionalService);
    expect(service).toBeTruthy();
  });
});
