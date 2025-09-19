import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { catchError, Observable, throwError } from 'rxjs';
import { APIResponseModel, APIResponseModelList } from '../classes/APIResponse';
import { IInternationalAssessmentTypeCard } from '../DTOs/international-assessment-type-card.interface';



@Injectable({
  providedIn: 'root'
})
export class InternationalAssessmentsService {

 constructor(private http : HttpClient) { }

  getInternationalAssessmentsTypes() : Observable<APIResponseModelList<IInternationalAssessmentTypeCard>>
      {
        return this.http.get<APIResponseModelList<IInternationalAssessmentTypeCard>>("./assets/json/international-assessments-type-cards.json").pipe(catchError(
          (err)=>{
            return throwError(()=>err.Messages)
          }
        ))
  
      }
}
