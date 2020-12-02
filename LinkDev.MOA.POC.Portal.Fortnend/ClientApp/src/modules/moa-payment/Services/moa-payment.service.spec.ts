import { TestBed } from '@angular/core/testing';

import { MoaPaymentService } from './moa-payment.service';

describe('MoaPaymentService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: MoaPaymentService = TestBed.get(MoaPaymentService);
    expect(service).toBeTruthy();
  });
});
