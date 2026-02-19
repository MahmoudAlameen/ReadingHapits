import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { Router } from '@angular/router';
import { IInternationalAssessmentTypeCard } from 'src/app/DTOs/international-assessment-type-card.interface';

@Component({
  selector: 'app-international-assessment-card',
  templateUrl: './international-assessment-card.component.html',
  styleUrls: ['./international-assessment-card.component.scss']
})
export class InternationalAssessmentCardComponent implements OnInit {

  @Input() exam!: IInternationalAssessmentTypeCard;
  @Output() startNow  = new EventEmitter<IInternationalAssessmentTypeCard>();


  constructor(private router: Router) {}

  ngOnInit(): void {
        this.exam.subjects = this.exam.subjects.map(subject=>{ 
      subject.coverUrl = `assets/images/InternationalAssessmentSubjectCards/${subject.coverUrl}`;
      return subject;
    });
  }

  onStartNow(): void {
    this.openAssessment()
   // this.router.navigate(['/assessments/list'], { queryParams: { selectedAssessmentType: this.exam.title } });
  }
    openAssessment() {
    this.startNow.emit(this.exam);
  }
}