/* tslint:disable:no-unused-variable */

import { TestBed, async, inject } from '@angular/core/testing';
import { MOAService } from './MOA-Service.service';

describe('Service: MOAService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [MOAService]
    });
  });

  it('should ...', inject([MOAService], (service: MOAService) => {
    expect(service).toBeTruthy();
  }));
});
