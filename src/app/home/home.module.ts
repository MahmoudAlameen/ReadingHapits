import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { HomeRoutingModule } from './home-routing.module';
import { HomeComponent } from './home.component';
import { AdvertiseComponent } from './components/advertise/advertise.component';
import { ReadingRoomsComponent } from './components/reading-rooms/reading-rooms.component';
import { CoreModule } from '../core/core.module';
import { ReadingRoomCardComponent } from './components/reading-room-card/reading-room-card.component';
import { SharedModule } from '../shared/shared.module';
import { LoginComponent} from './components/login/login.component';
import { FormsModule } from '@angular/forms';
import { PasswordValidator } from '../customDirectives/PasswordValidator';
import { ValidNameValidator } from '../customDirectives/CharactersOnly';
import { GlobalAssessmentsVedioComponent } from './components/global-assessments-vedio/global-assessments-vedio.component';
import { LearningMaterialsComponent } from './components/learning-materials/learning-materials.component';
import { LearningMaterialCardComponent } from './components/learning-material-card/learning-material-card.component';
import { InternationalAssessmentCardComponent } from './components/international-assessment-card/international-assessment-card.component';
import { InternationalAssessmentsComponent } from './components/international-assessments/international-assessments.component';
import { MainSectionComponent } from './components/main-section/main-section';
import { TranslateModule } from '@ngx-translate/core';
import { RegisterComponent } from './components/register/register.component';
import { AboutUsComponent } from './components/about-us/about-us.component';
import { AssessmentsModule } from '../assessments/assessments.module';

@NgModule({
  declarations: [
    HomeComponent,
    AdvertiseComponent,
    ReadingRoomsComponent,
    ReadingRoomCardComponent,
    LoginComponent,
    ValidNameValidator,
    PasswordValidator,
    GlobalAssessmentsVedioComponent,
    LearningMaterialsComponent,
    LearningMaterialCardComponent,
    InternationalAssessmentCardComponent,
    InternationalAssessmentsComponent,
    MainSectionComponent,
    RegisterComponent,
    AboutUsComponent,
    ],
  imports: [
    CommonModule,
    HomeRoutingModule,
    CoreModule,
    SharedModule,
    FormsModule,
    TranslateModule,
],
  exports:[AdvertiseComponent,ReadingRoomCardComponent,ReadingRoomsComponent,
    HomeComponent, GlobalAssessmentsVedioComponent, InternationalAssessmentsComponent],
  providers:[]
})
export class HomeModule { }
