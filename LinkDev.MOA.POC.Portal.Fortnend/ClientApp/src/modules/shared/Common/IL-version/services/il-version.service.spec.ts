import { TestBed } from '@angular/core/testing';

import { IlVersionService } from './il-version.service';

describe('IlVersionService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: IlVersionService = TestBed.get(IlVersionService);
    expect(service).toBeTruthy();
  });
});
