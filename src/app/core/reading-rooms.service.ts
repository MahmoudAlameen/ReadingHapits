import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, Observable, throwError } from 'rxjs';
import { Book } from 'src/app/classes/Book';
import { __param } from 'tslib';
import { APIResponse, APIResponseModel, APIResponseModelList } from '../classes/APIResponse';
import { Article } from '../classes/Article';
import { ReadingRoom } from '../classes/ReadingRoom';
import { ReadingRoomCard } from '../classes/ReadingRoomCard';
import { APIService } from './API.Service';


@Injectable({
  providedIn: 'root'
})
export class ReadingRoomsService {

  constructor(private http:HttpClient, private API: APIService) { }

  getReadingRooms(displayedBooksNumber:number , displayedArticlesNumber:number):Observable<APIResponseModelList<ReadingRoomCard>>
  {
    return this.http.get<APIResponseModelList<ReadingRoomCard>>(this.API.ReadingRooms,{params:{displayedBooksNumber:displayedBooksNumber,displayedArticlesNumber:displayedArticlesNumber}}).pipe(
      catchError((err)=>
      throwError(()=>err.message))
    )
  
  }
  getReadingRoom(roomId:string , userId :string):Observable<APIResponseModel<ReadingRoom>>
  {
    return this.http.get<APIResponseModel<ReadingRoom>>(this.API.GetReadingRoom,{params:{roomId:roomId, userId:userId}}).pipe(
      catchError((err)=>
      throwError(()=>err.message))
    )
  }
  getBook(bookId: string): Observable<APIResponseModel<Book>>
  {
    /*
    return this.http.get<APIResponseModel<Book>>(this.API.GetBook, {params:{bookId:bookId , userId : userId}}).pipe(
      catchError((err)=>
      throwError(()=>err.message))
      
         return this.http.get<APIResponseModel<Book>>(this.API.GetBook, {params:{bookId:bookId , userId : userId}}).pipe(
      catchError((err)=>
      throwError(()=>err.message))

    )
      */
         return this.http.get<APIResponseModel<Book>>(this.API.resourcePages + bookId).pipe(
      catchError((err)=>
      throwError(()=>err.message))
    )
  }
  getArticle(articleId : string): Observable<APIResponseModel<Article>>
  {
    return this.http.get<APIResponseModel<Article>>(this.API.GetArticle, {params:{articleId:articleId}}).pipe(
      catchError((err)=>
      throwError(()=>err.message))
    )
  }
  getBookPagesNumber( bookId: string) :Observable<APIResponseModel<number>>
  {
    return this.http.get<APIResponseModel<number>>(this.API.bookPagesNumber, {params:{bookId:bookId}}).pipe(
      catchError((err)=>
      throwError(()=>err.message))
    )
  }
  visitReadingRoom( roomId:string):Observable<APIResponseModel<number>>
  {
    return this.http.post<APIResponseModel<number>>(this.API.visitReadingRoom, {},{params:{roomId:roomId}}).pipe(
      catchError((err)=>
      throwError(()=>err.message))
    )
  }
  addBookTimeRead(bookId:string, readTimeStart:string , readTimeEnd:string):Observable<APIResponseModel<string>>
  {
    return this.http.post<APIResponseModel<string>>(this.API.addBookTimeRead,{},{params:{bookId:bookId, readTimeStart:readTimeStart , readTimeEnd:readTimeEnd}}).pipe(
      catchError((err)=>
      throwError(()=>err.message))
    )

  }
  addArticleTimeRead(articleId:string, readTimeStart:string , readTimeEnd:string):Observable<APIResponseModel<string>>
  {
    return this.http.post<APIResponseModel<string>>(this.API.addArticleTimeRead,{},{params:{articleId:articleId, readTimeStart:readTimeStart , readTimeEnd:readTimeEnd}}).pipe(
      catchError((err)=>
      throwError(()=>err.message))
    )
  }
}
