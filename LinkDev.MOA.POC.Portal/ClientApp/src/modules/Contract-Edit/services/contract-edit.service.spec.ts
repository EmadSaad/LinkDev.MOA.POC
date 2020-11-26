import { TestBed } from '@angular/core/testing';

import { ContractEditService } from './contract-edit.service';

describe('ContractEditService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: ContractEditService = TestBed.get(ContractEditService);
    expect(service).toBeTruthy();
  });
});
