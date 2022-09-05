import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, Observable, throwError } from 'rxjs';
import { Book } from 'src/app/classes/Book';
import { ReadingRoom } from '../classes/ReadingRoom';


@Injectable({
  providedIn: 'root'
})
export class ReadingRoomsService {

  constructor(private http:HttpClient) { }

  getReadingRooms(studentAge:number):Observable<ReadingRoom[]>
  {
    return this.http.get<ReadingRoom[]>("./assets/json/ReadingRooms.json").pipe(
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
