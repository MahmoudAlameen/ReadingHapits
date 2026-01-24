import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LearningSubjectComponent } from './learning-subject.component';
import { BookComponent } from '../reading-room/components/book/book.component';
import { ArticleComponent } from '../reading-room/components/article/article.component';
import { PdfPreviewComponent } from '../shared/pdf-preview/pdf-preview.component';
import { AuthGuard } from '../core/auth-guard.service';

const routes: Routes = [{ path: '', component: LearningSubjectComponent},
      {path: "book/:id", component: BookComponent, canActivate: [AuthGuard]},
    {path: "article/:id", component: ArticleComponent, canActivate: [AuthGuard]},
    {path: "preview-pdf", component: PdfPreviewComponent, canActivate: [AuthGuard]}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class LearningSubjectRoutingModule { }
