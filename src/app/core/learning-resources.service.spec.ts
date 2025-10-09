import { TestBed } from '@angular/core/testing';

import { LearningResourcesService } from './learning-resources.service';

describe('LearningResourcesService', () => {
  let service: LearningResourcesService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(LearningResourcesService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
