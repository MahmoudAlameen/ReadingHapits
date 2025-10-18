import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
{ path: 'home', loadChildren: () => import('./home/home.module').then(m => m.HomeModule) }, 
{ path: 'ReadingRoom/:id', loadChildren: () => import('./reading-room/reading-room.module').then(m => m.ReadingRoomModule) }, 
{ path: 'Admin', loadChildren: () => import('./admin/admin.module').then(m => m.AdminModule) },
{ path: 'learning-subject/:id', loadChildren: () => import('./learning-subject/learning-subject.module').then(m => m.LearningSubjectModule) },
{ path: 'assessments', loadChildren: () => import('./assessments/assessments.module').then(m => m.AssessmentsModule) },
{ path: 'learning-subjects', loadChildren: () => import('./learning-subject/learning-subject.module').then(m => m.LearningSubjectModule) },
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, {
      scrollPositionRestoration: 'top',   // ✅ Always scroll to top on route change
      anchorScrolling: 'enabled',         // Enables #fragment scrolling
    })],
  exports: [RouterModule]
})
export class AppRoutingModule{ }
