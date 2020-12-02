/* tslint:disable:no-unused-variable */

import { TestBed, async, inject } from '@angular/core/testing';
import { TicketDetailsService } from './ticket-details.service';

describe('Service: TicketManagemnt', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [TicketDetailsService]
    });
  });

  it('should ...', inject([TicketDetailsService], (service: TicketDetailsService) => {
    expect(service).toBeTruthy();
  }));
});
