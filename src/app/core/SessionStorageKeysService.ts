import { Injectable } from "@angular/core";

@Injectable({
    providedIn: 'root'
  })
export class SessionStorageKeysService
{
    public userId:string;
    userName:string;
    name:string;
    jwt_token: string;
    userLanguage: string = 'userLanguage';
    constructor()
    {
        this.userId="userId";
        this.userName="userName";
        this.name = "name";
        this.jwt_token = 'jwt_token';
        this.userLanguage  = 'userLanguage'; 
    }
}