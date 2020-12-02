import { TestBed } from '@angular/core/testing';

import { FactoryInsideFactoryService } from './factory-inside-factory.service';

describe('FactoryInsideFactoryService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: FactoryInsideFactoryService = TestBed.get(FactoryInsideFactoryService);
    expect(service).toBeTruthy();
  });
});
