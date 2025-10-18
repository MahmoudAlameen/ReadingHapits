import { TestBed } from '@angular/core/testing';

import { AssessmentOrchestratorService } from './assessment-orchestrator.service';

describe('AssessmentOrchestratorService', () => {
  let service: AssessmentOrchestratorService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(AssessmentOrchestratorService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
