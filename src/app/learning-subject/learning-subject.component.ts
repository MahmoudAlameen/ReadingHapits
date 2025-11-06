import { ThisReceiver } from '@angular/compiler';
import { Component, Input, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs';
import { LearningSubjectService } from '../core/learning-subject.service';
import { ISubjectAssessmentCard, ILearningSubjectDetails, ILearningResourceCard } from '../DTOs/ILearningSubjectDetails';
import { LearningResourcesService } from '../core/learning-resources.service';
import { LearningResourceStatus, LearningResourceType } from '../enums/learning-resources.enums';
import { CustomAlertService } from '../core/custom-alert.service';
import { AlertMessage } from '../classes/AlertMessage';
import { InternationalAssessmentsService } from '../core/international-assessments.service';
import { TranslateService } from '@ngx-translate/core';
import { APIService } from '../core/API.Service';
import { IIdWithName } from '../DTOs/shared.interfaces';
import { AssessmentType } from 'src/app/enums/assessments.enums';
import { AuthService } from '../core/auth.service';

@Component({
  selector: 'app-learning-subject',
  templateUrl: './learning-subject.component.html',
  styleUrls: ['./learning-subject.component.scss']
})
export class LearningSubjectComponent implements OnInit, OnDestroy {
  @Input() subjectId!: string;
  @Input() gradeLevel!: string;
  @Input() coverUrl!: string;
  @Input() description!: string;

  learningSubject!: ILearningSubjectDetails;
  subjectTitle = 'Mathematics';
  subjectDescription =
    'Mathematics is the foundation of logical thinking, problem-solving, and analytical skills.';
  grades!: IIdWithName[];
  selectedGradeId: string = '';
  pisaExams: ISubjectAssessmentCard[] = [];
  timssExams: ISubjectAssessmentCard[] = [];
  pirlsExams: ISubjectAssessmentCard[] = [];
  ordinaryExams: ISubjectAssessmentCard[] = [];
  isLoading: boolean = false;
  visitRetriesCount: number = 0;

  alertMessage: AlertMessage = new AlertMessage();

  /** All subscriptions will be pushed here and unsubscribed on destroy */
  private subscriptions: Subscription[] = [];

  constructor(
    private activeRoute: ActivatedRoute,
    private learningSubjectService: LearningSubjectService,
    private learningResourceService: LearningResourcesService,
    private internationalAssessmentService: InternationalAssessmentsService,
    private customAlert: CustomAlertService,
    private translateService: TranslateService,
    private authService: AuthService,
    private API: APIService
  ) {}

  ngOnInit(): void {
    this.ExtractIdsFromRoute();
  }

  ngOnDestroy(): void {
    // Unsubscribe from all subscriptions
    this.subscriptions.forEach(sub => sub.unsubscribe());
  }

  fetchData(): void {
    this.isLoading = true;

    const sub = this.learningSubjectService.getLearningSubjectDetails(this.subjectId).subscribe({
      next: response => {
        if (response.isValid && response.model) {
          this.learningSubject = response.model;

          // Initialize titles & descriptions based on language
          this.subjectTitle =
            this.translateService.currentLang === 'ar' && this.learningSubject.nameAr
              ? this.learningSubject.nameAr
              : this.learningSubject.nameEn || '';
          this.subjectDescription =
            this.translateService.currentLang === 'ar' && this.learningSubject.descriptionAr
              ? this.learningSubject.descriptionAr
              : this.learningSubject.descriptionEn || '';

          // React to language changes
          const langSub = this.translateService.onLangChange.subscribe(() => {
            this.subjectTitle =
              this.translateService.currentLang === 'ar' && this.learningSubject.nameAr
                ? this.learningSubject.nameAr
                : this.learningSubject.nameEn || '';
            this.subjectDescription =
              this.translateService.currentLang === 'ar' && this.learningSubject.descriptionAr
                ? this.learningSubject.descriptionAr
                : this.learningSubject.descriptionEn || '';
          });
          this.subscriptions.push(langSub);

          this.learningSubject.coverUrl = this.API.base + 'LearningSubjects/' + this.learningSubject.coverUrl;

          this.learningSubject.assignedTeachers = this.learningSubject.assignedTeachers.map(t => ({
            ...t,
            avatarUrl: t.avatarUrl ? this.API.mediaBase + 'Users/' + t.avatarUrl : t.avatarUrl
          }));

          this.GetLearningResources(this.learningSubject.Id, undefined, LearningResourceStatus.Published);
          this.getExamsBySubjectId(this.learningSubject.Id);
        } else {
          this.alertMessage.message = response.errorMessage;
          this.alertMessage.isDisplayed = true;
          this.customAlert.alert.next(this.alertMessage);
        }
      },
      error: error => {
        this.alertMessage.isDisplayed = true;
        this.alertMessage.message = `Error during fetching reading rooms from API: ${error}`;
        this.customAlert.alert.next(this.alertMessage);
      }
    });

    this.subscriptions.push(sub);
  }

  ExtractIdsFromRoute(): void {
    const routeSub = this.activeRoute.paramMap.subscribe(param => {
      const subjectId = param.get('id');
      if (subjectId) this.subjectId = subjectId;
      this.fetchData();
      if (this.authService.isLoggedIn()) 
        this.visitLearningSubject(this.subjectId);
    });
    this.subscriptions.push(routeSub);

    const querySub = this.activeRoute.queryParamMap.subscribe(param => {
      const gradeId = param.get('gradeId');
      if (gradeId) this.gradeLevel = gradeId;
      this.selectedGradeId = gradeId ?? '';
      this.getGrades();
    });
    this.subscriptions.push(querySub);
  }

  GetLearningResources(subjectId: string, gradeId?: string, status?: LearningResourceStatus): void {
    const sub = this.learningResourceService
      .getLearningResourcesBySubjectId(this.subjectId, gradeId, status)
      .subscribe({
        next: response => {
          if (response.isValid && response.modelList) {
            const resources = response.modelList.map(
              t =>
                ({
                  ...t,
                  coverUrl: t.coverUrl
                    ? `${this.API.base}LearningResources/Covers/${t.coverUrl}`
                    : t.coverUrl,
                  fileUrl: t.fileUrl
                    ? `${this.API.base}LearningResources/Files/${t.fileUrl}`
                    : t.coverUrl
                } as ILearningResourceCard)
            );

            this.learningSubject.books = resources.filter(r => r.resourceType === LearningResourceType.Book);
            this.learningSubject.articles = resources.filter(r => r.resourceType === LearningResourceType.Article);
          } else {
            this.alertMessage.message = response.errorMessage;
            this.alertMessage.isDisplayed = true;
            this.customAlert.alert.next(this.alertMessage);
          }
        },
        error: error => {
          this.alertMessage.isDisplayed = true;
          this.alertMessage.message = `Error during fetching learning resources from API: ${error}`;
          this.customAlert.alert.next(this.alertMessage);
        }
      });
    this.subscriptions.push(sub);
  }

  getExamsBySubjectId(subjectId: string): void {
    const sub = this.internationalAssessmentService
      .getExamsBySubjectId(this.subjectId, this.selectedGradeId)
      .subscribe({
        next: response => {
          if (response.isValid && response.modelList) {
            this.learningSubject.exams = response.modelList;
            this.pisaExams = response.modelList.filter(e => e.type === AssessmentType.PISA);
            this.pirlsExams = response.modelList.filter(e => e.type === AssessmentType.PIRLS);
            this.timssExams = response.modelList.filter(e => e.type === AssessmentType.TIMMS);
            this.ordinaryExams = response.modelList.filter(e => e.type === AssessmentType.Ordinary);
          } else {
            this.alertMessage.message = response.errorMessage;
            this.alertMessage.isDisplayed = true;
            this.customAlert.alert.next(this.alertMessage);
          }
          this.isLoading = false;
        },
        error: error => {
          this.alertMessage.isDisplayed = true;
          this.alertMessage.message = `Error during fetching exams from API: ${error}`;
          this.customAlert.alert.next(this.alertMessage);
          this.isLoading = false;
        }
      });

    this.subscriptions.push(sub);
  }

  getGrades(): void {
    const sub = this.learningSubjectService.getGradesIdsWIthNames().subscribe({
      next: res => {
        if (res.isValid && res.modelList) {
          this.grades = res.modelList;
        } else {
          this.alertMessage.message = res.errorMessage;
          this.alertMessage.isDisplayed = true;
          this.customAlert.alert.next(this.alertMessage);
        }
      },
      error: err => {
        this.alertMessage.message = err;
        this.alertMessage.isDisplayed = true;
        this.customAlert.alert.next(this.alertMessage);
      }
    });
    this.subscriptions.push(sub);
  }

  visitLearningSubject(subjectId: string): void {
    if (this.visitRetriesCount > 5) return;

    const sub = this.learningSubjectService.visitLearningSubject(subjectId).subscribe({
      next: res => {
        if (!res.isValid || !res.model) {
          this.visitRetriesCount++;
          this.visitLearningSubject(subjectId);
        }
      },
      error: err => {
        if (err.status === 400 || err.status === 500) {
          this.visitRetriesCount++;
          this.visitLearningSubject(subjectId);
        }
      }
    });
    this.subscriptions.push(sub);
  }
}
