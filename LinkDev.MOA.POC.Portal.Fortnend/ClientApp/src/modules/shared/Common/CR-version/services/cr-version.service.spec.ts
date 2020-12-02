import { TestBed } from '@angular/core/testing';

import { CrVersionService } from './cr-version.service';

describe('CrVersionService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: CrVersionService = TestBed.get(CrVersionService);
    expect(service).toBeTruthy();
  });
});
