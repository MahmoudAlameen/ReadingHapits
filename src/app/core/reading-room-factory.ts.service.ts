import { Injectable } from '@angular/core';
import { Article } from '../classes/Article';
import { Book } from '../classes/Book';
import { ArticleCardDTO } from '../DTOs/ArticleCardDTO';
import { BookCardDTO } from '../DTOs/BookCardDTO';

@Injectable({
  providedIn: 'root'
})
export class ReadingRoomFactoryService {

  constructor() { }

  createArticleCardDTO(artilce:Article)
  {
    let articleCard:ArticleCardDTO=new ArticleCardDTO();
    articleCard.id=artilce.id;
    articleCard.name= artilce.name;
    articleCard.readingRoomId= artilce.roomId;
    return articleCard;
  }
  createArticlesDTOs(articles:Article[])
  {
    let articelsCards :ArticleCardDTO[] =[];
    for(let article  of articles)
    {
      articelsCards.push(this.createArticleCardDTO(article));
    }
     return articelsCards;
  }
  createBookCardDTO(book: Book)
  {
    let bookCard: BookCardDTO = new BookCardDTO();
    bookCard.id = book.id;
    bookCard.name = book.name;
    bookCard.cover = book.cover;
    bookCard.examsIds = [];
    bookCard.pagesNumber = book.pages.length;
    bookCard.readingRoomId = book.roomId;
    return bookCard;
  }
  createBooksCardsDTO(books:Book[])
  {
    let booksCards :BookCardDTO [] =[];
    for(let book of books)
    {
      booksCards.push(this.createBookCardDTO(book));
    }
    return booksCards;
  }

}
