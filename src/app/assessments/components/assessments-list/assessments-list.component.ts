import { ChangeDetectorRef, Component, inject, OnInit, OnDestroy  } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router'; // Added Router for navigation methods
import { TranslateService } from '@ngx-translate/core';
import { finalize, Subscription } from 'rxjs';
import { AlertMessage } from 'src/app/classes/AlertMessage';
import { AssessmentsService } from 'src/app/core/assessments.service';
import { CustomAlertService } from 'src/app/core/custom-alert.service';
import { LearningSubjectService } from 'src/app/core/learning-subject.service';
import { IAssessmentCard } from 'src/app/DTOs/assessments.interfaces';
import { IIdWithName } from 'src/app/DTOs/shared.interfaces';
import { AssessmentType, AssessmentStatus, InternationalAssessmentSubject, AssessmentTypeSubjectsMap } from 'src/app/enums/assessments.enums'; // Assuming AssessmentStatus is needed

@Component({
  selector: 'app-assessments-list',
  templateUrl: './assessments-list.component.html',
  styleUrls: ['./assessments-list.component.scss']
})
export class AssessmentsListComponent implements OnInit, OnDestroy  {
  private assessmentsService = inject(AssessmentsService);
  private customAlert = inject(CustomAlertService);
  private route = inject(ActivatedRoute);
  private router = inject(Router); // Inject Router for navigation
  private translateService = inject(TranslateService);
  private learningSubjectService = inject(LearningSubjectService);
  private cdr: any = inject<any>(ChangeDetectorRef);

  gradeId? : string  = '';
  public assessments: IAssessmentCard[] = [];
  public isLoading = true;
  public searchTerm = '';
  public selectedSubjectId = '';
  public selectedAssessmentType: AssessmentType | null = null ;
  public selectedAssessmentSubjectType: InternationalAssessmentSubject | null = null ;
  public semester : string| null = null;
  public academicYear : string| null = null;
  public learningSubjectsIds: IIdWithName[] = [];
  public gradesIds: IIdWithName[] = [];
  public alertMessage: AlertMessage = new AlertMessage();

  // Property to hold the categorized data (replaces the getter)
  public categorizedAssessments: { type: AssessmentType, assessments: IAssessmentCard[] }[] = [];

  // UI-friendly names (string keys) for the enum (e.g. "PISA", "PIRLS" ...)
public assessmentTypeNames: string[] = Object.keys(AssessmentType)
    .filter(key => 
        isNaN(Number(key)) && // 1. Get only the names (PISA, PIRLS, etc.)
        key !== AssessmentType[AssessmentType.Ordinary] // 2. Dynamically exclude 'Ordinary'
    );
 public assessmentTypeSubjectsNames: string[] = Object.keys(InternationalAssessmentSubject).filter(k => isNaN(Number(k)));
 public IsInternationalAssessmentMode: boolean = false; // This can be set based on route or other logic to determine if we're in international assessment mode
  public IsComeFromTRainingPage: boolean = false;
     private langSub!: Subscription;

public isMobileFilterOpen: boolean = false;

toggleMobileFilters() {
  this.isMobileFilterOpen = !this.isMobileFilterOpen;
}

 ngOnInit(): void {
    // Read query params and initialize filters
    this.route.queryParamMap.subscribe(params => {
      const subjectIdParam = params.get('selectedSubject');
      const assessmentTypeParam = params.get('selectedAssessmentType');
      const assessmentSubjectTypeParam = params.get('selectedAssessmentSubjectType');
      const semester = params.get('semester');
      const academicYear = params.get('academicYear');
      this.semester = semester ?? null;
      this.academicYear = academicYear ?? null;
      this.selectedSubjectId = subjectIdParam ?? '';
      this.selectedAssessmentType = this.parseAssessmentTypeParam(assessmentTypeParam);

      if(this.selectedAssessmentType == AssessmentType.Ordinary)
        this.IsComeFromTRainingPage = true;
      this.UpdateInternationalAssessmentMode();
      this.selectedAssessmentSubjectType = this.parseAssessmentSubjectTypeParam(assessmentSubjectTypeParam);

      // Load learning subjects first, which will trigger loadAssessments() after subjects are loaded
      this.getLearningSubjectIds();
      this.getGradesIds();
    });
    
    this.loadAssessmentSubjectTypeNames();

    // 🔥 auto refresh when language changes
    this.langSub = this.translateService.onLangChange.subscribe(() => {
      this.loadAssessmentSubjectTypeNames();
    });

    // Handle translation updates globally once
  this.langSub = this.translateService.onLangChange.subscribe(() => {
    this.assessments.forEach(a => {
      if (a.gradeId == null) {
        a.gradeName = this.translateService.currentLang === 'ar' ? 'كل الصفوف' : 'All Grades';
      }
    });
    this.updateAssessmentCategories(); // Re-trigger categorization to refresh view
    this.cdr.detectChanges();
  });
  }

  ngOnDestroy() {
    this.langSub?.unsubscribe();
  }

    private loadAssessmentSubjectTypeNames() {
  let subjects: InternationalAssessmentSubject[];

  // ✔ if no type selected OR Ordinary → show all subjects
  if (
    this.selectedAssessmentType === null ||
    this.selectedAssessmentType === AssessmentType.Ordinary
  ) {
    subjects = Object.keys(InternationalAssessmentSubject)
      .filter(k => isNaN(Number(k)))
      .map(k => InternationalAssessmentSubject[k as keyof typeof InternationalAssessmentSubject]);
  }
  // ✔ otherwise → load subjects for selected assessment
  else {
    subjects = AssessmentTypeSubjectsMap[this.selectedAssessmentType] ?? [];
  }

  // ✔ translate names
  this.assessmentTypeSubjectsNames = subjects.map(subject =>
    this.translateService.instant(
      `ASSESSMENT_SUBJECT.${InternationalAssessmentSubject[subject]}`
    )
  );
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

    private parseAssessmentSubjectTypeParam(value: string | null): InternationalAssessmentSubject | null {
    if (!value) return null;

    // Numeric param (e.g., "1")
    const n = Number(value);
    if (!isNaN(n) && (InternationalAssessmentSubject as any)[n]) {
      return n as InternationalAssessmentSubject;
    }

    // Named param (e.g., "PISA")
    if ((InternationalAssessmentSubject as any)[value]) {
      return (InternationalAssessmentSubject as any)[value] as InternationalAssessmentSubject;
    }

    return null;
  }
  public getFilterAssessmentTypeName(type: AssessmentType | null): string {
    if (type === null || type === undefined) return '';
    // Maps the numeric enum value back to its string name for display/URL encoding
    return (AssessmentType as any)[type] ?? '';
  }

  public getAssessmentTypeName(type: AssessmentType | null): string {
    if (type === null || type === undefined) return '';
    // Maps the numeric enum value back to its string name for display/URL encoding

    if (this.translateService.currentLang === 'ar' && type === AssessmentType.Ordinary) {
      return 'التدريبات';
    }

        if (this.translateService.currentLang === 'en' && type === AssessmentType.Ordinary) {
      return 'Training Assessments';
    }
    if(this.translateService.currentLang === 'ar'){
      return `تقييمات ${(AssessmentType as any)[type] ?? ''}`;
      //return this.translateService.currentLang === 'ar' ? 'عادي' : 'Ordinary';
  }
    return type === AssessmentType.Ordinary ? 'Assessments' : `${(AssessmentType as any)[type] ?? ''} Assessments`;
  }

  
  public getAssessmentSubjectTypeName(type: InternationalAssessmentSubject | null): string {
    if (type === null || type === undefined) return '';
    // Maps the numeric enum value back to its string name for display/URL encoding
    return (InternationalAssessmentSubject as any)[type] ?? '';
  }
  
  /** Maps the AssessmentStatus enum value to a human-readable Arabic string. */
  getAssessmentStatusText(status: AssessmentStatus): string {
    switch (status) {
      case AssessmentStatus.New: return 'جديد';
      case AssessmentStatus.InReview: return 'قيد المراجعة';
      case AssessmentStatus.Approved: return 'مُعتمد';
      case AssessmentStatus.Rejected: return 'مرفوض';
      case AssessmentStatus.Published: return 'مُنشر';
      default: return 'غير محدد';
    }
  }

  /** Returns the CSS class corresponding to the assessment status for badge coloring. */
  getAssessmentStatusClass(status: AssessmentStatus): string {
    switch (status) {
      case AssessmentStatus.New: return 'status-new';
      case AssessmentStatus.InReview: return 'status-review';
      case AssessmentStatus.Approved: return 'status-approved';
      case AssessmentStatus.Rejected: return 'status-rejected';
      case AssessmentStatus.Published: return 'status-published';
      default: return 'status-default';
    }
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
    getGradesIds() {
    console.log("assessments list ")
    this.learningSubjectService.getGradesIdsWIthNames().subscribe(
      res => {
        if (res.isValid && res.modelList != null) {
          this.gradesIds = res.modelList;
          // Now that subjects are available, load assessments with initial filters
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

  // Ensure the sidebar closes on mobile when a filter is applied
  if (window.innerWidth <= 768) {
    this.isMobileFilterOpen = false;
  }

  this.assessmentsService.fetchAssessmentsByGrade(
    this.gradeId,
    this.searchTerm,
    this.selectedSubjectId,
    this.selectedAssessmentType ?? undefined,
    this.selectedAssessmentSubjectType ?? undefined,
    this.semester ?? undefined,
    this.academicYear ?? undefined
  ).pipe(
    finalize(() => {
      this.isLoading = false;
      this.cdr.detectChanges();
    })
  ).subscribe({
    next: (res) => {
      if (res.isValid && res.modelList != null) {
        this.assessments = res.modelList.map(a => ({
          ...a,
          gradeName: a.gradeId != null ? a.gradeName : 
            (this.translateService.currentLang === "ar" ? "كل الصفوف" : "All Grades")
        }));
        this.updateAssessmentCategories();
      } else {
        this.handleError(res.errorMessage);
      }
    },
    error: (err) => this.handleError(err)
  });
}

private handleError(msg: string) {
  this.alertMessage.message = msg;
  this.alertMessage.isDisplayed = true;
  this.customAlert.alert.next(this.alertMessage);
}

private showErrorMessage(msg: string) {
  this.alertMessage.message = msg;
  this.alertMessage.isDisplayed = true;
  this.customAlert.alert.next(this.alertMessage);
}
  /** Groups fetched assessments into categories and assigns to public property. */
  private updateAssessmentCategories(): void {
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
      AssessmentType.TIMSS,
      AssessmentType.Ordinary
    ];

    this.categorizedAssessments = typeOrder
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
    updateGradeFilter(event: Event): void {
    const select = event.target as HTMLSelectElement;
    this.gradeId = select.value;
    this.loadAssessments();
  }

  updateAssessmentTypeFilter(event: Event): void {
    const select = event.target as HTMLSelectElement;
    // value is the enum key string (e.g., "PISA") or empty string
    this.selectedAssessmentType = this.parseAssessmentTypeParam(select.value);
      this.loadAssessmentSubjectTypeNames();
      this.selectedAssessmentSubjectType = null; // Reset subject filter when assessment type changes
    this.UpdateInternationalAssessmentMode();
    this.loadAssessments();
  }
  
  UpdateInternationalAssessmentMode() {
    if(this.selectedAssessmentType === AssessmentType.Ordinary || this.selectedAssessmentType === null)
      this.IsInternationalAssessmentMode = false;
    else
      this.IsInternationalAssessmentMode = true;
  }

  updateAssessmentSubjectTypeFilter(event: Event): void {
    const select = event.target as HTMLSelectElement;
    // value is the enum key string (e.g., "PISA") or empty string
    this.selectedAssessmentSubjectType = this.parseAssessmentSubjectTypeParam(select.value);
    this.loadAssessments();
  }

  resetFilters(): void {

    if(this.IsComeFromTRainingPage)
      this.selectedAssessmentType = AssessmentType.Ordinary;
    else
      this.selectedAssessmentType = null;
    this.searchTerm = '';
    this.selectedSubjectId = '';
    this.selectedAssessmentSubjectType = null;
    this.gradeId = '';

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
  
  // Placeholder for methods used in template navigation
  trackByFn(index: number, item: IAssessmentCard): string | number {
    return item.id;
  }
  
  goToAssessmentBuilder(id?: string): void {
    if(id) {
      this.router.navigate(['/platform/assessments/build', id]);
    } else {
      this.router.navigate(['/platform/assessments/build']);
    }
  }

  viewDetails(id: string): void {
    this.router.navigate(['/platform/assessments/details', id]);
  }
}

