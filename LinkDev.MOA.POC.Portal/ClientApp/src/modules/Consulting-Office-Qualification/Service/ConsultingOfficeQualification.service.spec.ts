/* tslint:disable:no-unused-variable */

import { ConsultingOfficeQualificationService } from './ConsultingOfficeQualification.service';
import { TestBed, inject } from '@angular/core/testing';

describe('Service: ConsultingOfficeQualification', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [ConsultingOfficeQualificationService]
    });
  });

  it('should ...', inject([ConsultingOfficeQualificationService], (service: ConsultingOfficeQualificationService) => {
    expect(service).toBeTruthy();
  }));
});
