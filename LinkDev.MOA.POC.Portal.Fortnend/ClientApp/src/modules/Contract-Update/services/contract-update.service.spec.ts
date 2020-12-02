import { TestBed } from '@angular/core/testing';

import { ContractUpdateService } from './contract-update.service';

describe('ContractUpdateService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: ContractUpdateService = TestBed.get(ContractUpdateService);
    expect(service).toBeTruthy();
  });
});
