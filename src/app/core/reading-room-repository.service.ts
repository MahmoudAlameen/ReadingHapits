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
  ActiveReadingRoom:BehaviorSubject<ReadingRoom|null>=new BehaviorSubject<ReadingRoom|null>(new ReadingRoom());
  constructor(private ReadingRoomService:ReadingRoomsService){};

  /**setting reading Room */
  setActiveReadingRoom(roomId:string, userId:string)
  {
    this.ReadingRoomService.getReadingRoom(roomId, userId).subscribe(
      room=>this.ActiveReadingRoom.next(room.model),
      err=>alert(err)
    )

  }
  

  getBook(bookId:string): Book
  {
    let books=this.ActiveReadingRoom.value?.books;
    if(books==null)
       books=[];
    for (let book of books)
    {
      if(book.id==bookId)
       return book;
    }
    return new Book();
  }
  getArticle(articleId:string):Article
  {
    let articles=this.ActiveReadingRoom.value?.articles;
    if(articles ==null)
      articles=[];
    for (let article of articles)
    {
      if(article.id==articleId)
       return article;
    }
    return new Article();

  }
  
  

}
