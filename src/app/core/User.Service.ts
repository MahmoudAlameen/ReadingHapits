import { HttpBackend, HttpClient } from "@angular/common/http";
import { core } from "@angular/compiler";
import { Injectable } from "@angular/core";
import { catchError, Observable, throwError } from "rxjs";
import { logedUser } from "src/interfaces/logedUser";
import { Student } from "../classes/student";
import { APIService } from "./API.Service";

@Injectable(
    {
        providedIn : 'root'
    }
)
export class UserService
{
    constructor( private http: HttpClient, private api: APIService)
    {

    }

    AddUser(student:Student):Observable<any>
    {

        return this.http.post<any>(this.api.AddUser,student).pipe(
            catchError((err)=>
            throwError(()=>err.message))
        )

    }

    LoginUser( loginUser:logedUser)
    {

        return this.http.post<any>(this.api.UserLogin,loginUser).pipe(
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