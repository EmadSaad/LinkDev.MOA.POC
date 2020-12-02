/* tslint:disable:no-unused-variable */

import { TestBed, async, inject } from '@angular/core/testing';
import { BiddingService } from './Bidding.service';

describe('Service: Bidding', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [BiddingService]
    });
  });

  it('should ...', inject([BiddingService], (service: BiddingService) => {
    expect(service).toBeTruthy();
  }));
});
