import { TestBed } from '@angular/core/testing';

import { BuildingLicenseRequestService } from './building-license-request.service';

describe('BuildingLicenseRequestService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: BuildingLicenseRequestService = TestBed.get(BuildingLicenseRequestService);
    expect(service).toBeTruthy();
  });
});
