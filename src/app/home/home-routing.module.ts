import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ReadingRoomsComponent } from './components/reading-rooms/reading-rooms.component';
import { RegisterLoginComponent } from './components/register-login/register-login.component';
import { HomeComponent } from './home.component';

const routes: Routes = [
  { path: '', component: HomeComponent },
  {path:"login",component:RegisterLoginComponent}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class HomeRoutingModule { }
