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
  getCountries(lang: string):Observable<string[]>
  {
    var url = lang == 'ar' ? "./assets/json/countries.ar.json" :
    "./assets/json/countries.en.json";
    return this.http.get<string[]>(url).pipe(
      catchError(
        (err)=>
        {
          return throwError(()=>err.message)
        }
      )
    )

  }
}
