import { Component, inject, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';
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
    constructor(private router: Router)
    {
      
    }
    
    ngOnInit(): void {
      
    }

    /**
     * Replaces the 'computed' signal with a property getter.
     * Standard Angular change detection will automatically run this getter
     * whenever the component state might change.
     */
    get buttonText(): string {
        const status = this.assessment.status;
        if (status === AssessmentStatus.Published) return 'TakeExam';
        if (status === AssessmentStatus.New) return 'Coming Soon';
        if (status === AssessmentStatus.Finished) return 'View Results';
        return 'Details';
    }

    /**
     * Handles the exam button click, simulating navigation based on status.
     * Now references the property directly.
     */
    onButtonClick(): void {
        const assessment = this.assessment;
        const pathBase = 'assessments';

        if (assessment.status === AssessmentStatus.Published) {
          this.router.navigate(['assessments/run-assessment/', assessment.id])
            // ** Action: Start/Continue Exam **
            // In a real Angular application, this would be: this.router.navigate([pathBase, 'run-assessment', assessment.id]);
            
        } else if (assessment.status === AssessmentStatus.Finished) {
            // ** Action: View Results **
            this.router.navigate(['assessments/view-result', assessment.id])

            // In a real Angular application, this would be: this.router.navigate([pathBase, 'results', assessment.id]);
        }
    }
    
    /**
     * Demo method to cycle the card status to show all states.
     * This now uses property assignment and the spread operator to trigger change detection.
     */

    get isButtonDisabled(): boolean {
        return this.assessment.status === AssessmentStatus.New;
    }
}
