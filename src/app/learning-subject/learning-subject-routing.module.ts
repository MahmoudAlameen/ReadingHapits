import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LearningSubjectComponent } from './learning-subject.component';

const routes: Routes = [{ path: '', component: LearningSubjectComponent }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class LearningSubjectRoutingModule { }
