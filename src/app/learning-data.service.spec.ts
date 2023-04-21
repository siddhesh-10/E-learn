import { TestBed } from '@angular/core/testing';

import { LearningDataService } from './learning-data.service';

describe('LearningDataService', () => {
  let service: LearningDataService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(LearningDataService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
