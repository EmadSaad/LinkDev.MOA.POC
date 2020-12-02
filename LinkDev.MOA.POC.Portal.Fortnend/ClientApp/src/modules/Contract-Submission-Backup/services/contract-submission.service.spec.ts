/* tslint:disable:no-unused-variable */

import { TestBed, async, inject } from '@angular/core/testing';
import { ContractSubmissionService } from './contract-submission.service';

describe('Service: ContractSubmission', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [ContractSubmissionService]
    });
  });

  it('should ...', inject([ContractSubmissionService], (service: ContractSubmissionService) => {
    expect(service).toBeTruthy();
  }));
});
