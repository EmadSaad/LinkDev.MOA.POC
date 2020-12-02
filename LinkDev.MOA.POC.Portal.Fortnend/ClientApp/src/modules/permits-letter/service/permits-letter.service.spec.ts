/* tslint:disable:no-unused-variable */

import { TestBed, async, inject } from '@angular/core/testing';
import { PermitsLetterService } from './permits-letter.service';

describe('Service: PermitsLetter', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [PermitsLetterService]
    });
  });

  it('should ...', inject([PermitsLetterService], (service: PermitsLetterService) => {
    expect(service).toBeTruthy();
  }));
});
