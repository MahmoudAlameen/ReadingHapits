import { TestBed } from '@angular/core/testing';

import { LearningSubjectServiceService } from './learning-subject.service';

describe('LearningSubjectServiceService', () => {
  let service: LearningSubjectServiceService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(LearningSubjectServiceService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
