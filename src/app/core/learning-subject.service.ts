import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { catchError, Observable, throwError } from 'rxjs';
import { ILearningSubjectDetails } from '../DTOs/ILearningSubjectDetails';
import { APIResponseModel, APIResponseModelList } from '../classes/APIResponse';
import { ILearningSubjectCard } from '../DTOs/ILearningSubjectCard';
@Injectable({
  providedIn: 'root'
})
export class LearningSubjectService {

  constructor(private http : HttpClient) { }
    getLearningSubjectDetaisl(subjectId: string, gradeId: string):Observable<APIResponseModel<ILearningSubjectDetails>>
    {
      return this.http.get<APIResponseModel<ILearningSubjectDetails>>("./assets/json/learning-subject-details.json", {params:{subjectId, gradeId}}).pipe(catchError(
        (err)=>{
          return throwError(()=>err.Messages)
        }
      ))
    }

    getLearningSubjectsCards() : Observable<APIResponseModelList<ILearningSubjectCard>>
    {
      return this.http.get<APIResponseModelList<ILearningSubjectCard>>("./assets/json/learning-subjects-cards.json").pipe(catchError(
        (err)=>{
          return throwError(()=>err.Messages)
        }
      ))

    }
}
