import { TestBed } from '@angular/core/testing';
import { OperatingLicenseRequestService } from './operating-license-request-service';


describe('OperatingLicenseRequestServiceService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: OperatingLicenseRequestService = TestBed.get(OperatingLicenseRequestService);
    expect(service).toBeTruthy();
  });
});
