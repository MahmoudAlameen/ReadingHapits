import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { APIResponse, APIResponseModel, APIResponseModelList } from '../classes/APIResponse';
import { APIService } from './API.Service';
import { ILearningResourceCard } from '../DTOs/ILearningSubjectDetails';
import { catchError, Observable, throwError } from 'rxjs';
import { LearningResourceStatus } from '../enums/learning-resources.enums';
import { ReadingRoomCard } from '../classes/ReadingRoomCard';
import { ILearningResource } from '../DTOs/learning-resource.interfaces';

@Injectable({
  providedIn: 'root'
})
export class LearningResourcesService {

  constructor(private http : HttpClient, private API: APIService) { }
  
getLearningResourcesBySubjectId(
  subjectId: string,
  gradeId?: string,
  status?: LearningResourceStatus,
  pageNumber?: number,
  pageSize?: number
): Observable<APIResponseModelList<ILearningResourceCard>> {
  return this.http
    .get<APIResponseModelList<ILearningResourceCard>>(
      `${this.API.learningResourcesBySubject}${subjectId}`,
      {
        params: {
          gradeId: gradeId ?? '',
          status: status ?? '',
          pageNumber: pageNumber?.toString() ?? '',
          pageSize: pageSize?.toString() ?? ''
        }
      }
    )
    .pipe(
      catchError((err) => throwError(() => err.Messages))
    );
}

    getLearningResource(id: string) : Observable<APIResponseModel<ILearningResource>>
    {
      return this.http.get<APIResponseModel<ILearningResource>>(`${this.API.getLearningResource}${id}`)
        .pipe(catchError((err)=>throwError(()=>err.message)));

    }
}
