import { Component, inject, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AssessmentsService } from 'src/app/core/assessments.service';
import { IAssessmentCard } from 'src/app/DTOs/assessments.interfaces';
import { ISubjectAssessmentCard } from 'src/app/DTOs/ILearningSubjectDetails';
import { AssessmentStatus } from 'src/app/enums/assessments.enums';

@Component({
  selector: 'app-exam-card',
  templateUrl: './exam-card.component.html',
  styleUrls: ['./exam-card.component.scss']
})
export class ExamCardComponent implements OnInit {
  
  // Expose the mock status object
  @Input() assessment! : ISubjectAssessmentCard
    readonly AssessmentStatus = AssessmentStatus;
    cardLabel: string = '';
    butttonText: string = '';
    redirectionURL: string = '';

    constructor(private router: Router, private assessmentService: AssessmentsService)
    {
      
    }
    ngOnInit(): void {
      var buttonData = this.assessmentService.calculateExamCardButton(this.assessment.status, 
        this.assessment.isStartedByStudent,this.assessment.isFinishedByStudent)

        this.butttonText = buttonData.label;
        this.redirectionURL = buttonData.redirectionURL;

        this.cardLabel = this.assessmentService.calculateExamCardLabel(this.assessment.status, 
          this.assessment.isStartedByStudent, this.assessment.isFinishedByStudent)
    }

    /**
     * Replaces the 'computed' signal with a property getter.
     * Standard Angular change detection will automatically run this getter
     * whenever the component state might change.
     
    get buttonText(): string {
        const status = this.assessment.status;
        if (status === AssessmentStatus.Published && !this.assessment.isStartedByStudent) return 'TakeExam';
        if(status == AssessmentStatus.Published && this.assessment.isStartedByStudent) return "Continue"
        if (status === AssessmentStatus.New) return 'Coming Soon';
        if (status === AssessmentStatus.Finished || this.assessment.isFinishedByStudent) return 'View Results';
        return 'Details';
    }
*/

    /**
     * Handles the exam button click, simulating navigation based on status.
     * Now references the property directly.
     */
    onButtonClick(): void {
          this.router.navigate([this.redirectionURL, this.assessment.id])
        }
    
    /**
     * Demo method to cycle the card status to show all states.
     * This now uses property assignment and the spread operator to trigger change detection.
     */

    get isButtonDisabled(): boolean {
        return this.assessment.status === AssessmentStatus.New;
    }
}
