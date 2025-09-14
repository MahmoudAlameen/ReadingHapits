import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-exam-card',
  templateUrl: './exam-card.component.html',
  styleUrls: ['./exam-card.component.scss']
})
export class ExamCardComponent {
  @Input() exam!: { title: string; meta: string; topScorer?: { name: string; score: string }; buttonText: string };

  constructor() { }

  // Method to handle the exam button click, e.g., to start or continue the exam
  onButtonClick(): void {
    console.log(`Exam "${this.exam.title}" button was clicked.`);
    // Add logic to start/continue the exam, possibly by calling a service.
  }
}