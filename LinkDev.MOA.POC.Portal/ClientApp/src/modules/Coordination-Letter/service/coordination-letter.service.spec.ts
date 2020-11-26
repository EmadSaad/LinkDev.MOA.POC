/* tslint:disable:no-unused-variable */

import { TestBed, async, inject } from '@angular/core/testing';
import { CoordinationLetterService } from './coordination-letter.service';

describe('Service: CoordinationLetter', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [CoordinationLetterService]
    });
  });

  it('should ...', inject([CoordinationLetterService], (service: CoordinationLetterService) => {
    expect(service).toBeTruthy();
  }));
});
