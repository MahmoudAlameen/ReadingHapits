import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { catchError, Observable, throwError } from 'rxjs';
import { APIResponseModel, APIResponseModelList } from '../classes/APIResponse';
import { IInternationalAssessmentTypeCard } from '../DTOs/international-assessment-type-card.interface';
import { TranslateService } from '@ngx-translate/core';
import { APIService } from './API.Service';
import { IAssessmentCard } from '../DTOs/assessments.interfaces';
import { ISubjectAssessmentCard } from '../DTOs/ILearningSubjectDetails';



@Injectable({
  providedIn: 'root'
})
export class InternationalAssessmentsService {

 constructor(private http : HttpClient, private translateService : TranslateService,
  private API: APIService
 ) { }

  getInternationalAssessmentsTypes() : Observable<APIResponseModelList<IInternationalAssessmentTypeCard>>
      {
        var url = this.translateService.currentLang === 'ar' ? "./assets/json/international-assessments-type-cards-ar.json" : "./assets/json/international-assessments-type-cards.json";
        return this.http.get<APIResponseModelList<IInternationalAssessmentTypeCard>>(url).pipe(catchError(
          (err)=>{
            return throwError(()=>err.Messages)
          }
        ))
  
      }

getExamsBySubjectId(
  subjectId: string,
  gradeId?: string,
  pageNumber?: number,
  pageSize?: number
): Observable<APIResponseModelList<ISubjectAssessmentCard>> {

     let httpParams = new HttpParams();

    // Mapping params to HttpParams
    if (gradeId !== undefined ) {
      httpParams = httpParams.set('gradeId', gradeId);  
    }
    if(pageNumber != undefined && pageSize != undefined)
    {
      httpParams = httpParams.set('pageNumber', pageNumber);
      httpParams = httpParams.set('pageSize', pageSize);
    }
  return this.http
    .get<APIResponseModelList<ISubjectAssessmentCard>>(
      `${this.API.examsBySubjectId}${subjectId}`, { params: httpParams }
    )
    .pipe(
      catchError((err) => throwError(() => err.Messages))
    );
  }
   
}
