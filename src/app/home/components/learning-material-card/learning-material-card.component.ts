import { Component, OnInit, Input, destroyPlatform } from '@angular/core';
import { Router,} from '@angular/router';
import { TranslateService } from '@ngx-translate/core';
import { APIService } from 'src/app/core/API.Service';
import { UserService } from 'src/app/core/User.Service';
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
this.userService.studentGrade.subscribe(g =>
{
    var gradeId = this.userService.studentGrade.value?.id;

  this.router.navigate(['/learning-subject', learningSubjectId],
    {queryParams: {gradeId: gradeId}}
  );
}


)
}

onViewExams(): void {
  var gradeId = this.userService.studentGrade.value?.id;

     this.router.navigate(['/assessments/list'], { queryParams: { selectedSubject: this.material?.id, gradeId: gradeId } });
// Implement view exams logic
}
  constructor(
    private router : Router,
    private translateService: TranslateService,
    private API: APIService,
  private userService: UserService) { }

  ngOnInit(): void {
    this.displayedName = this.translateService.currentLang === 'ar'  ?
     this.material.nameAr : this.material.nameEn;
this.displayedDescription = this.translateService.currentLang === 'ar'
  ? this.truncateText(this.material.descriptionAr || '')
  : this.truncateText(this.material.descriptionEn || '');

this.material.coverUrl = this.material.coverUrl
  ? this.API.base + "LearningSubjects/" + this.material.coverUrl
  : "assets/images/defaultLearningSubjectCoverImage/Learning_Material-Cards-card1-Cover_Section.png";

    this.material.assignedTeachers.forEach(teacher => 
    {
      teacher.avatarUrl = teacher.avatarUrl ?
       teacher.avatarUrl :
        "assets/images/defaultCardTeachers/defaultUserImage/Card1-Teachers-Teacher2.png"
    }
    )
    this.userService.setUserGrade();
  }

  private truncateText(text: string, maxLength: number = 75): string {
  if (!text) return '';
  return text.length > maxLength ? text.substring(0, maxLength) + ' ...' : text;
}
}
