import { Component, OnInit, Input, destroyPlatform } from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import { TranslateService } from '@ngx-translate/core';
import { APIService } from 'src/app/core/API.Service';
import { ILearningSubjectCard } from 'src/app/DTOs/ILearningSubjectCard';

@Component({
  selector: 'app-learning-material-card',
  templateUrl: './learning-material-card.component.html',
  styleUrls: ['./learning-material-card.component.scss']
})
export class LearningMaterialCardComponent implements OnInit {
@Input() material!: ILearningSubjectCard ; // Input property to receive material data
displayedName: string = '';
displayedDescription: string = '';

onViewDetails(learningSubjectId: string): void {
// Implement view details logic
this.router.navigate(['/learning-subject', learningSubjectId]);
}

onViewExams(): void {
// Implement view exams logic
 this.router.navigate(['/assessments/list'], { queryParams: { selectedSubject: this.material?.id } });
}
  constructor(private router : Router, private translateService: TranslateService, private API: APIService) { }

  ngOnInit(): void {
    this.displayedName = this.translateService.currentLang === 'ar'  ? this.material.nameAr : this.material.nameEn;
    this.displayedDescription = this.translateService.currentLang === 'ar' ? (this.material.descriptionAr || '') : (this.material.descriptionEn || '');
     this.material.coverUrl = this.material.coverUrl != null ?   this.API.base + "LearningSubjects/" + this.material.coverUrl
    :  "`assets/images/defaultLearningSubjectCoverImage/Learning_Material-Cards-card1-Cover_Section.png";
    console.log(this.material.coverUrl);

    this.material.assignedTeachersAvatars.forEach(teacher => 
    {
      teacher.avatarUrl = teacher.avatarUrl != null ?
        this.API.base + "Users" + teacher.avatarUrl : "assets/images/defaultCardTeachers/defaultUserImage/Card1-Teachers-Teacher2.png"
    }
    )
  }

}
