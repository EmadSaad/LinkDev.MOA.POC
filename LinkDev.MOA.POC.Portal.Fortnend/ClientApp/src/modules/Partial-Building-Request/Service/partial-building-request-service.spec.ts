import { TestBed } from '@angular/core/testing';

import { PartialBuildingRequestService } from './partial-building-request-service';

describe('PartialBuildingRequestServiceService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: PartialBuildingRequestService = TestBed.get(PartialBuildingRequestService);
    expect(service).toBeTruthy();
  });
});
