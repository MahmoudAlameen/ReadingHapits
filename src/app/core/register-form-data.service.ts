import { HttpBackend, HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, Observable, throwError } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class RegisterFormDataService {

  constructor(private http:HttpClient) { }

  getSchools():Observable<string[]>
  {
    return this.http.get<string[]>("./assets/json/schools.json").pipe(
      catchError((err)=>
      {
        return throwError(()=>err.message)
      })
    )

  }
  getCountries():Observable<string[]>
  {
    return this.http.get<string[]>("./assets/json/countries.json").pipe(
      catchError(
        (err)=>
        {
          return throwError(()=>err.message)
        }
      )
    )

  }
}
