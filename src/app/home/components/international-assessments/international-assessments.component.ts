import { Component, OnInit } from '@angular/core';
import { IInternationalAssessmentTypeCard } from 'src/app/DTOs/international-assessment-type-card.interface';
import { InternationalAssessmentsService } from 'src/app/core/international-assessments.service'; 
import { LangChangeEvent } from '@ngx-translate/core';
import { TranslateService } from '@ngx-translate/core';
import { Subscription } from 'rxjs';


@Component({
  selector: 'app-international-assessments',
  templateUrl: './international-assessments.component.html',
  styleUrls: ['./international-assessments.component.scss']
})
export class InternationalAssessmentsComponent implements OnInit {
  exams!:IInternationalAssessmentTypeCard[];
  langChangeSub!: Subscription;
  /*= [
    {
      title: 'TIMSS',
      description: 'Trends in International Mathematics & Science Study — item sets with data interpretation.',
      tags: ['Grade 4 / 8', 'Math', 'Science'],
      iconSrc: 'img/vector-2.svg',
      theme: 'timss'
    },
    {
      title: 'PIRLS',
      description: 'Progress in International Reading Literacy Study — passages with comprehension and analysis items.',
      tags: ['Grade 4', 'Reading', 'Comprehension'],
      iconSrc: 'img/vector-3.svg',
      theme: 'PIRLS'
    },
    {
      title: 'PISA',
      description: 'Reading, Mathematics, and Science literacy for 15-year-olds — scenario-based tasks & applied problems.',
      tags: ['Age 15', 'Reading', 'Math', 'Science'],
      iconSrc: 'img/image.svg',
      theme: 'PISA'
    },
  ];
  */

  constructor(private InternationalAssessmentsService : InternationalAssessmentsService,
    private translate: TranslateService )
   {

   }

  getInternationalAssessmentsCards()
  {
    this.InternationalAssessmentsService.getInternationalAssessmentsTypes().subscribe(
      response=>
      {
        console.log(response);
        if(response.isValid && response.modelList)
        {
          console.log(response.modelList);
          this.exams = response.modelList;
          this.exams.forEach(exam=>{
            exam.iconSrc = `assets/images/international-assessments-cards/${exam.iconSrc}`;
          })
        }
        else
        {
          alert(response.errorMessage);
        }
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
}