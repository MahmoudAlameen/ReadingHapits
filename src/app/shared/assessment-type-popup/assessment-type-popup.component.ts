// assessment-popup.component.ts
import { Component, Input, Output, EventEmitter, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Subject } from 'rxjs';
import { IInternationalAssessmentTypeCard } from 'src/app/DTOs/international-assessment-type-card.interface';
import { AssessmentType, InternationalAssessmentSubject } from 'src/app/enums/assessments.enums';
@Component({
  selector: 'app-assessment-type-popup',
  templateUrl: './assessment-type-popup.component.html',
  styleUrls: ['./assessment-type-popup.component.scss']
})
export class AssessmentTypePopupComponent implements OnInit {
@Input() AssessmentData!: IInternationalAssessmentTypeCard;
  @Output() close = new EventEmitter<void>();

  constructor(private router: Router) {}

  closePopup() {
    this.close.emit();
  }
  ngOnInit(): void {
    
  }

  navigateToAssessment(assessmentType: AssessmentType, subjectType:InternationalAssessmentSubject ) {
    if (this.AssessmentData) {
      // Redirecting and passing assessment type and material as query params
      this.router.navigate(['assessments/list'], {
        queryParams: { 
          selectedAssessmentType: assessmentType, 
          selectedAssessmentSubjectType: subjectType,

        }
      });
      this.closePopup();
    }
  }

}
