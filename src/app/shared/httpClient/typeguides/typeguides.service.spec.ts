import { TestBed } from '@angular/core/testing';

import { TypeguidesService } from './typeguides.service';

describe('ProfileService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: TypeguidesService = TestBed.get(TypeguidesService);
    expect(service).toBeTruthy();
  });
});
