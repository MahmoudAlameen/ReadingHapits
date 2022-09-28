import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, Observable, throwError } from 'rxjs';
import { Book } from 'src/app/classes/Book';
import { ReadingRoom } from '../classes/ReadingRoom';
import { ReadingRoomCard } from '../classes/ReadingRoomCard';


@Injectable({
  providedIn: 'root'
})
export class ReadingRoomsService {

  constructor(private http:HttpClient) { }

  getReadingRooms(studentAge:number,displayedBooksNumber:number , displayedArticlesNumber:number):Observable<ReadingRoomCard[]>
  {
    return this.http.get<ReadingRoomCard[]>("./assets/json/ReadingRooms.json",{params:{displayedBooksNumber:displayedBooksNumber,displayedArticlesNumber:displayedArticlesNumber}}).pipe(
      catchError((err)=>
      throwError(()=>err.message))
    )
  
  }
  getReadingRoom(roomId:number):Observable<ReadingRoom>
  {
    return this.http.get<ReadingRoom>("./assets/json/ReadingRoom.json",{params:{id:roomId}}).pipe(
      catchError((err)=>
      throwError(()=>err.message))
    )
  }
}
