import { Component, Input, OnInit, Output, EventEmitter } from '@angular/core';
import { Router } from '@angular/router';
import { TranslateService } from '@ngx-translate/core';
import { AssessmentsService } from 'src/app/core/assessments.service';
import { IAssessmentCard } from 'src/app/DTOs/assessments.interfaces';
import { AssessmentStatus, AssessmentType } from 'src/app/enums/assessments.enums';

@Component({
  selector: 'app-assessment-card',
  templateUrl: './assessment-card.component.html',
  styleUrls: ['./assessment-card.component.scss']
})
export class AssessmentCardComponent implements OnInit {

  /** Expose enums to the template for easy access */
  readonly AssessmentStatus = AssessmentStatus;
  readonly AssessmentType = AssessmentType;
  
  constructor(
    private assessmentService: AssessmentsService,
    private router: Router,
   private translateService: TranslateService)
  {

  }
  public getAssessmentTypeName(type: AssessmentType | null): string {
    if (type === null || type === undefined) return '';
    // Maps the numeric enum value back to its string name for display/URL encoding

    if(this.translateService.currentLang === 'ar' && type === AssessmentType.ItqanTraining)
      return 'تدريب إتقان';

    if(this.translateService.currentLang != 'ar' && type === AssessmentType.ItqanTraining)
      return 'Itqan Training';

      return `${(AssessmentType as any)[type] ?? ''}`;

/*
    if (this.translateService.currentLang === 'ar' && type === AssessmentType.Ordinary) {
      return 'تقييم عادى';
    }
    if(this.translateService.currentLang === 'ar'){
      return `تقييمات ${(AssessmentType as any)[type] ?? ''}`;
      //return this.translateService.currentLang === 'ar' ? 'عادي' : 'Ordinary';
  }
    return type === AssessmentType.Ordinary ? 'Assessments' : `${(AssessmentType as any)[type] ?? ''} Assessments`;
    */
  }

  /** Input: The assessment data object */
  @Input() assessment!: IAssessmentCard;

  /** Output: Emits the assessment ID when the 'Take' button is clicked */
  @Output() takeClicked = new EventEmitter<number>();
  cardLabel: string = '';
  buttonText: string = '';
  redirectionURL: string = '';

  /** Helper: Convert enum numeric type to its string label (PISA, PIRLS, etc.) */
  get assessmentTypeLabel(): string {
    return AssessmentType[this.assessment.type]; // e.g. 1 → 'PISA'
  }

  /** Helper: Generate lowercase CSS-friendly type class */
  get assessmentTypeClass(): string {
    return this.assessmentTypeLabel.toLowerCase();
  }
  displayedSubjectName: string = '';
  getDisplayedSubjectName(): string {
   return  this.translateService.currentLang == "ar" ? this.assessment.subjectName : this.assessment.subjectNameEn
  }

  ngOnInit(): void 
  {
    this.cardLabel = this.assessmentService.calculateExamCardLabel(this.assessment.status, 
      this.assessment.isStartedByStudent, this.assessment.isFinishedByStudent);
     var buttonData = this.assessmentService.calculateExamCardButton(this.assessment.status,
      this.assessment.isStartedByStudent, this.assessment.isFinishedByStudent)

      this.buttonText = buttonData.label;
      this.redirectionURL = buttonData.redirectionURL;

      this.displayedSubjectName = this.getDisplayedSubjectName();
      this.translateService.onLangChange.subscribe(() => {
       this.displayedSubjectName =  this.getDisplayedSubjectName();
        });
  }

  handleAssessmentCardButtonClick()
  {
    this.router.navigate([this.redirectionURL, this.assessment.id])

  }
  
}
