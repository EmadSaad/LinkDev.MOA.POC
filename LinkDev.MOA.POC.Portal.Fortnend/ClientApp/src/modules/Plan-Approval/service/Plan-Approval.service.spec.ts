/* tslint:disable:no-unused-variable */

import { TestBed, async, inject } from '@angular/core/testing';
import { PlanApprovalService } from './Plan-Approval.service';

describe('Service: PlanApproval', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [PlanApprovalService]
    });
  });

  it('should ...', inject([PlanApprovalService], (service: PlanApprovalService) => {
    expect(service).toBeTruthy();
  }));
});
