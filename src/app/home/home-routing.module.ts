import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { RegisterLoginComponent } from './components/register-login/register-login.component';
import { HomeComponent } from './home.component';
import { InternationalAssessmentsComponent } from './components/international-assessments/international-assessments.component';
import { MainSectionComponent } from './components/main-section/main-section';
const routes: Routes = [
  { path: '', component: HomeComponent },
  {path:"login",component:RegisterLoginComponent},
  {path:'placementTest', component: MainSectionComponent}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class HomeRoutingModule { }
