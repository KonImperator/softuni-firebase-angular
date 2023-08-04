import { TestBed } from '@angular/core/testing';

import { JikanDataService } from './jikan-data.service';

describe('JikanDataService', () => {
  let service: JikanDataService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(JikanDataService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
