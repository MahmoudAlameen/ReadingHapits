import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ReadingRoomRoutingModule } from './reading-room-routing.module';
import { ReadingRoomComponent } from './reading-room.component';
import { SharedModule } from '../shared/shared.module';
import { ArticleComponent } from './components/article/article.component';
import { BookComponent } from './components/book/book.component';
import { ExamComponent } from './components/exam/exam.component';


@NgModule({
  declarations: [
    ReadingRoomComponent,
    ArticleComponent,
    BookComponent,
    ExamComponent
  ],
  imports: [
    CommonModule,
    ReadingRoomRoutingModule,
    SharedModule
  ],
  exports:[ReadingRoomComponent]
})
export class ReadingRoomModule { }
