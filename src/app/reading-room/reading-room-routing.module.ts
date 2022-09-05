import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ArticleComponent } from './components/article/article.component';
import { BookComponent } from './components/book/book.component';
import { ReadingRoomComponent } from './reading-room.component';

const routes: Routes = [
  { path: '', component: ReadingRoomComponent ,
//children:[{path:"article/:id",component:ArticleComponent}]
  },
  {path:"book/:id",component:BookComponent},
  {path:"article/:id",component:ArticleComponent}
]
@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ReadingRoomRoutingModule { }
