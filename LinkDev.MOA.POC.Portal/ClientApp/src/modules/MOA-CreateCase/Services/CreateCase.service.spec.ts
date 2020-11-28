/* tslint:disable:no-unused-variable */

import { TestBed, async, inject } from '@angular/core/testing';
import { CreateCaseService } from './CreateCase.service';

describe('Service: CreateCase', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [CreateCaseService]
    });
  });

  it('should ...', inject([CreateCaseService], (service: CreateCaseService) => {
    expect(service).toBeTruthy();
  }));
});
