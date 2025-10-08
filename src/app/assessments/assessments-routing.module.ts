import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AssessmentsComponent } from './assessments.component';
import { RunAssessmentComponent } from './components/run-assessment/run-assessment.component';
import { AssessmentsListComponent } from './components/assessments-list/assessments-list.component';

const routes: Routes = [{ path: '', component: AssessmentsComponent },
  {path: 'run-assessment', component: RunAssessmentComponent},
  {path: 'list', component: AssessmentsListComponent}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AssessmentsRoutingModule { }
