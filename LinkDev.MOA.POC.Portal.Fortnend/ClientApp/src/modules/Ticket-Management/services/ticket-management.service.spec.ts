/* tslint:disable:no-unused-variable */

import { TestBed, async, inject } from '@angular/core/testing';
import { TicketManagementService } from './ticket-management.service';

describe('Service: TicketManagemnt', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [TicketManagementService]
    });
  });

  it('should ...', inject([TicketManagementService], (service: TicketManagementService) => {
    expect(service).toBeTruthy();
  }));
});
