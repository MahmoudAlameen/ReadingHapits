import { TestBed } from '@angular/core/testing';

import { InternationalAssessmentsService } from './international-assessments.service';

describe('InternationalAssessmentsService', () => {
  let service: InternationalAssessmentsService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(InternationalAssessmentsService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
