import { TestBed } from '@angular/core/testing';

import { AcuService } from './acu.service';

describe('AcuService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: AcuService = TestBed.get(AcuService);
    expect(service).toBeTruthy();
  });
});
