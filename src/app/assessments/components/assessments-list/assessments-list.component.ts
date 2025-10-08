import { Component, inject, OnInit } from '@angular/core';
import { ActivatedRoute, ActivationEnd } from '@angular/router';
import { AlertMessage } from 'src/app/classes/AlertMessage';
import { AssessmentsService } from 'src/app/core/assessments.service';
import { CustomAlertService } from 'src/app/core/custom-alert.service';
import { LearningSubjectService } from 'src/app/core/learning-subject.service';
import { AssessmentType, IAssessmentCard } from 'src/app/DTOs/assessments.interfaces';
import { IIdWithName } from 'src/app/DTOs/shared.interfaces';

@Component({
  selector: 'app-assessments-list',
  templateUrl: './assessments-list.component.html',
  styleUrls: ['./assessments-list.component.scss']
})
export class AssessmentsListComponent implements OnInit {
   // --- INJECTED SERVICES (Using inject() for standalone components, still valid in v14) ---
  private assessmentsService = inject(AssessmentsService);
  private customAlert = inject(CustomAlertService);
  private route = inject(ActivatedRoute);
  
  // --- STATE PROPERTIES (Angular 14 Standard - Class Properties) ---

  readonly studentGrade: number = 10;
  public assessments: IAssessmentCard[] = [];
  public isLoading: boolean = true;
  public searchTerm: string = '';
  public selectedSubjectId: string  = ''; // Subject ID for filtering
  public selectedAssessmentType: AssessmentType | null   = null; 
  public learningSubjectsIds: IIdWithName[] = [];
  public alertMessage: AlertMessage = new AlertMessage();
  public assessmentTypes: AssessmentType[] = ['PISA', 'PIRLS', 'TIMMS', 'Ordinary'];


  ngOnInit(): void {
    // MOCK: Simulating ActivatedRoute Query Param Subscription
    // Setting initial filter state based on a mock query param (e.g., ?learningSubjectId=2)
        this.route.queryParamMap.subscribe(params => {
      const subjectIdparam = params.get('selectedSubject');
      this.selectedSubjectId = subjectIdparam??  '';

      const selectedAssessmentTypeParam = params.get('selectedAssessmentType');
      console.log(selectedAssessmentTypeParam);
   if (selectedAssessmentTypeParam && (this.assessmentTypes as string[]).includes(selectedAssessmentTypeParam)) {
      this.selectedAssessmentType = selectedAssessmentTypeParam as AssessmentType;
      console.log(this.selectedAssessmentType);
    }   });
    
    
    this.getLearningSubjectIds();
    // Load assessments initially with the query param filter applied
    this.loadAssessments();
    //const mockQueryParamSubjectId = '2'; // Simulating navigation from Mathematics card

   /// this.selectedSubjectId = mockQueryParamSubjectId || '';

  }

  // --- ASYNC DATA LOADING (Now calling service with filters) ---

  async loadAssessments(): Promise<void> {
    this.isLoading = true;
    try {
      // CRITICAL: Passing search term and subject ID to the service
      const data = await this.assessmentsService.fetchAssessmentsByGrade(
        this.studentGrade, 
        this.searchTerm, 
        this.selectedSubjectId,
        this.learningSubjectsIds,
        this.selectedAssessmentType // Pass subject names for service-side lookup
      );
      this.assessments = data;
    } catch (error) {
      console.error('Failed to load assessments:', error);
      this.alertMessage.message = 'Failed to load assessments.';
      this.alertMessage.isDisplayed = true;
      this.customAlert.alert.next(this.alertMessage);
    } finally {
      this.isLoading = false;
    }
  }

  getLearningSubjectIds() {
    this.assessmentsService.getLearningSubjectIds().subscribe(
      res => {
        if (res.isValid && res.modelList != null) {
          this.learningSubjectsIds = res.modelList;
          // Re-load assessments after subjects are available to apply initial filter
          this.loadAssessments(); 
        } else {
          this.alertMessage.message = 'فشل فى جلي بيانات المواد التعليميه';
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

  // --- DERIVED STATE (Angular 14 Standard - Getters) ---

  /** Groups filtered assessments into categories for display. */
  get assessmentCategories(): { type: AssessmentType, assessments: IAssessmentCard[] }[] {
    const assessments = this.assessments; // Use the raw fetched data (already filtered by service)
    const groups = assessments.reduce((acc, assessment) => {
      const type = assessment.type;
      if (!acc[type]) {
        acc[type] = [];
      }
      acc[type].push(assessment);
      return acc;
    }, {} as Record<AssessmentType, IAssessmentCard[]>);

    const typeOrder: AssessmentType[] = ['PISA', 'PIRLS', 'TIMMS', 'Ordinary'];

    return typeOrder
      .map(type => ({ type, assessments: groups[type] || [] }))
      .filter(category => category.assessments.length > 0);
  }

  // --- UI EVENT HANDLERS (Update state and trigger API call) ---

  updateSearch(event: Event): void {
    const input = event.target as HTMLInputElement;
    this.searchTerm = input.value;
    // CRITICAL: Trigger new API call with new filter
    this.loadAssessments(); 
  }

  updateSubjectFilter(event: Event): void {
    const select = event.target as HTMLSelectElement;
    this.selectedSubjectId = select.value;
    // CRITICAL: Trigger new API call with new filter
    this.loadAssessments(); 
  }
    updateAssessmentTypeFilter(event: Event): void {
    const select = event.target as HTMLSelectElement;
    this.selectedAssessmentType = select.value as AssessmentType?? null;
    // CRITICAL: Trigger new API call with new filter
    this.loadAssessments(); 
  }

  resetFilters(): void {
    this.searchTerm = '';
    this.selectedSubjectId = '';
    
    // Manually reset the input/select controls (for immediate UI consistency)
    const searchInput = document.querySelector('.search-input') as HTMLInputElement;
    if (searchInput) searchInput.value = '';
    const selectControl = document.querySelector('.select-input') as HTMLSelectElement;
    if (selectControl) selectControl.value = '';

    // CRITICAL: Trigger new API call to get all data
    this.loadAssessments();
  }

  takeAssessment(assessmentId: number): void {
    console.log(`[ROUTE ACTION]: Navigating to route /run-assessments/${assessmentId}`);
    // Replacing alert with console log and mock alert service for better practice
    this.alertMessage.message = `Simulating navigation to assessment ID: ${assessmentId}`;
    this.alertMessage.isDisplayed = true;
    this.customAlert.alert.next(this.alertMessage);
  }
}
