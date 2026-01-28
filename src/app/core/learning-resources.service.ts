import { HttpClient, HttpParams } from '@angular/common/http';
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
  pageNumber?: number,
  pageSize?: number
): Observable<APIResponseModelList<ILearningResourceCard>> {

  let params = new HttpParams();

  if (gradeId) 
    params = params.set('gradeId', gradeId);

  if (pageNumber !== undefined)
    params = params.set('pageNumber', pageNumber.toString());

  if (pageSize !== undefined)
    params = params.set('pageSize', pageSize.toString());

  return this.http
    .get<APIResponseModelList<ILearningResourceCard>>(
      `${this.API.learningResourcesBySubject}${subjectId}`,
      { params }
    ).pipe(
      catchError(err => throwError(() => err.Messages))
    );
}

    getLearningResource(id: string) : Observable<APIResponseModel<ILearningResource>>
    {
      return this.http.get<APIResponseModel<ILearningResource>>(`${this.API.getLearningResource}${id}`)
        .pipe(catchError((err)=>throwError(()=>err.message)));

    }
}
