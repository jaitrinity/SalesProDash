import { TestBed } from '@angular/core/testing';

import { EmpDetailsProviderService } from './emp-details-provider.service';

describe('EmpDetailsProviderService', () => {
  let service: EmpDetailsProviderService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(EmpDetailsProviderService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
