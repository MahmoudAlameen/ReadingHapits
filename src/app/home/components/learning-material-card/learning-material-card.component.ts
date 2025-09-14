import { Component, OnInit, Input, destroyPlatform } from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import { ILearningSubjectCard } from 'src/app/DTOs/ILearningSubjectCard';

@Component({
  selector: 'app-learning-material-card',
  templateUrl: './learning-material-card.component.html',
  styleUrls: ['./learning-material-card.component.scss']
})
export class LearningMaterialCardComponent implements OnInit {
@Input() material!: ILearningSubjectCard ; // Input property to receive material data

onViewDetails(learningSubjectId: string): void {
// Implement view details logic
console.log('View details for:', this.material?.title);
this.router.navigate(['/learning-subject', learningSubjectId]);
}

onViewExams(): void {
// Implement view exams logic
console.log('View exams for:', this.material?.title);
}
  constructor(private router : Router) { }

  ngOnInit(): void {

  }

}
