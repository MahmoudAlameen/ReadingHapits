import { Component, inject, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { finalize } from 'rxjs';
import { AlertMessage } from 'src/app/classes/AlertMessage';
import { AssessmentsService } from 'src/app/core/assessments.service';
import { CustomAlertService } from 'src/app/core/custom-alert.service';
import { LearningSubjectService } from 'src/app/core/learning-subject.service';
import { IAssessmentCard } from 'src/app/DTOs/assessments.interfaces';
import { IIdWithName } from 'src/app/DTOs/shared.interfaces';
import { AssessmentType } from 'src/app/enums/assessments.enums';

@Component({
  selector: 'app-assessments-list',
  templateUrl: './assessments-list.component.html',
  styleUrls: ['./assessments-list.component.scss']
})
export class AssessmentsListComponent implements OnInit {
  private assessmentsService = inject(AssessmentsService);
  private customAlert = inject(CustomAlertService);
  private route = inject(ActivatedRoute);
  private learningSubjectService = inject(LearningSubjectService);

  gradeId? : string  = '';
  public assessments: IAssessmentCard[] = [];
  public isLoading = true;
  public searchTerm = '';
  public selectedSubjectId = '';
  public selectedAssessmentType: AssessmentType | null = null ;
  public learningSubjectsIds: IIdWithName[] = [];
  public alertMessage: AlertMessage = new AlertMessage();

  // UI-friendly names (string keys) for the enum (e.g. "PISA", "PIRLS" ...)
  public assessmentTypeNames: string[] = Object.keys(AssessmentType).filter(k => isNaN(Number(k)));

  ngOnInit(): void {
    // Read query params and initialize filters
    this.route.queryParamMap.subscribe(params => {
      const subjectIdParam = params.get('selectedSubject');
      const assessmentTypeParam = params.get('selectedAssessmentType');

      this.selectedSubjectId = subjectIdParam ?? '';
      this.selectedAssessmentType = this.parseAssessmentTypeParam(assessmentTypeParam);

      // Load learning subjects first, which will trigger loadAssessments() after subjects are loaded
      this.getLearningSubjectIds();
    });
  }

  private parseAssessmentTypeParam(value: string | null): AssessmentType | null {
    if (!value) return null;

    // Numeric param (e.g., "1")
    const n = Number(value);
    if (!isNaN(n) && (AssessmentType as any)[n]) {
      return n as AssessmentType;
    }

    // Named param (e.g., "PISA")
    if ((AssessmentType as any)[value]) {
      return (AssessmentType as any)[value] as AssessmentType;
    }

    return null;
  }

  public getAssessmentTypeName(type: AssessmentType | null): string {
    if (type === null || type === undefined) return '';
    return (AssessmentType as any)[type] ?? '';
  }

  getLearningSubjectIds() {
    console.log("assessments list ")
    this.learningSubjectService.getLearningSubjectIds().subscribe(
      res => {
        if (res.isValid && res.modelList != null) {
          this.learningSubjectsIds = res.modelList;
          // Now that subjects are available, load assessments with initial filters
          this.loadAssessments();
        } else {
          this.alertMessage.message = 'فشل فى جلب بيانات المواد التعليميه';
          this.alertMessage.isDisplayed = true;
          this.customAlert.alert.next(this.alertMessage);
        }
      },
      err => {
        this.alertMessage.message = err;
        this.alertMessage.isDisplayed = true;
        this.customAlert.alert.next(this.alertMessage);
      }
    );
  }

  async loadAssessments() {
    this.isLoading = true;

      // Pass the numeric enum (or null) to your service. If your backend expects the string name,
      // convert by using getAssessmentTypeName(this.selectedAssessmentType)
      const data =  this.assessmentsService.fetchAssessmentsByGrade(
        this.gradeId,
        this.searchTerm,
        this.selectedSubjectId,
        this.selectedAssessmentType != null ? this.selectedAssessmentType : undefined
      ).subscribe(
        res =>
        {

        
          if(res.isValid && res.modelList != null)
          {
            this.assessments = res.modelList;
          }
          else
          {
            this.alertMessage.message = `${res.errorMessage}`;
            this.alertMessage.isDisplayed = true;
            this.customAlert.alert.next(this.alertMessage);
          }
          this.isLoading = false;

        },
        err =>
        {
            this.alertMessage.message = `${err}`;
            this.alertMessage.isDisplayed = true;
            this.customAlert.alert.next(this.alertMessage);
            this.isLoading = false;
        }
      );
  }

  /** Groups fetched assessments into categories by enum value (numeric). */
  get assessmentCategories(): { type: AssessmentType, assessments: IAssessmentCard[] }[] {
    const groups = this.assessments.reduce((acc, assessment) => {
      // support both numeric and named type in assessment payload
      let typeValue: AssessmentType | null = null;

      if (typeof (assessment as any).type === 'number') {
        typeValue = (assessment as any).type as AssessmentType;
      } else if (typeof (assessment as any).type === 'string') {
        // could be "PISA" or "1"
        typeValue = this.parseAssessmentTypeParam((assessment as any).type);
      }

      if (typeValue == null) return acc;

      const key = typeValue as unknown as number;
      if (!acc[key]) acc[key] = [];
      acc[key].push(assessment);
      return acc;
    }, {} as Record<number, IAssessmentCard[]>);

    const typeOrder: AssessmentType[] = [
      AssessmentType.PISA,
      AssessmentType.PIRLS,
      AssessmentType.TIMMS,
      AssessmentType.Ordinary
    ];

    return typeOrder
      .map(type => ({ type, assessments: groups[type as unknown as number] || [] }))
      .filter(category => category.assessments.length > 0);
  }

  updateSearch(event: Event): void {
    const input = event.target as HTMLInputElement;
    this.searchTerm = input.value;
    this.loadAssessments();
  }

  updateSubjectFilter(event: Event): void {
    const select = event.target as HTMLSelectElement;
    this.selectedSubjectId = select.value;
    this.loadAssessments();
  }

  updateAssessmentTypeFilter(event: Event): void {
    const select = event.target as HTMLSelectElement;
    // value is the enum key string (e.g., "PISA") or empty string
    this.selectedAssessmentType = this.parseAssessmentTypeParam(select.value);
    this.loadAssessments();
  }

  resetFilters(): void {
    this.searchTerm = '';
    this.selectedSubjectId = '';
    this.selectedAssessmentType = null;

    const searchInput = document.querySelector('.search-input') as HTMLInputElement;
    if (searchInput) searchInput.value = '';

    const selectControls = document.querySelectorAll('.select-input') as NodeListOf<HTMLSelectElement>;
    selectControls.forEach(s => s.value = '');

    this.loadAssessments();
  }

  takeAssessment(assessmentId: number): void {
    this.alertMessage.message = `Simulating navigation to assessment ID: ${assessmentId}`;
    this.alertMessage.isDisplayed = true;
    this.customAlert.alert.next(this.alertMessage);
  }
}
