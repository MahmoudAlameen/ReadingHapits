import { Component, OnInit, Input } from '@angular/core';
import { Router } from '@angular/router';
import { IInternationalAssessmentTypeCard } from 'src/app/DTOs/international-assessment-type-card.interface';

@Component({
  selector: 'app-international-assessment-card',
  templateUrl: './international-assessment-card.component.html',
  styleUrls: ['./international-assessment-card.component.scss']
})
export class InternationalAssessmentCardComponent implements OnInit {

  @Input() exam!: IInternationalAssessmentTypeCard;

  constructor(private router: Router) {}

  ngOnInit(): void {
  }

  onStartNow(): void {
    this.router.navigate(['/assessments/list'], { queryParams: { selectedAssessmentType: this.exam.title } });
  }
}