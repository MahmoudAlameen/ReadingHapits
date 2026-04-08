import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './components/login/login.component';
import { HomeComponent } from './home.component';
import { InternationalAssessmentsComponent } from './components/international-assessments/international-assessments.component';
import { MainSectionComponent } from './components/main-section/main-section';
import { PdfPreviewComponent } from '../shared/pdf-preview/pdf-preview.component';
import { RegisterComponent } from './components/register/register.component';
import { AboutUsComponent } from './components/about-us/about-us.component';
import { AuthGuard } from '../core/auth-guard.service';
import { LearningMaterialsComponent } from './components/learning-materials/learning-materials.component';
const routes: Routes = [
  { path: '', component: HomeComponent,  },
  {path:"login",component:LoginComponent},
  {path:"register",component:RegisterComponent},
  {path:'placementTest', component: PdfPreviewComponent, canActivate: [AuthGuard]},
  {path: "about", component: AboutUsComponent},
  {path: "learning-materials", component: LearningMaterialsComponent, canActivate: [AuthGuard]},

];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class HomeRoutingModule { }
