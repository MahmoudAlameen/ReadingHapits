import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AssessmentsComponent } from './assessments.component';
import { RunAssessmentComponent } from './components/run-assessment/run-assessment.component';
import { AssessmentsListComponent } from './components/assessments-list/assessments-list.component';
import { AuthGuard} from '../core/auth-guard.service';
import { AssessmentResultComponent } from './components/assessment-result/assessment-result.component';

const routes: Routes = [
  { 
    path: '', 
    component: AssessmentsComponent, // This is now the layout/parent component
    canActivate: [AuthGuard],
    children: [ // <-- Define sub-routes here
      { 
        path: '', // Full path: /assessments (Renders AssessmentsListComponent by default)
        component: AssessmentsComponent, 
      }
    ]
  },
  {
    path:"list",
    component: AssessmentsListComponent,
    canActivate: [AuthGuard]
  },
  { 
    path: 'run-assessment/:id', // Full path: /assessments/run-assessment
    component: RunAssessmentComponent, 
  },
  {
    path: 'view-result/:id',
    component: AssessmentResultComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AssessmentsRoutingModule { }
