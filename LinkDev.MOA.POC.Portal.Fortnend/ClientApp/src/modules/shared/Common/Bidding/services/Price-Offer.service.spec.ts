/* tslint:disable:no-unused-variable */

import { TestBed, async, inject } from '@angular/core/testing';
import { PriceOfferService } from './Price-Offer.service';

describe('Service: PriceOffer', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [PriceOfferService]
    });
  });

  it('should ...', inject([PriceOfferService], (service: PriceOfferService) => {
    expect(service).toBeTruthy();
  }));
});
