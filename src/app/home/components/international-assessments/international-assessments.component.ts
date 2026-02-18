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

  private assessmentsData: Record<string, IAssessmentTypeDetails> = {
    TIMSS: {
      name: 'TIMSS',
      type: AssessmentType.TIMMS,
      description: 'Trends in International Mathematics and Science Study.',
      materials: [
        { name: 'Math', coverUrl: 'assets/math-cover.jpg' },
        { name: 'Science', coverUrl: 'assets/science-cover.jpg' }
      ]
    },
    PIRLS: {
      name: 'PIRLS',
      type: AssessmentType.PIRLS,
      description: 'Progress in International Reading Literacy Study.',
      materials: [
        { name: 'Arabic', coverUrl: 'assets/arabic-cover.jpg' },
        { name: 'English', coverUrl: 'assets/english-cover.jpg' }
      ]
    },
    PISA: {
      name: 'PISA',
      type: AssessmentType.PISA,
      description: 'Programme for International Student Assessment.',
      materials: [
        { name: 'Arabic', coverUrl: 'assets/arabic-cover.jpg' },
        { name: 'English', coverUrl: 'assets/english-cover.jpg' },
        { name: 'Science', coverUrl: 'assets/science-cover.jpg' },
        { name: 'Math', coverUrl: 'assets/math-cover.jpg' }
      ]
    }
  };

  openAssessment(type: string) {
   // this.selectedAssessment = this.assessmentsData[type];
   // this.isPopupVisible = true;
  }
} 