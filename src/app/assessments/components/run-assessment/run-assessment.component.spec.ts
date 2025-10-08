import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RunAssessmentComponent } from './run-assessment.component';

describe('RunAssessmentComponent', () => {
  let component: RunAssessmentComponent;
  let fixture: ComponentFixture<RunAssessmentComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ RunAssessmentComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(RunAssessmentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
