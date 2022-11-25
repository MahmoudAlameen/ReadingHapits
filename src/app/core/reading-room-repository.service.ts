import { ReturnStatement } from '@angular/compiler';
import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { Article } from '../classes/Article';
import { Book } from '../classes/Book';
import { ReadingRoom } from '../classes/ReadingRoom';
import { ReadingRoomsService } from './reading-rooms.service';

@Injectable({
  providedIn: 'root'
})
export class ReadingRoomRepositoryService {
  ActiveReadingRoom:BehaviorSubject<ReadingRoom>=new BehaviorSubject<ReadingRoom>(new ReadingRoom());
  constructor(private ReadingRoomService:ReadingRoomsService){};

  /**setting reading Room */
  setActiveReadingRoom(roomId:number)
  {
    this.ReadingRoomService.getReadingRoom(roomId).subscribe(
      room=>this.ActiveReadingRoom.next(room),
      err=>alert(err)
    )

  }

  getBook(bookId:number): Book
  {
    for (let book of this.ActiveReadingRoom.value.books)
    {
      if(book.id==bookId)
       return book;
    }
    return new Book();
  }
  getArticle(articleId:number):Article
  {
    for (let article of this.ActiveReadingRoom.value.articles)
    {
      if(article.id==articleId)
       return article;
    }
    return new Article();

  }
  
  

}
