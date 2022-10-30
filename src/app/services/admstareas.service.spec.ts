import { TestBed } from '@angular/core/testing';

import { AdmstareasService } from './admstareas.service';

describe('AdmstareasService', () => {
  let service: AdmstareasService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(AdmstareasService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
