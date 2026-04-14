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

  @Input() material!: ILearningSubjectCard;

  displayedName: string = '';
  displayedDescription: string = '';

  showSelectionPopup = false;

  // ✅ Selection model
  selection = {
    semester: 3,
    academicYear: '' // will be set in ngOnInit
  };

  activeSemesterId: number | null = null;
  selectedGradeId: string = '';

  grades!: IIdWithName[];
  alertMessage: AlertMessage = new AlertMessage();
  private subscriptions: Subscription[] = [];

  // ✅ Correct academic years format
  academicYears =[
    '2018 - 2019',
    '2019 - 2020',
    '2020 - 2021',
    '2021 - 2022',
    '2022 - 2023',
    '2023 - 2024',
    '2024 - 2025',
    '2025 - 2026',
    '2026 - 2027',
    '2027 - 2028',
    '2028 - 2029',
    '2029 - 2030',
    '2030 - 2031',
    '2031 - 2032',
    '2032 - 2033',
    '2033 - 2034',
    '2034 - 2035',
    '2035 - 2036',
];

  semesters = [
    { id: 1, nameKey: 'SEMESTERS.FIRST' },
    { id: 2, nameKey: 'SEMESTERS.SECOND' },
    { id: 3, nameKey: 'SEMESTERS.THIRD' }
  ];

  constructor(
    private router: Router,
    private translateService: TranslateService,
    private API: APIService,
    private userService: UserService,
    public assessmentsService: AssessmentsService,
    private learningSubjectService: LearningSubjectService,
    private customAlert: CustomAlertService,
  ) {}

  ngOnInit(): void {

    // 🔹 UI text
    this.displayedName = this.translateService.currentLang === 'ar'
      ? this.material.nameAr
      : this.material.nameEn;

    this.displayedDescription = this.translateService.currentLang === 'ar'
      ? this.truncateText(this.material.descriptionAr || '')
      : this.truncateText(this.material.descriptionEn || '');

    // 🔹 Images
    this.material.coverUrl = this.material.coverUrl
      ? this.API.base + "LearningSubjects/" + this.material.coverUrl
      : "assets/images/defaultLearningSubjectCoverImage/Learning_Material-Cards-card1-Cover_Section.png";

    this.material.assignedTeachers.forEach(teacher => {
      teacher.avatarUrl = teacher.avatarUrl
        ? this.API.base + "Users/" + teacher.avatarUrl
        : "assets/images/defaultCardTeachers/defaultUserImage/Card1-Teachers-Teacher2.png";
    });

    // 🔹 Default academic year
    const currentAcademicYear = this.assessmentsService.getCurrentAcademicYear();
    this.selection.academicYear = currentAcademicYear;

    // 🔹 Load semester from backend
    this.assessmentsService.getActiveSemester().subscribe(data => {

      this.selection.semester = data.currentSemester;
      this.activeSemesterId = data.currentSemester;

      // ✅ Prefer backend if valid
      if (this.academicYears.includes(data.currentYear)) {
        this.selection.academicYear = data.currentYear;
      }
    });

    this.userService.setUserGrade();
    this.getGrades();
  }

  // 🔹 Navigation
  onViewExams(): void {
    const year = this.extractYear(this.selection.academicYear);
    if (!year) return;

    this.router.navigate(['/assessments/list'], {
      queryParams: {
        selectedSubject: this.material?.id,
        gradeId: this.selectedGradeId,
        selectedAssessmentType: AssessmentType.ItqanTraining,
        semester: this.selection.semester,
        academicYear: year
      }
    });
  }

  confirmAndNavigate(): void {
    this.onViewExams();
    this.closePopup();
  }

  // 🔹 Helpers
  extractYear(academicYear: string): number | null {
    if (!academicYear) return null;

    const parts = academicYear.split(' - ');
    if (parts.length !== 2) return null;

    const year = Number(parts[0]);
    return isNaN(year) ? null : year;
  }

  private truncateText(text: string, maxLength: number = 75): string {
    return text.length > maxLength ? text.substring(0, maxLength) + ' ...' : text;
  }

  // 🔹 Popup
  openLearningPopup(): void {
    this.showSelectionPopup = true;
  }

  closePopup(): void {
    this.showSelectionPopup = false;
  }

  // 🔹 Grades
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