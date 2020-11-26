import { TestBed } from '@angular/core/testing';

import { OldCrAndContractService } from './old-cr-and-contract.service';

describe('OldCrAndContractService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: OldCrAndContractService = TestBed.get(OldCrAndContractService);
    expect(service).toBeTruthy();
  });
});
