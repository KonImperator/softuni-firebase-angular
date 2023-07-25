import { TestBed } from '@angular/core/testing';

import { JikanDataServiceService } from './jikan-data-service.service';

describe('JikanDataServiceService', () => {
  let service: JikanDataServiceService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(JikanDataServiceService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
