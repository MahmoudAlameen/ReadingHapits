import { HttpBackend, HttpClient } from "@angular/common/http";
import { core } from "@angular/compiler";
import { Injectable } from "@angular/core";
import { catchError, Observable, of, tap, throwError } from "rxjs";
import { logedUser } from "src/interfaces/logedUser";
import { APIResponseModel } from "../classes/APIResponse";
import { Student } from "../classes/student";
import { UserLoginResult } from "../DTOs/UserLoginResult";
import { APIService } from "./API.Service";
import { SessionStorageService } from "./SessionStorageService";
import { SessionStorageKeysService } from "./SessionStorageKeysService";

@Injectable(
    {
        providedIn : 'root'
    }
)
export class UserService
{
    constructor( 
        private http: HttpClient,
        private api: APIService,
        private sessionStorageService : SessionStorageService,
        private sessionStorageKeys : SessionStorageKeysService
    )
    {

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
}
class response
{
    user:AddUser=new AddUser();
}
class AddUser
{
    userId:string=""
}