/* tslint:disable:no-unused-variable */

import { TestBed, async, inject } from '@angular/core/testing';
import { ConstructionReportRequestService } from './Construction-Report-Request.service';

describe('Service: ConstructionReportRequest', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [ConstructionReportRequestService]
    });
  });

  it('should ...', inject([ConstructionReportRequestService], (service: ConstructionReportRequestService) => {
    expect(service).toBeTruthy();
  }));
});
