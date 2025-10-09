import { Component, Input } from '@angular/core';
import { ISubjectAssessmentCard } from 'src/app/DTOs/ILearningSubjectDetails';
import { AssessmentStatus } from 'src/app/enums/assessments.enums';

@Component({
  selector: 'app-exam-card',
  templateUrl: './exam-card.component.html',
  styleUrls: ['./exam-card.component.scss']
})
export class ExamCardComponent {
 // @Input() exam!: { title: string; meta: string; topScorer?: { name: string; score: string }; buttonText: string };
  
  @Input() assessment! : ISubjectAssessmentCard;
 buttonText : string = this.assessment.status == AssessmentStatus.Published ? "TakeExam" :
 this.assessment.status == AssessmentStatus.Finished ? "Finished" : "Coming Soon";
  constructor() { }

  // Method to handle the exam button click, e.g., to start or continue the exam
  onButtonClick(): void {
    // Add logic to start/continue the exam, possibly by calling a service.
  }
}