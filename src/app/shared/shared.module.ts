import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HeaderComponent } from './header/header.component';
import { FooterComponent } from './footer/footer.component';
import { CoreModule } from '../core/core.module';
import { BookCardComponent } from './book-card/book-card.component';
import { SharedRoutingModule } from './sharedRoutingModule';
import { ArticleCardComponent } from './article-card/article-card.component';
import { CustomAlertComponent } from './custom-alert/custom-alert.component';
import { ProgressBarComponent } from './progress-bar/progress-bar.component';
import { ExamCardComponent } from './exam-card/exam-card.component';
import { TranslateModule } from '@ngx-translate/core';
import { PdfPreviewComponent } from './pdf-preview/pdf-preview.component'; // <-- Import the module
import { PdfViewerModule } from 'ng2-pdf-viewer';


@NgModule({
  declarations: [
    HeaderComponent,
    FooterComponent,
    BookCardComponent,
    ArticleCardComponent,
    CustomAlertComponent,
    ProgressBarComponent,
    ExamCardComponent,
    PdfPreviewComponent,

  ],
  imports: [
    CommonModule,
    CoreModule,
    SharedRoutingModule,
    TranslateModule,
    PdfViewerModule
  ],
  exports:[HeaderComponent,FooterComponent, BookCardComponent,ArticleCardComponent, CustomAlertComponent, 
    ProgressBarComponent, ExamCardComponent]
})
export class SharedModule { }
