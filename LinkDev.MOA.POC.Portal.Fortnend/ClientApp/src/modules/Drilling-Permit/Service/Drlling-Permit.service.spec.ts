/* tslint:disable:no-unused-variable */

import { TestBed, async, inject } from '@angular/core/testing';
import { DrillingPermitService } from './Drilling-Permit.service';

describe('Service: DrillingPermit', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [DrillingPermitService]
    });
  });

  it('should ...', inject([DrillingPermitService], (service: DrillingPermitService) => {
    expect(service).toBeTruthy();
  }));
});
