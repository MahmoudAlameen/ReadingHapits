import { HttpClient, HttpContext } from "@angular/common/http";
import { core } from "@angular/compiler";
import { Injectable } from "@angular/core";
import { BehaviorSubject, catchError, Observable, of, tap, throwError } from "rxjs";
import { APIResponseModel } from "../classes/APIResponse";
import { Student } from "../classes/student";
import { APIService } from "./API.Service";
import { SessionStorageService } from "./SessionStorageService";
import { SessionStorageKeysService } from "./SessionStorageKeysService";
import { IGrade } from "../DTOs/grade.interfaces";
import { IUserData } from "../DTOs/user-data.interface";
import { BYPASS_INTERCEPTOR } from 'src/app/core/interceptors/no-interceptor.context'; // Import the token

@Injectable(
    {
        providedIn : 'root'
    }
)
export class UserService
{
    public studentGrade: BehaviorSubject<IGrade| null> = new BehaviorSubject<IGrade| null>(null);
    public userDataSubject: BehaviorSubject<IUserData| null> = new BehaviorSubject<IUserData | null>(null);
    public UserData$: Observable<IUserData | null>;
    
    constructor( 
        private http: HttpClient,
        private api: APIService,
        private sessionStorageService : SessionStorageService,
        private sessionStorageKeys : SessionStorageKeysService
    )
    {
        this.UserData$ = this.userDataSubject.asObservable();
    }

    AddUser(student:Student):Observable<any>
    {

        return this.http.post<any>(this.api.AddUser,student).pipe(

        )

    }
    IsAuthenticated(userId: string):Observable<boolean>
    {
        return this.http.get<boolean>(this.api.AuthenticateUser,{params:{userId:userId}}).pipe(
            catchError((err)=>
            throwError(()=>err.message)))
    }
    getUserGrade(): Observable<APIResponseModel<IGrade>>
    {
        return this.http.get<APIResponseModel<IGrade>>(this.api.getUserGrade,
             {context: new HttpContext().set(BYPASS_INTERCEPTOR, true)}
        ).pipe(
           catchError((err)=>
           throwError(()=>err.message)))
    }

    getUserData(): Observable<APIResponseModel<IUserData>>
    {
        return this.http.get<APIResponseModel<IUserData>>(this.api.getUserData,
            {context: new HttpContext().set(BYPASS_INTERCEPTOR, true)}
        ).pipe(
           catchError((err)=>
           throwError(()=>err.message)))
    }
    
    public setUserData()
    {
        this.getUserData().subscribe(
            res => 
            {
                if(res.isValid && res.model)
                {
                    var user = res.model;
                    user.avatarUrl = user.avatarUrl ? `${this.api.mediaBase}Users/${user.avatarUrl}`: user.avatarUrl;
                    this.userDataSubject.next(user);
                    this.UserData$ = this.userDataSubject.asObservable();
                }
            }
        )
    }

    public setUserGrade()
    {
        this.getUserGrade().subscribe(
            res => 
            {
                if(res.isValid && res.model)
                {
                    this.studentGrade.next(res.model);
                }

            }

        )
    }
}
class response
{
    user:AddUser=new AddUser();
}
class AddUser
{
    userId:string=""
}

