import { Component, OnInit, Input, destroyPlatform } from '@angular/core';
import { Router,} from '@angular/router';
import { TranslateService } from '@ngx-translate/core';
import { Subscription } from 'rxjs';
import { AlertMessage } from 'src/app/classes/AlertMessage';
import { APIService } from 'src/app/core/API.Service';
import { AssessmentsService } from 'src/app/core/assessments.service';
import { CustomAlertService } from 'src/app/core/custom-alert.service';
import { LearningSubjectService } from 'src/app/core/learning-subject.service';
import { UserService } from 'src/app/core/User.Service';
import { ILearningSubjectCard } from 'src/app/DTOs/ILearningSubjectCard';
import { IIdWithName } from 'src/app/DTOs/shared.interfaces';
import { AssessmentType } from 'src/app/enums/assessments.enums';

@Component({
  selector: 'app-learning-material-card',
  templateUrl: './learning-material-card.component.html',
  styleUrls: ['./learning-material-card.component.scss']
})
export class LearningMaterialCardComponent implements OnInit {
@Input() material!: ILearningSubjectCard ; // Input property to receive material data
displayedName: string = '';
displayedDescription: string = '';


// semester popup properties
showSelectionPopup = false;
  
  // Selection Model
selection = {
    semester: 3,
    academicYear: '2025 - 2024'
  };
  // Mock data for dropdowns (Ideally these come from a service/constant)
// Define your semesters using translation keys
semesters = [
  { id: 1, nameKey: 'SEMESTERS.FIRST' },
  { id: 2, nameKey: 'SEMESTERS.SECOND' },
  { id: 3, nameKey: 'SEMESTERS.THIRD' }
];

// If you prefer to keep the function approach for a specific reason:
get translatedSemesters() {
  return this.semesters.map(s => ({
    id: s.id,
    name: this.translateService.instant(s.nameKey)
  }));
}
  academicYears = [
  '2026 - 2025',
  '2025 - 2024',
  '2024 - 2023', 
  '2023 - 2022',
  '2022 - 2021',
  '2021 - 2020',
  '2020 - 2019',
  '2019 - 2018'
];
activeSemesterId: number | null = null; // To track which one to enable
selectedGradeId: string = '';
  grades!: IIdWithName[];
  alertMessage: AlertMessage = new AlertMessage();
  private subscriptions: Subscription[] = [];

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
  const selectedYearOnly = this.selection.academicYear.split(' - ')[0];
  this.router.navigate(['/assessments/list'], {
    queryParams: {
      selectedSubject: this.material?.id,
      gradeId: this.selectedGradeId,
      selectedAssessmentType: AssessmentType.ItqanTraining,
      semester: this.selection.semester,
      academicYear: selectedYearOnly // This will now send "2025"
    }
  });
// Implement view exams logic
}
  constructor(
    private router : Router,
    private translateService: TranslateService,
    private API: APIService,
    private userService: UserService,
    private assessmentsService: AssessmentsService,
    private learningSubjectService: LearningSubjectService,
    private customAlert: CustomAlertService,
    
) { }

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
       this.API.base + "Users/" + teacher.avatarUrl :
        "assets/images/defaultCardTeachers/defaultUserImage/Card1-Teachers-Teacher2.png"
    }
    )
    this.userService.setUserGrade();
    this.getGrades();
    // semester popup logic
    // Fetch active semester from backend
this.assessmentsService.getActiveSemester().subscribe(data => {
    // 1. Set the initial selection values
    this.selection.semester = data.currentSemester;
    this.selection.academicYear = data.currentYear;
    
    // 2. Store the ID of the semester that should remain enabled
    this.activeSemesterId = data.currentSemester;
  });
  }

  private truncateText(text: string, maxLength: number = 75): string {
  if (!text) return '';
  return text.length > maxLength ? text.substring(0, maxLength) + ' ...' : text;
}


// semester popup methods
openLearningPopup(): void {
    this.showSelectionPopup = true;
  }

  closePopup(): void {
    this.showSelectionPopup = false;
  }

  confirmAndNavigate(): void {
    const gradeId = this.userService.studentGrade.value?.id;
const selectedYearOnly = this.selection.academicYear.split(' - ')[0];

  this.router.navigate(['/assessments/list'], {
    queryParams: {
      selectedSubject: this.material?.id,
      gradeId: this.selectedGradeId,
      selectedAssessmentType: AssessmentType.ItqanTraining,
      semester: this.selection.semester,
      academicYear: selectedYearOnly // This will now send "2025"
    }
  });
    
    this.closePopup();
  }

    getGrades(): void {
    const sub = this.learningSubjectService.getGradesIdsWIthNames().subscribe({
      next: res => {
        if (res.isValid && res.modelList) {
          this.grades = res.modelList;
          this.selectedGradeId = this.userService.studentGrade.value?.id || '';
        } else {
          this.alertMessage.message = res.errorMessage;
          this.alertMessage.isDisplayed = true;
          this.customAlert.alert.next(this.alertMessage);
        }
      }
    });
    this.subscriptions.push(sub);
  }
}
