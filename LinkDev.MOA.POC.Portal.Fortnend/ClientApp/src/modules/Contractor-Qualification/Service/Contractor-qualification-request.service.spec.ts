/* tslint:disable:no-unused-variable */

import { TestBed, async, inject } from '@angular/core/testing';
import { ContractorQualificationRequestService } from './Contractor-qualification-request.service';

describe('Service: ContractorQualificationServices', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [ContractorQualificationRequestService]
    });
  });

  it('should ...', inject([ContractorQualificationRequestService], (service: ContractorQualificationRequestService) => {
    expect(service).toBeTruthy();
  }));
});
