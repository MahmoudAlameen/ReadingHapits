import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { catchError, Observable, throwError } from 'rxjs';
import { IAdvertiseMessages } from 'src/interfaces/advertiseMessages';
import { HttpClientModule } from '@angular/common/http';


@Injectable({
  providedIn: 'root'
})
export class AdvertiseMessagesService{


  constructor(private http:HttpClient) { }
  getAdvertisMessages():Observable<IAdvertiseMessages[]>
  {
    return this.http.get<IAdvertiseMessages[]>("./assets/json/advertiseMessages.json").pipe(catchError(
      (err)=>{
        return throwError(()=>err.Messages)
      }
    ))
  }
}
