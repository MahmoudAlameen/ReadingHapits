import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { PlacementTestComponent } from './components/placement-test/placement-test.component';
import { ReadingRoomsComponent } from './components/reading-rooms/reading-rooms.component';
import { RegisterLoginComponent } from './components/register-login/register-login.component';
import { HomeComponent } from './home.component';

const routes: Routes = [
  { path: '', component: HomeComponent },
  {path:"login",component:RegisterLoginComponent},
  {path:'placementTest', component:PlacementTestComponent}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class HomeRoutingModule { }
