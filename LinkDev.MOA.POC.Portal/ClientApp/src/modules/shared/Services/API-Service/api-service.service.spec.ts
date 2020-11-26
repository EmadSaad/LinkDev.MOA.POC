/* tslint:disable:no-unused-variable */

import { TestBed, async, inject } from '@angular/core/testing';
import { APIService } from 'src/modules/shared/Services/API-Service/api-service.service';

describe('Service: ApiService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [APIService]
    });
  });

  it('should ...', inject([APIService], (service: APIService) => {
    expect(service).toBeTruthy();
  }));
});
