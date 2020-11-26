/* tslint:disable:no-unused-variable */

import { TestBed, async, inject } from '@angular/core/testing';
import { QualificationService } from './Qualification.service';


describe('Service: Qualification', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [QualificationService]
    });
  });

  it('should ...', inject([QualificationService], (service: QualificationService) => {
    expect(service).toBeTruthy();
  }));
});
