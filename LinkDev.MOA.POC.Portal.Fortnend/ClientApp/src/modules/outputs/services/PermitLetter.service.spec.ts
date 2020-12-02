/* tslint:disable:no-unused-variable */

import { TestBed, async, inject } from '@angular/core/testing';
import { PermitLetterService } from './PermitLetter.service';

describe('Service: PermitLetter', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [PermitLetterService]
    });
  });

  it('should ...', inject([PermitLetterService], (service: PermitLetterService) => {
    expect(service).toBeTruthy();
  }));
});
