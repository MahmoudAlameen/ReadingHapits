import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, Observable, throwError } from 'rxjs';
import { Book } from 'src/app/classes/Book';
import { APIResponseModel, APIResponseModelList } from '../classes/APIResponse';
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
}
