import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { catchError, Observable, throwError } from 'rxjs';
import { ILearningSubjectDetails } from '../DTOs/ILearningSubjectDetails';
import { APIResponseModel, APIResponseModelList } from '../classes/APIResponse';
import { ILearningSubjectCard } from '../DTOs/ILearningSubjectCard';
import { IIdWithName } from '../DTOs/shared.interfaces';
import { APIService } from './API.Service';
@Injectable({
  providedIn: 'root'
})
export class LearningSubjectService {

  constructor(private http : HttpClient, private API: APIService) { }
    getLearningSubjectDetails(subjectId: string):Observable<APIResponseModel<ILearningSubjectDetails>>
    {
      return this.http.get<APIResponseModel<ILearningSubjectDetails>>(this.API.learningSubjectDetails + subjectId )
      .pipe(catchError(
        (err)=>{
          return throwError(()=>err.Messages)
        }
      ))
    }

    getLearningSubjectsCards() : Observable<APIResponseModelList<ILearningSubjectCard>>
    {
     return this.http.get<APIResponseModelList<ILearningSubjectCard>>(this.API.learninSubjectsCards).pipe(catchError(
        (err)=>{
          return throwError(()=>err.Messages)
        }
      ))

    }
    
  getLearningSubjectIds(): Observable<APIResponseModelList<IIdWithName>>
  {
    return this.http.get<APIResponseModelList<IIdWithName>>(this.API.LearningSubjectIds)
    .pipe(catchError((err)=> throwError(()=> err.message)));
  }
  
  getGradesIdsWIthNames() : Observable<APIResponseModelList<IIdWithName>>
  {
    return this.http.get<APIResponseModelList<IIdWithName>>(this.API.gradesIds)
      .pipe(catchError((err) => throwError(() => err.message)));
  }

  visitLearningSubject(subjectId: string)
  {
        return this.http.post<APIResponseModel<number>>(`${this.API.visitReadingRoom}${subjectId}`, {});
  }
}
