import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LearningSubjectRoutingModule } from './learning-subject-routing.module';
import { LearningSubjectComponent } from './learning-subject.component';
import { SharedModule } from '../shared/shared.module';


@NgModule({
  declarations: [
    LearningSubjectComponent
  ],
  imports: [
    CommonModule,
    LearningSubjectRoutingModule,
    SharedModule
  ],
  exports:[LearningSubjectComponent]
})
export class LearningSubjectModule { }
