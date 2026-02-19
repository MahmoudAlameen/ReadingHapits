import { Component, OnInit } from '@angular/core';
import { IInternationalAssessmentTypeCard } from 'src/app/DTOs/international-assessment-type-card.interface';
import { InternationalAssessmentsService } from 'src/app/core/international-assessments.service'; 
import { LangChangeEvent } from '@ngx-translate/core';
import { TranslateService } from '@ngx-translate/core';
import { Subscription } from 'rxjs';
import { AssessmentType } from 'src/app/enums/assessments.enums';
import { IAssessmentTypeDetails } from 'src/app/DTOs/assessments.interfaces';


@Component({
  selector: 'app-international-assessments',
  templateUrl: './international-assessments.component.html',
  styleUrls: ['./international-assessments.component.scss']
})
export class InternationalAssessmentsComponent implements OnInit {
  exams!:IInternationalAssessmentTypeCard[];
  langChangeSub!: Subscription;
  isPopupVisible = false;
  selectedAssessment: IInternationalAssessmentTypeCard| null = null;
  constructor(private InternationalAssessmentsService : InternationalAssessmentsService,
    private translate: TranslateService )
   {

   }

  getInternationalAssessmentsCards()
  {
    this.InternationalAssessmentsService.getInternationalAssessmentsTypes().subscribe(
      response=>
      {
        
          this.exams = response;
          this.exams.forEach(exam=>{
            exam.iconSrc = `assets/images/international-assessments-cards/${exam.iconSrc}`;
          })
        

      },
      error=>alert(`error during fetching international assessments from API ${error}`)
    );

  }

  ngOnInit(): void {
    this.getInternationalAssessmentsCards();
        this.langChangeSub = this.translate.onLangChange.subscribe(
          (event: LangChangeEvent) => {
            this.getInternationalAssessmentsCards();
          }
        );

  }
  
  ClosePopup() {
    this.isPopupVisible = false;
    this.selectedAssessment = null;
  }

  OpenAssessment(assessment: IInternationalAssessmentTypeCard) {
  {
    this.isPopupVisible = true;
    this.selectedAssessment = assessment;
  }
}


} 