/* tslint:disable:no-unused-variable */

import { TestBed, async, inject } from '@angular/core/testing';
import { ConfigServiceService } from './config-service.service';

describe('Service: ConfigService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [ConfigServiceService]
    });
  });

  it('should ...', inject([ConfigServiceService], (service: ConfigServiceService) => {
    expect(service).toBeTruthy();
  }));
});
