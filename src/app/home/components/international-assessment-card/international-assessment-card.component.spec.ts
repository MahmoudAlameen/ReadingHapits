import { ComponentFixture, TestBed } from '@angular/core/testing';

import { InternationalAssessmentCardComponent } from './international-assessment-card.component';

describe('InternationalAssessmentCardComponent', () => {
  let component: InternationalAssessmentCardComponent;
  let fixture: ComponentFixture<InternationalAssessmentCardComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ InternationalAssessmentCardComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(InternationalAssessmentCardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
