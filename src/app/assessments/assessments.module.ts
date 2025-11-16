import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AssessmentsRoutingModule } from './assessments-routing.module';
import { AssessmentsComponent } from './assessments.component';
import { RunAssessmentComponent } from './components/run-assessment/run-assessment.component';
import { AssessmentMetaComponent } from './components/assessment-meta/assessment-meta.component';
import { AssessmentQuestionsComponent } from './components/assessment-questions/assessment-questions.component';
import {AsyncPipe} from '@angular/common';
import { AssessmentResultComponent } from './components/assessment-result/assessment-result.component';
import { AssessmentsListComponent } from './components/assessments-list/assessments-list.component';
import { AssessmentCardComponent } from './components/assessment-card/assessment-card.component'
import { TranslateModule } from '@ngx-translate/core';
import { SharedModule } from '../shared/shared.module';

@NgModule({
  declarations: [
    AssessmentsComponent,
    RunAssessmentComponent,
    AssessmentMetaComponent,
    AssessmentQuestionsComponent,
    AssessmentResultComponent,
    AssessmentsListComponent,
    AssessmentCardComponent,
    
  ],
  imports: [
    CommonModule,
    AssessmentsRoutingModule,
    AsyncPipe,
    TranslateModule,
    SharedModule
  ]
})
export class AssessmentsModule { }
