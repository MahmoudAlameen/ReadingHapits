import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LearningSubjectRoutingModule } from './learning-subject-routing.module';
import { LearningSubjectComponent } from './learning-subject.component';
import { SharedModule } from '../shared/shared.module';
import { FormsModule } from '@angular/forms';
import { TranslateModule } from '@ngx-translate/core';
import { LearningResourceCardComponent } from './components/learning-resource-card/learning-resource-card.component';


@NgModule({
  declarations: [
    LearningSubjectComponent,
    LearningResourceCardComponent
  ],
  imports: [
    CommonModule,
    LearningSubjectRoutingModule,
    SharedModule,
    FormsModule,
    TranslateModule   
    
  ],
  exports:[LearningSubjectComponent]
})
export class LearningSubjectModule { }
