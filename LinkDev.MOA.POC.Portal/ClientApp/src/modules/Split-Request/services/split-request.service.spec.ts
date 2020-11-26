import { TestBed } from '@angular/core/testing';

import { SplitRequestService } from './split-request.service';

describe('SplitRequestService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: SplitRequestService = TestBed.get(SplitRequestService);
    expect(service).toBeTruthy();
  });
});
