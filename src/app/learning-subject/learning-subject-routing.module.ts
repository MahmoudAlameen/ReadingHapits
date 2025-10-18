import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LearningSubjectComponent } from './learning-subject.component';
import { BookComponent } from '../reading-room/components/book/book.component';
import { ArticleComponent } from '../reading-room/components/article/article.component';
import { PdfPreviewComponent } from '../shared/pdf-preview/pdf-preview.component';

const routes: Routes = [{ path: '', component: LearningSubjectComponent},
      {path: "book/:id", component: BookComponent},
    {path: "article/:id", component: ArticleComponent},
    {path: "preview-pdf", component: PdfPreviewComponent}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class LearningSubjectRoutingModule { }
